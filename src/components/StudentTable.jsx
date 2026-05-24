import BranchBadge from './BranchBadge';
import StatusBadge from './StatusBadge';
import WorkflowBadge from './WorkflowBadge';
import PhoneDisplay from './PhoneDisplay';
import { getStudentStatus } from '../context/StudentContext';

export default function StudentTable({ students, onAction }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
      <div className="max-h-[610px] overflow-auto">
        <table className="min-w-[1220px] w-full text-left text-sm">
          <thead className="sticky top-0 z-10 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            <tr>
              {['Rank', 'Name', 'Branch', 'Reported', 'Phone', 'Scan', 'Final', 'Status', 'Actions'].map((column) => (
                <th key={column} className="px-4 py-4">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900">
            {students.map((student) => (
              <tr key={student.id} className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/45">
                <td className="px-4 py-4 font-semibold text-slate-600 dark:text-slate-300">#{student.rank}</td>
                <td className="px-4 py-4 font-semibold">{student.name}</td>
                <td className="px-4 py-4"><BranchBadge branch={student.branch} /></td>
                <td className="px-4 py-4"><WorkflowBadge timestamp={student.workflow.reported} /></td>
                <td className="px-4 py-4"><PhoneDisplay studentPhone={student.studentPhone} parentPhone={student.parentPhone} timestamp={student.workflow.phone} /></td>
                <td className="px-4 py-4"><WorkflowBadge timestamp={student.workflow.scan} /></td>
                <td className="px-4 py-4"><WorkflowBadge timestamp={student.workflow.final} /></td>
                <td className="px-4 py-4"><StatusBadge status={getStudentStatus(student)} /></td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1.5">
                    <button className="btn-secondary" disabled={Boolean(student.workflow.reported)} onClick={() => onAction(student, 'reported')}>Mark Arrived</button>
                    <button className="btn-secondary" disabled={!student.workflow.reported || Boolean(student.workflow.phone)} onClick={() => onAction(student, 'phone')}>Phone Step</button>
                    <button className="btn-secondary" disabled={!student.workflow.phone || Boolean(student.workflow.scan)} onClick={() => onAction(student, 'scan')}>Scan Complete</button>
                    <button className="btn-secondary" disabled={!student.workflow.scan || Boolean(student.workflow.final)} onClick={() => onAction(student, 'final')}>Final Verify</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {students.length === 0 && <p className="bg-white px-6 py-12 text-center text-sm text-slate-500 dark:bg-slate-900">No students found for the selected filters.</p>}
    </div>
  );
}
