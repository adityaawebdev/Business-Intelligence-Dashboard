import React, { useState } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  Trash2,
  Download,
  Info,
  Layers
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import { recentDatasets } from '../mockData/uploadData';

export default function DataUpload() {
  const [datasets, setDatasets] = useState(recentDatasets);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.name.endsWith('.csv') ? 'CSV' : 'XLSX'
      });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.name.endsWith('.csv') ? 'CSV' : 'XLSX'
      });
    }
  };

  const handleSimulateUpload = () => {
    if (!selectedFile) return;
    const newEntry = {
      id: `ds-${Date.now()}`,
      name: selectedFile.name,
      fileType: selectedFile.type,
      fileSize: selectedFile.size,
      records: 'Calculating...',
      uploadedBy: 'Admin User',
      uploadedDate: 'Just now',
      status: 'Processing',
      processingTime: 'In progress'
    };
    setDatasets([newEntry, ...datasets]);
    setSelectedFile(null);
  };

  const datasetColumns = [
    {
      key: 'name',
      header: 'Dataset Name',
      width: '28%',
      render: (val, row) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 flex-shrink-0">
            <FileSpreadsheet className="h-4 w-4" />
          </div>
          <div className="truncate">
            <span className="font-semibold text-slate-800 block truncate">{val}</span>
            <span className="text-[10px] text-slate-400 font-mono">{row.fileSize}</span>
          </div>
        </div>
      )
    },
    {
      key: 'fileType',
      header: 'Format',
      align: 'center',
      render: (val) => (
        <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-mono font-semibold text-slate-700">
          {val}
        </span>
      )
    },
    { key: 'records', header: 'Records Count', align: 'right' },
    { key: 'uploadedBy', header: 'Uploaded By' },
    { key: 'uploadedDate', header: 'Uploaded Timestamp' },
    {
      key: 'status',
      header: 'ETL Pipeline Status',
      align: 'center',
      render: (val) => <StatusBadge status={val} />
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'center',
      render: (_, row) => (
        <div className="flex items-center justify-center gap-2 text-slate-400">
          <button
            onClick={() => alert(`Inspecting schema for ${row.name}`)}
            className="p-1 rounded hover:text-indigo-600 hover:bg-slate-100 transition-colors"
            title="Inspect dataset"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => alert(`Downloading raw file ${row.name}`)}
            className="p-1 rounded hover:text-emerald-600 hover:bg-slate-100 transition-colors"
            title="Download dataset"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => {
              if (confirm(`Remove dataset ${row.name}?`)) {
                setDatasets(datasets.filter(d => d.id !== row.id));
              }
            }}
            className="p-1 rounded hover:text-rose-600 hover:bg-slate-100 transition-colors"
            title="Delete dataset"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dataset Ingestion & ETL Pipeline"
        subtitle="Upload structured business files (CSV, XLSX) to trigger automated data cleaning, Pandas transformations, and BI metric updates."
        badge="Data Ingestion"
      />

      {/* Upload Area */}
      <section className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Upload Dataset
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload CSV or Excel files to analyze your business data with the upcoming Python analytics engine.
          </p>
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 sm:p-12 text-center transition-all ${
            dragActive
              ? 'border-indigo-500 bg-indigo-50/50'
              : 'border-slate-300 hover:border-slate-400 bg-slate-50/40'
          }`}
        >
          <input
            type="file"
            id="dataset-upload-input"
            accept=".csv, .xlsx, .xls"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4 shadow-xs">
            <UploadCloud className="h-7 w-7" />
          </div>

          <h4 className="text-sm font-bold text-slate-800 tracking-tight">
            Drag and drop your dataset here, or{' '}
            <label
              htmlFor="dataset-upload-input"
              className="text-indigo-600 hover:text-indigo-700 underline cursor-pointer font-semibold"
            >
              browse local files
            </label>
          </h4>

          <p className="mt-2 text-xs text-slate-500">
            Supported file formats: <span className="font-semibold text-slate-700">CSV, XLSX, XLS</span>
          </p>

          <div className="mt-3 flex items-center gap-4 text-[11px] text-slate-400">
            <span>Maximum file size: <strong className="text-slate-600">50 MB</strong></span>
            <span>&bull;</span>
            <span>Schema: Standard tabular records</span>
          </div>

          {selectedFile && (
            <div className="mt-5 w-full max-w-md rounded-lg border border-indigo-200 bg-indigo-50/70 p-3 flex items-center justify-between text-xs animate-in fade-in">
              <div className="flex items-center gap-2.5 truncate">
                <FileSpreadsheet className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                <span className="font-semibold text-indigo-950 truncate">{selectedFile.name}</span>
                <span className="text-[10px] text-indigo-700">({selectedFile.size})</span>
              </div>
              <button
                onClick={handleSimulateUpload}
                className="rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs"
              >
                Upload File
              </button>
            </div>
          )}

          {!selectedFile && (
            <div className="mt-5">
              <label
                htmlFor="dataset-upload-input"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-2xs cursor-pointer"
              >
                <UploadCloud className="h-4 w-4" />
                Select File to Upload
              </label>
            </div>
          )}
        </div>

        {/* Informational Callout */}
        <div className="mt-4 rounded-lg bg-slate-50 p-3.5 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
          <Info className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Upcoming Backend Architecture:</strong> Upon file ingestion, the Python FastAPI backend will receive multipart payloads, validate schemas using Pydantic, execute vectorized calculations via Pandas & NumPy, and cache processed metrics for instant querying.
          </p>
        </div>
      </section>

      {/* Recent Datasets Table */}
      <section>
        <DataTable
          title="Recent Ingested Datasets"
          subtitle="Audit log of uploaded files, data volume, and ETL processing outcomes"
          columns={datasetColumns}
          data={datasets}
          searchPlaceholder="Search dataset by filename..."
          rowsPerPage={6}
        />
      </section>
    </div>
  );
}
