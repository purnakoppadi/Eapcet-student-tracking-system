import { CheckCircle2, Clock3, TrendingUp, Users } from 'lucide-react';
import AnalyticsCard from '../components/AnalyticsCard';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { useStudents } from '../context/StudentContext';

export default function Analytics() {
  const { metrics, branchMetrics, dailyProgress, hourlyProgress, error } = useStudents();
  const chartData = hourlyProgress.length ? hourlyProgress : [{ hour: new Date().getHours(), reported: 0, completed: 0 }];
  const maxVolume = Math.max(...chartData.map((item) => Math.max(item.reported, item.completed)), 1);

  return (
    <div className="space-y-7">
      {error && <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Allotted Students" value={metrics.total} icon={Users} color="blue" />
        <StatCard label="Pending Reporting" value={metrics.pending} icon={Clock3} color="amber" />
        <StatCard label="Completed Workflow" value={metrics.completed} icon={CheckCircle2} color="emerald" />
      </div>

      <section>
        <SectionHeader title="Branch-wise Analytics" subtitle="Live UI snapshot from local counselling data" />
        <div className="grid gap-4 md:grid-cols-3">
          {branchMetrics.map((item) => <AnalyticsCard key={item.branch} {...item} />)}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <section className="panel p-5 sm:p-6">
          <SectionHeader
            title="Hourly Progress"
            subtitle="Reported compared with final verified"
            action={<span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><TrendingUp size={14} /> Positive trend</span>}
          />
          <div className="mt-7 flex h-56 items-end justify-between gap-3 sm:gap-7">
            {chartData.map((item) => (
              <div key={item.hour} className="flex h-full flex-1 flex-col justify-end">
                <div className="flex flex-1 items-end justify-center gap-1.5">
                  <div className="w-5 rounded-t-md bg-blue-200 dark:bg-blue-900 sm:w-8" style={{ height: `${(item.reported / maxVolume) * 170}px` }} />
                  <div className="w-5 rounded-t-md bg-brand-600 sm:w-8" style={{ height: `${(item.completed / maxVolume) * 170}px` }} />
                </div>
                <p className="mt-3 text-center text-xs font-semibold text-slate-500">{new Date(0, 0, 0, item.hour).toLocaleTimeString('en-IN', { hour: '2-digit' })}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-center gap-5 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-blue-200 dark:bg-blue-900" /> Reported</span>
            <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-brand-600" /> Completed</span>
          </div>
        </section>
        <section className="panel p-5 sm:p-6">
          <SectionHeader title="Daily Progress Cards" subtitle="Desk milestone summary" />
          <div className="space-y-3">
            {dailyProgress.map((item, index) => (
              <div key={item.label} className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-800/45">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-sm font-bold text-brand-700 dark:bg-brand-950 dark:text-blue-300">{index + 1}</span>
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">Recorded today</p>
                  </div>
                </div>
                <p className="text-xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
