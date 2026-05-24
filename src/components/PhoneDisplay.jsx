import { Minus, Phone, Users } from 'lucide-react';

export default function PhoneDisplay({ studentPhone, parentPhone, timestamp }) {
  if (!timestamp) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
        <Minus size={14} /> Pending
      </span>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <Phone size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          {studentPhone || '-'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Users size={14} className="text-amber-600 dark:text-amber-400 shrink-0" />
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          {parentPhone || '-'}
        </span>
      </div>
      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
        ✅ {timestamp}
      </div>
    </div>
  );
}
