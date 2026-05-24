import { ArrowUpRight } from 'lucide-react';

const colors = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300',
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300',
};

export default function StatCard({ label, value, change, icon: Icon, color = 'blue' }) {
  return (
    <div className="panel flex items-start justify-between p-5">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
        {change && (
          <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ArrowUpRight size={14} />
            {change} today
          </p>
        )}
      </div>
      <span className={`rounded-xl p-3 ${colors[color]}`}>
        <Icon size={22} />
      </span>
    </div>
  );
}
