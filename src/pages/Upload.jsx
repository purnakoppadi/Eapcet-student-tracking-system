import { CheckCircle2, Download, FileSpreadsheet, UploadCloud, X } from 'lucide-react';
import { useRef, useState } from 'react';
import BranchBadge from '../components/BranchBadge';
import SectionHeader from '../components/SectionHeader';
import { useStudents } from '../context/StudentContext';
import { getApiError } from '../services/api';
import { uploadStudentsCsv } from '../services/uploadService';

function previewCsv(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((header) => header.trim().toLowerCase());

  return lines.slice(1, 6).map((line) => {
    const values = line.split(',').map((value) => value.trim());
    const row = Object.fromEntries(headers.map((header, index) => [header, values[index] || '']));
    const branch = row.branch.toUpperCase();
    const valid = Boolean(row.rank && row.name && ['CSE', 'AIML', 'CIC'].includes(branch));
    return { rank: row.rank, name: row.name, branch, status: valid ? 'Valid' : 'Invalid' };
  });
}

export default function Upload() {
  const inputRef = useRef(null);
  const { refreshAll } = useStudents();
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [previewRows, setPreviewRows] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const acceptFile = async (selected) => {
    if (!selected) return;
    setError('');
    setMessage('');
    if (!selected.name.toLowerCase().endsWith('.csv')) {
      setError('Only CSV files can be uploaded.');
      return;
    }

    setSelectedFile(selected);
    const rows = previewCsv(await selected.text());
    setPreviewRows(rows);
    setFile({
      name: selected.name,
      size: `${Math.max(1, Math.round(selected.size / 1024))} KB`,
      records: rows.length,
    });
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFile(null);
    setPreviewRows([]);
    setMessage('');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const onDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    acceptFile(event.dataTransfer.files[0]);
  };

  const confirmImport = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setError('');
    setMessage('');
    try {
      const result = await uploadStudentsCsv(selectedFile);
      setMessage(`${result.inserted} students imported. ${result.rejected} records rejected.`);
      await refreshAll();
    } catch (requestError) {
      setError(getApiError(requestError, 'Unable to upload CSV file.'));
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const blob = new Blob(['Rank,Name,Branch\n1234,Student Name,CSE\n'], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'student_upload_template.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="panel p-5 sm:p-7">
        <SectionHeader title="Upload Student Allotment CSV" subtitle="Import the reporting queue for the active phase" />
        <div
          className={`mt-7 flex min-h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed p-7 text-center transition ${
            dragging ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40' : 'border-slate-200 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-800/30'
          }`}
          onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <span className="mb-5 rounded-2xl bg-brand-50 p-4 text-brand-600 dark:bg-brand-950 dark:text-blue-300"><UploadCloud size={30} /></span>
          <h3 className="text-base font-bold">Drag and drop your CSV file</h3>
          <p className="mt-2 text-sm text-slate-500">or choose a file from your computer</p>
          <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={(event) => acceptFile(event.target.files[0])} />
          <button type="button" className="btn-primary mt-6" onClick={() => inputRef.current.click()}>
            <FileSpreadsheet size={17} /> Upload CSV
          </button>
          <p className="mt-5 text-xs text-slate-400">CSV only, maximum file size 10 MB</p>
        </div>
        <button type="button" onClick={downloadTemplate} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-blue-300">
          <Download size={16} /> Download sample CSV template
        </button>
      </section>

      <section className="panel overflow-hidden">
        <div className="border-b p-5 sm:p-6">
          <SectionHeader title="Uploaded File Preview" subtitle="Review valid rows before future submission" />
          {file && (
            <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
              <div className="flex min-w-0 items-center gap-3">
                <FileSpreadsheet className="shrink-0 text-emerald-600" size={22} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{file.name}</p>
                  <p className="text-xs text-slate-500">{file.size} | {file.records} preview records</p>
                </div>
              </div>
              <button type="button" className="text-slate-400 hover:text-red-500" onClick={removeFile}><X size={18} /></button>
            </div>
          )}
          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
          {message && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{message}</p>}
        </div>
        <div className="overflow-x-auto p-5 sm:p-6">
          <table className="w-full min-w-[430px] text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="pb-4">Rank</th>
                <th className="pb-4">Student Name</th>
                <th className="pb-4">Branch</th>
                <th className="pb-4">Validation</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-800">
              {previewRows.map((row, index) => (
                <tr key={`${row.rank}-${index}`}>
                  <td className="py-4 font-semibold">#{row.rank}</td>
                  <td className="py-4">{row.name}</td>
                  <td className="py-4">{['CSE', 'AIML', 'CIC'].includes(row.branch) ? <BranchBadge branch={row.branch} /> : row.branch}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${row.status === 'Valid' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-300'}`}>
                      <CheckCircle2 size={14} />{row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!previewRows.length && <p className="py-8 text-center text-sm text-slate-500">Choose a CSV file to preview student records.</p>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t p-5 sm:px-6">
          <p className="text-xs text-slate-500">Valid records will be stored in MongoDB after confirmation.</p>
          <button type="button" className="btn-primary" disabled={!selectedFile || uploading} onClick={confirmImport}>
            {uploading ? 'Importing...' : 'Confirm Import'}
          </button>
        </div>
      </section>
    </div>
  );
}
