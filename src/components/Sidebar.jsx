import { BarChart3, GraduationCap, LayoutDashboard, LogOut, Settings, Upload, Users, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Students', path: '/students', icon: Users },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Upload', path: '/upload', icon: Upload },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-slate-950/45 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-200 dark:border-slate-800 dark:bg-slate-900 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
              <GraduationCap size={23} />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">EAPCET STS</p>
              <p className="text-xs text-slate-500">Admission Reporting</p>
            </div>
          </div>
          <button className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="px-4 pb-3 pt-7 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Main Menu</div>
        <nav className="flex-1 space-y-1.5 px-3">
          {navigation.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-blue-300'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`
              }
            >
              <Icon size={19} />
              {name}
            </NavLink>
          ))}
        </nav>
        <div className="m-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">REPORTING SESSION</p>
          <p className="mt-2 text-sm font-semibold">Phase 1 Counselling</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">23 May 2026</p>
        </div>
        <NavLink to="/" onClick={onClose} className="m-4 mt-0 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30">
          <LogOut size={18} />
          Log out
        </NavLink>
      </aside>
    </>
  );
}
