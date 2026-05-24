import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchBranchAnalytics, fetchDashboardAnalytics, fetchProgressAnalytics } from '../services/analyticsService';
import { getApiError } from '../services/api';
import { fetchStudents, updateWorkflow } from '../services/studentService';

const StudentContext = createContext(null);
const emptyMetrics = { total: 0, pending: 0, inProgress: 0, completed: 0 };
const emptyBranches = ['CSE', 'AIML', 'CIC'].map((branch) => ({
  branch,
  total: 0,
  pending: 0,
  inProgress: 0,
  completed: 0,
}));

function formatTime(value) {
  if (!value) return null;
  return new Date(value).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function normalizeStudent(student) {
  return {
    ...student,
    id: student._id,
    phone: student.studentPhone,
    workflow: {
      reported: formatTime(student.reportedTime),
      phone: formatTime(student.phoneStepTime),
      scan: formatTime(student.scanningStepTime),
      final: formatTime(student.finalVerificationTime),
    },
  };
}

function recentActivity(student) {
  let action = 'Student record added';
  let time = student.createdAt;

  if (student.finalVerificationTime) {
    action = 'Final verification complete';
    time = student.finalVerificationTime;
  } else if (student.scanningStepTime) {
    action = 'Documents scanned';
    time = student.scanningStepTime;
  } else if (student.phoneStepTime) {
    action = 'Phone details captured';
    time = student.phoneStepTime;
  } else if (student.reportedTime) {
    action = 'Reported at help desk';
    time = student.reportedTime;
  }

  return { id: student._id, name: student.name, branch: student.branch, action, time: formatTime(time) };
}

export function getStudentStatus(student) {
  return student.status || 'Pending';
}

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [metrics, setMetrics] = useState(emptyMetrics);
  const [branchMetrics, setBranchMetrics] = useState(emptyBranches);
  const [dailyProgress, setDailyProgress] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [hourlyProgress, setHourlyProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadStudents = useCallback(async (filters = {}) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetchStudents(filters);
      setStudents(response.data.map(normalizeStudent));
    } catch (requestError) {
      setError(getApiError(requestError, 'Unable to load students.'));
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshOverview = useCallback(async () => {
    try {
      const [dashboard, branches, progress] = await Promise.all([
        fetchDashboardAnalytics(),
        fetchBranchAnalytics(),
        fetchProgressAnalytics(),
      ]);
      setMetrics(dashboard);
      setBranchMetrics(branches);
      setDailyProgress([
        { label: 'Reported Today', value: progress.daily.reported },
        { label: 'Phone Verified', value: progress.daily.phone },
        { label: 'Documents Scanned', value: progress.daily.scan },
        { label: 'Final Verified', value: progress.daily.final },
      ]);
      setRecentActivities(progress.recentStudents.map(recentActivity));
      setHourlyProgress(progress.hourlyProgress);
    } catch (requestError) {
      setError(getApiError(requestError, 'Unable to load reporting analytics.'));
    }
  }, []);

  const refreshAll = useCallback(async () => {
    await Promise.all([loadStudents(), refreshOverview()]);
  }, [loadStudents, refreshOverview]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const completeStep = async (id, step, phoneValues) => {
    setError('');
    const endpoint = step === 'scan' ? 'scanning' : step;
    const payload = step === 'phone'
      ? { studentPhone: phoneValues.studentPhone, parentPhone: phoneValues.parentPhone }
      : undefined;

    try {
      const updated = normalizeStudent(await updateWorkflow(id, endpoint, payload));
      setStudents((current) => current.map((student) => (student.id === id ? updated : student)));
      await refreshOverview();
      return true;
    } catch (requestError) {
      setError(getApiError(requestError, 'Unable to update workflow.'));
      return false;
    }
  };

  const value = useMemo(
    () => ({
      students,
      metrics,
      branchMetrics,
      dailyProgress,
      recentActivities,
      hourlyProgress,
      loading,
      error,
      loadStudents,
      refreshAll,
      completeStep,
    }),
    [students, metrics, branchMetrics, dailyProgress, recentActivities, hourlyProgress, loading, error, loadStudents, refreshAll],
  );

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudents() {
  return useContext(StudentContext);
}
