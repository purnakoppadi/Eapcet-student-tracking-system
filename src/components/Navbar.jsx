import { Bell, ChevronDown, Menu, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const titles = {
  '/dashboard': ['Dashboard', 'Admissions workflow overview'],
  '/students': ['Student Tracking', 'Monitor every reporting stage'],
  '/analytics': ['Analytics', 'Branch and daily completion trends'],
  '/upload': ['Upload Students', 'Import counselling allotment records'],
  '/settings': ['Settings', 'Account and display preferences'],
};

export default function Navbar({ pathname, onMenu }) {
  const [title, subtitle] = titles[pathname] || titles['/dashboard'];
  const user = { username: 'Admissions User', role: 'Admissions' };
  const initials = user?.username?.slice(0, 2).toUpperCase() || 'AD';

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:px-7">
      <div className="flex min-w-0 items-center gap-3">
        <button className="rounded-xl border p-2 text-slate-600 dark:text-slate-300 lg:hidden" onClick={onMenu}>
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-slate-900 dark:text-white sm:text-xl">{title}</h1>
          <p className="hidden truncate text-sm text-slate-500 sm:block">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="relative hidden xl:block">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input className="input w-64 py-2 pl-10" placeholder="Quick search..." />
        </div>
        <ThemeToggle />
        <button className="relative rounded-xl border bg-white p-2.5 text-slate-600 dark:bg-slate-900 dark:text-slate-200">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-500" />
        </button>
        <div className="hidden items-center gap-2 border-l pl-4 sm:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-sm font-bold text-brand-700 dark:bg-brand-950 dark:text-blue-300">{initials}</div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold">{user?.username || 'Admissions User'}</p>
            <p className="text-xs text-slate-500">{user?.role || 'Admissions'}</p>
          </div>
          <ChevronDown size={16} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
}
