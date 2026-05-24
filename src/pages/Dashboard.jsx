import { ClipboardCheck, Clock3, Hourglass, Users } from 'lucide-react';
import AnalyticsCard from '../components/AnalyticsCard';
import BranchBadge from '../components/BranchBadge';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { useStudents } from '../context/StudentContext';

export default function Dashboard() {
  const { metrics, branchMetrics, dailyProgress, recentActivities, error } = useStudents();

  return (
    <div className="space-y-7">
      {error && <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        <StatCard label="Total Students" value={metrics.total} icon={Users} color="blue" />
        <StatCard label="Pending" value={metrics.pending} icon={Hourglass} color="amber" />
        <StatCard label="In Progress" value={metrics.inProgress} icon={Clock3} color="indigo" />
        <StatCard label="Completed" value={metrics.completed} icon={ClipboardCheck} color="emerald" />
      </div>

      <section>
        <SectionHeader title="Branch Analytics" subtitle="Current completion summary by allotted branch" />
        <div className="grid gap-4 md:grid-cols-3">
          {branchMetrics.map((branch) => <AnalyticsCard key={branch.branch} {...branch} />)}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="panel p-5">
          <SectionHeader title="Daily Progress" subtitle="Reporting desk throughput today" />
          <div className="grid gap-3 sm:grid-cols-2">
            {dailyProgress.map((item) => (
              <div key={item.label} className="rounded-xl border bg-slate-50 p-4 dark:bg-slate-800/40">
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-2xl font-bold">{item.value}</p>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-950">Today</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="panel p-5">
          <SectionHeader title="Recent Activity" subtitle="Latest desk updates" />
          <div className="space-y-1">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 rounded-xl px-2 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <div className="h-9 w-1 rounded-full bg-brand-500" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold">{activity.name}</p>
                    <BranchBadge branch={activity.branch} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{activity.action}</p>
                </div>
                <p className="whitespace-nowrap text-xs font-medium text-slate-500">{activity.time}</p>
              </div>
            ))}
            {recentActivities.length === 0 && <p className="px-2 py-8 text-center text-sm text-slate-500">No workflow activity recorded today.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
