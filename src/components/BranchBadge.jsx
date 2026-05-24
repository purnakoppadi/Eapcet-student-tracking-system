const badgeClasses = {
  CSE: 'bg-blue-50 text-blue-700 ring-blue-600/10 dark:bg-blue-950 dark:text-blue-300',
  AIML: 'bg-violet-50 text-violet-700 ring-violet-600/10 dark:bg-violet-950 dark:text-violet-300',
  CIC: 'bg-cyan-50 text-cyan-700 ring-cyan-600/10 dark:bg-cyan-950 dark:text-cyan-300',
};

export default function BranchBadge({ branch }) {
  return <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${badgeClasses[branch]}`}>{branch}</span>;
}
