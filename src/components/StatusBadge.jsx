const statuses = {
  Completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300',
  'In Progress': 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300',
  Pending: 'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300',
};

export default function StatusBadge({ status }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statuses[status]}`}>{status}</span>;
}
