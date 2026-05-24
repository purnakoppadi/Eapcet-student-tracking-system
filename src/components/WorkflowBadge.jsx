import { CheckCircle2, Minus } from 'lucide-react';

export default function WorkflowBadge({ timestamp }) {
  if (!timestamp) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
        <Minus size={14} /> Pending
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-emerald-600 dark:text-emerald-400">
      <CheckCircle2 size={15} />
      {timestamp}
    </span>
  );
}
