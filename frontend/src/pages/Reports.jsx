import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Download,
  Eye,
  Share2,
  Calendar,
  Filter,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import { reportsList } from '../mockData/reportData';

export default function Reports() {
  const [reports, setReports] = useState(reportsList);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newReportName, setNewReportName] = useState('');
  const [newReportType, setNewReportType] = useState('Executive Summary (PDF)');

  const handleCreateReport = (e) => {
    e.preventDefault();
    if (!newReportName.trim()) return;

    const newReport = {
      id: `rep-${Date.now()}`,
      name: newReportName,
      type: newReportType,
      frequency: 'Ad-hoc',
      createdBy: 'Admin User',
      createdDate: 'Just now',
      fileSize: '3.2 MB',
      status: 'Ready'
    };

    setReports([newReport, ...reports]);
    setNewReportName('');
    setShowCreateModal(false);
  };

  const reportColumns = [
    {
      key: 'name',
      header: 'Report Title & Scope',
      width: '32%',
      render: (val, row) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 flex-shrink-0">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <span className="font-semibold text-slate-900 block">{val}</span>
            <span className="text-[10px] text-slate-400 font-medium">Frequency: {row.frequency} &bull; {row.fileSize}</span>
          </div>
        </div>
      )
    },
    {
      key: 'type',
      header: 'Report Format',
      render: (val) => (
        <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
          <FileSpreadsheet className="h-3.5 w-3.5 text-slate-400" />
          {val}
        </span>
      )
    },
    { key: 'createdBy', header: 'Author' },
    { key: 'createdDate', header: 'Generated On' },
    {
      key: 'status',
      header: 'Dispatch State',
      align: 'center',
      render: (val) => <StatusBadge status={val} />
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'center',
      render: (_, row) => (
        <div className="flex items-center justify-center gap-1.5 text-slate-500">
          <button
            onClick={() => alert(`Viewing report: ${row.name}`)}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold hover:bg-slate-100 hover:text-indigo-600 transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>View</span>
          </button>
          <button
            onClick={() => alert(`Downloading artifact for ${row.name}`)}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold hover:bg-slate-100 hover:text-emerald-600 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="BI Reports & Executive Dispatches"
        subtitle="Schedule, compile, export, and distribute cross-departmental analytics reports."
        badge="Reporting Engine"
        actions={
          <>
            <button
              onClick={() => alert('Exporting consolidated reports manifest...')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              Export All
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
            >
              <Plus className="h-3.5 w-3.5" />
              Create Report
            </button>
          </>
        }
      />

      {/* Reports Table */}
      <section>
        <DataTable
          title="Generated Reports & Scheduled Dispatches"
          subtitle="Enterprise documents compiled by the reporting engine"
          columns={reportColumns}
          data={reports}
          searchPlaceholder="Search report name or type..."
          rowsPerPage={6}
        />
      </section>

      {/* Create Report Modal (UI Only) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create New BI Report</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Report Title
                </label>
                <input
                  type="text"
                  required
                  value={newReportName}
                  onChange={(e) => setNewReportName(e.target.value)}
                  placeholder="e.g. Q4 Regional Operations Performance"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Output Format & Scope
                </label>
                <select
                  value={newReportType}
                  onChange={(e) => setNewReportType(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="Executive Summary (PDF)">Executive Summary (PDF)</option>
                  <option value="Financial Audit (XLSX)">Financial Audit (XLSX)</option>
                  <option value="Customer Analytics (PDF)">Customer Analytics (PDF)</option>
                  <option value="Operations Brief (PDF)">Operations Brief (PDF)</option>
                  <option value="Product Diagnostics (CSV)">Product Diagnostics (CSV)</option>
                </select>
              </div>

              <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-500 border border-slate-200">
                This will trigger the report generator template. When the FastAPI backend is attached, it will assemble Pandas charts and PDF exports asynchronously.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                >
                  Generate Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
