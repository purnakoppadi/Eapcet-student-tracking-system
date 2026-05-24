import BranchBadge from './BranchBadge';

export default function AnalyticsCard({ branch, total, pending, completed }) {
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between">
        <BranchBadge branch={branch} />
        <p className="text-sm font-semibold text-slate-500">{total} students</p>
      </div>
      <div className="mt-5 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-full rounded-full bg-brand-500" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <div>
          <p className="text-slate-500">Completed</p>
          <p className="mt-1 font-bold text-emerald-600 dark:text-emerald-400">{completed}</p>
        </div>
        <div className="text-right">
          <p className="text-slate-500">Pending</p>
          <p className="mt-1 font-bold text-amber-600 dark:text-amber-400">{pending}</p>
        </div>
      </div>
    </div>
  );
}
