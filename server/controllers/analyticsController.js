const Student = require('../models/Student');

async function getDashboardAnalytics(req, res) {
  const result = await Student.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        pending: { $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] } },
        inProgress: { $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] } },
        completed: { $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] } },
      },
    },
  ]);

  const summary = result[0]
    ? {
        total: result[0].total,
        pending: result[0].pending,
        inProgress: result[0].inProgress,
        completed: result[0].completed,
      }
    : { total: 0, pending: 0, inProgress: 0, completed: 0 };

  res.status(200).json({ success: true, data: summary });
}

async function getBranchAnalytics(req, res) {
  const aggregated = await Student.aggregate([
    {
      $group: {
        _id: '$branch',
        total: { $sum: 1 },
        pending: { $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] } },
        inProgress: { $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] } },
        completed: { $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] } },
      },
    },
  ]);

  const byBranch = new Map(aggregated.map(({ _id, ...values }) => [_id, values]));
  const data = ['CSE', 'AIML', 'CIC'].map((branch) => ({
    branch,
    ...(byBranch.get(branch) || { total: 0, pending: 0, inProgress: 0, completed: 0 }),
  }));

  res.status(200).json({ success: true, data });
}

async function getProgressAnalytics(req, res) {
  const timezone = process.env.REPORTING_TIMEZONE || 'Asia/Kolkata';
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: timezone }).format(new Date());
  const occurredToday = (field) => ({
    $eq: [
      { $dateToString: { date: field, format: '%Y-%m-%d', timezone } },
      today,
    ],
  });

  const [dailyResult, reportedHours, completedHours, recentStudents] = await Promise.all([
    Student.aggregate([
      {
        $group: {
          _id: null,
          reported: { $sum: { $cond: [occurredToday('$reportedTime'), 1, 0] } },
          phone: { $sum: { $cond: [occurredToday('$phoneStepTime'), 1, 0] } },
          scan: { $sum: { $cond: [occurredToday('$scanningStepTime'), 1, 0] } },
          final: { $sum: { $cond: [occurredToday('$finalVerificationTime'), 1, 0] } },
        },
      },
    ]),
    Student.aggregate([
      { $match: { $expr: occurredToday('$reportedTime') } },
      { $group: { _id: { $hour: { date: '$reportedTime', timezone } }, count: { $sum: 1 } } },
    ]),
    Student.aggregate([
      { $match: { $expr: occurredToday('$finalVerificationTime') } },
      { $group: { _id: { $hour: { date: '$finalVerificationTime', timezone } }, count: { $sum: 1 } } },
    ]),
    Student.aggregate([
      { $match: { $expr: occurredToday('$updatedAt') } },
      { $sort: { updatedAt: -1 } },
      { $limit: 4 },
    ]),
  ]);

  const reportedMap = new Map(reportedHours.map((item) => [item._id, item.count]));
  const completedMap = new Map(completedHours.map((item) => [item._id, item.count]));
  const activeHours = new Set([...reportedMap.keys(), ...completedMap.keys()]);
  const hourlyProgress = [...activeHours]
    .sort((a, b) => a - b)
    .map((hour) => ({
      hour,
      reported: reportedMap.get(hour) || 0,
      completed: completedMap.get(hour) || 0,
    }));

  res.status(200).json({
    success: true,
    data: {
      daily: dailyResult[0] || { reported: 0, phone: 0, scan: 0, final: 0 },
      hourlyProgress,
      recentStudents,
    },
  });
}

module.exports = { getDashboardAnalytics, getBranchAnalytics, getProgressAnalytics };
