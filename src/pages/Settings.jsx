import { Building2, Mail, ShieldCheck, UserRound } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function Settings() {
  const user = { username: 'Admissions User', role: 'Admissions', email: 'admissions@college.edu' };
  const initials = user?.username?.slice(0, 2).toUpperCase() || 'AD';
  const displayName = user?.username || 'Admissions User';

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
      <section className="panel p-6">
        <h2 className="text-lg font-bold">User Profile</h2>
        <p className="mt-1 text-sm text-slate-500">Admission officer account information</p>
        <div className="mt-7 flex items-center gap-4 border-b pb-7">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-xl font-bold text-brand-700 dark:bg-brand-950 dark:text-blue-300">{initials}</div>
          <div>
            <p className="text-lg font-bold">{displayName}</p>
            <p className="text-sm text-slate-500">{user?.role || 'Reporting Coordinator'}</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {[
            { icon: UserRound, label: 'Username', value: user?.username || '-' },
            { icon: Mail, label: 'Email', value: user?.email || '-' },
            { icon: Building2, label: 'College', value: 'EAPCET Participating College' },
            { icon: ShieldCheck, label: 'Role', value: user?.role || '-' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 rounded-xl bg-slate-50 px-4 py-3.5 dark:bg-slate-800/50">
              <Icon size={18} className="text-slate-400" />
              <div>
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-5">
        <div className="panel p-6">
          <h2 className="text-lg font-bold">Appearance</h2>
          <p className="mt-1 text-sm text-slate-500">Choose your dashboard display preference</p>
          <div className="mt-6 flex items-center justify-between rounded-xl border p-4">
            <div>
              <p className="text-sm font-semibold">Color Theme</p>
              <p className="mt-1 text-xs text-slate-500">Toggle light or dark interface</p>
            </div>
            <ThemeToggle labeled />
          </div>
        </div>
        <div className="panel p-6">
          <h2 className="text-lg font-bold">Session Details</h2>
          <div className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Counselling phase</span><span className="font-semibold">Phase 1</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Academic year</span><span className="font-semibold">2026-27</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Access status</span><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">Active</span></div>
          </div>
        </div>
      </section>
    </div>
  );
}
