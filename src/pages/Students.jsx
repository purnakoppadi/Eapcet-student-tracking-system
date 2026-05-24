import { Filter, Search, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import StudentTable from '../components/StudentTable';
import { useStudents } from '../context/StudentContext';

export default function Students() {
  const { students, completeStep, loadStudents, loading, error } = useStudents();
  const [rankSearch, setRankSearch] = useState('');
  const [branch, setBranch] = useState('All');
  const [phoneStudent, setPhoneStudent] = useState(null);
  const [phoneForm, setPhoneForm] = useState({ phone: '', parentPhone: '' });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadStudents({
        ...(rankSearch.trim() ? { rank: rankSearch.trim() } : {}),
        ...(branch !== 'All' ? { branch } : {}),
      });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [rankSearch, branch, loadStudents]);

  const handleAction = (student, step) => {
    if (step === 'phone') {
      setPhoneStudent(student);
      setPhoneForm({ studentPhone: student.phone || '', parentPhone: student.parentPhone || '' });
      return;
    }
    completeStep(student.id, step);
  };

  const submitPhoneStep = async (event) => {
    event.preventDefault();
    const completed = await completeStep(phoneStudent.id, 'phone', phoneForm);
    if (completed) setPhoneStudent(null);
  };

  return (
    <div className="panel overflow-hidden">
      <div className="flex flex-col justify-between gap-4 border-b p-5 lg:flex-row lg:items-center">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold"><Users size={20} className="text-brand-600" /> Student Workflow Queue</h2>
          <p className="mt-1 text-sm text-slate-500">{loading ? 'Loading student records...' : `${students.length} student records shown`}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              className="input sm:w-52 pl-10"
              value={rankSearch}
              onChange={(event) => setRankSearch(event.target.value.replace(/\D/g, ''))}
              placeholder="Search by rank"
            />
          </label>
          <label className="relative">
            <Filter className="absolute left-3 top-2.5 text-slate-400" size={17} />
            <select className="input min-w-40 appearance-none pl-10" value={branch} onChange={(event) => setBranch(event.target.value)}>
              {['All', 'CSE', 'AIML', 'CIC'].map((option) => (
                <option value={option} key={option}>{option === 'All' ? 'All Branches' : option}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      {error && <p className="mx-5 mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
      <StudentTable students={students} onAction={handleAction} />
      <Modal open={Boolean(phoneStudent)} title="Phone Verification Step" onClose={() => setPhoneStudent(null)}>
        <p className="mb-5 text-sm text-slate-500">
          Capture contact details for <span className="font-semibold text-slate-700 dark:text-slate-200">{phoneStudent?.name}</span>.
        </p>
        <form className="space-y-4" onSubmit={submitPhoneStep}>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Student Phone</span>
            <input className="input" value={phoneForm.studentPhone} onChange={(event) => setPhoneForm({ ...phoneForm, studentPhone: event.target.value })} placeholder="Enter student number" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Parent Phone</span>
            <input className="input" value={phoneForm.parentPhone} onChange={(event) => setPhoneForm({ ...phoneForm, parentPhone: event.target.value })} placeholder="Enter parent number" required />
          </label>
          <div className="flex justify-end gap-3 pt-3">
            <button type="button" className="btn-secondary px-4 py-2.5 text-sm" onClick={() => setPhoneStudent(null)}>Cancel</button>
            <button type="submit" className="btn-primary">Confirm Phone Step</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
