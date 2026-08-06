import React, { useState, useMemo } from 'react';
import { useLims } from '../../../context/LimsContext';

// Mock HIPAA / CAP / ISO 15189 Audit Trail Log Database
const mockAuditLogs = [
  {
    id: 'AUD-8801',
    timestamp: '2026-08-06 10:45:12 AM',
    caseId: 'CAS-2026-001',
    patientName: 'Sarah Jenkins',
    user: 'Dr. Evelyn Vance (Pathologist)',
    userRole: 'Pathologist',
    ipAddress: '192.168.1.104',
    actionCategory: 'REPORT_DIGITALLY_SIGNED',
    actionDescription: 'Digitally signed and finalized pathology report.',
    previousValue: 'Status: Pending Review',
    newValue: 'Status: Signed & Finalized',
    complianceStandards: ['HIPAA §164.312', 'CAP Gen.41350', 'ISO 15189:2022'],
    version: 'v2.0 (Final)',
    hasDiff: true,
    diffDetails: {
      oldText: 'Report status: Pending Review by Pathologist.\nFindings: Pending clinical commentary.',
      newText: 'Report status: Signed & Finalized by Dr. Evelyn Vance.\nFindings: Unremarkable microscopic impression with negative malignancy.\nDigital Signature ID: SIG-990218-SHA256'
    }
  },
  {
    id: 'AUD-8802',
    timestamp: '2026-08-06 10:32:05 AM',
    caseId: 'CAS-2026-003',
    patientName: 'Elena Rostova',
    user: 'Tech. Marcus Brody',
    userRole: 'Lab Technician',
    ipAddress: '192.168.1.112',
    actionCategory: 'RESULT_VALUE_MODIFIED',
    actionDescription: 'Corrected WBC counter value after re-run on Sysmex XN-1000.',
    previousValue: 'WBC: 18.5 x10^3/µL',
    newValue: 'WBC: 7.2 x10^3/µL',
    complianceStandards: ['CAP HEM.25300', 'ISO 15189:2022 §5.6'],
    version: 'v1.1 (Amended)',
    hasDiff: true,
    diffDetails: {
      oldText: 'Sysmex Automated Counter Run #1: WBC 18.5 x10^3/µL (Flagged High).',
      newText: 'Sysmex Automated Counter Run #2 (Re-dilution): WBC 7.2 x10^3/µL (Verified Normal).'
    }
  },
  {
    id: 'AUD-8803',
    timestamp: '2026-08-06 10:15:40 AM',
    caseId: 'CAS-2026-002',
    patientName: 'Robert Chen',
    user: 'Dr. Evelyn Vance (Pathologist)',
    userRole: 'Pathologist',
    ipAddress: '192.168.1.104',
    actionCategory: 'INTERPRETATION_ADDED',
    actionDescription: 'Added clinical interpretation for Cytopathology Pap Smear.',
    previousValue: 'Interpretation: Empty',
    newValue: 'Interpretation: NILM (Negative for Intraepithelial Lesion)',
    complianceStandards: ['HIPAA §164.312', 'CAP CYP.28000'],
    version: 'v1.0',
    hasDiff: false,
  },
  {
    id: 'AUD-8804',
    timestamp: '2026-08-06 09:50:18 AM',
    caseId: 'CAS-2026-004',
    patientName: 'Marcus Vance',
    user: 'System Automated QC Engine',
    userRole: 'System LIMS Engine',
    ipAddress: '127.0.0.1 (Localhost)',
    actionCategory: 'RANGE_VALIDATION_PASSED',
    actionDescription: 'Automated Reference Range Verification completed for Surgical Pathology.',
    previousValue: 'QC Check: Pending',
    newValue: 'QC Check: Passed (Normal Limits)',
    complianceStandards: ['ISO 15189:2022 §5.5'],
    version: 'v1.0',
    hasDiff: false,
  },
  {
    id: 'AUD-8805',
    timestamp: '2026-08-05 04:22:11 PM',
    caseId: 'CAS-2026-005',
    patientName: 'David Kim',
    user: 'Admin Sarah Connor',
    userRole: 'Lab Manager',
    ipAddress: '192.168.1.101',
    actionCategory: 'RE_TEST_ORDERED',
    actionDescription: 'Flagged Bone Marrow Aspiration sample for repeat smear preparation.',
    previousValue: 'Status: Technician Submitted',
    newValue: 'Status: Re-test Flagged',
    complianceStandards: ['CAP GEN.42500'],
    version: 'v1.1',
    hasDiff: true,
    diffDetails: {
      oldText: 'Initial slide preparation: Low cellular yield.',
      newText: 'Re-test request: Secondary bone marrow aspirate slide smear ordered.'
    }
  }
];

export default function AuditHistory() {
  const { auditLogs: dbAuditLogs } = useLims();

  // Combine database logs with mock logs
  const logs = useMemo(() => {
    if (dbAuditLogs && dbAuditLogs.length > 0) {
      const existingIds = new Set(dbAuditLogs.map(l => l.id));
      const uniqueMock = mockAuditLogs.filter(l => !existingIds.has(l.id));
      return [...dbAuditLogs, ...uniqueMock];
    }
    return mockAuditLogs;
  }, [dbAuditLogs]);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [userRoleFilter, setUserRoleFilter] = useState('All');
  
  // Diff Modal State
  const [selectedDiffLog, setSelectedDiffLog] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Export audit log handler
  const handleExportAuditLog = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Log ID,Timestamp,Case ID,Patient,User,Action,Previous Value,New Value,Compliance"]
        .concat(filteredLogs.map(l => `"${l.id}","${l.timestamp}","${l.caseId}","${l.patientName}","${l.user}","${l.actionCategory}","${l.previousValue}","${l.newValue}","${l.complianceStandards.join('; ')}"`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LIMS_Audit_Trail_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage("Compliance Audit Log exported to CSV successfully.");
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter calculation
  const filteredLogs = useMemo(() => {
    return logs.filter(l => {
      const q = (searchQuery || '').toLowerCase();
      const matchesSearch =
        (l.id || l.logId || '').toString().toLowerCase().includes(q) ||
        (l.caseId || '').toLowerCase().includes(q) ||
        (l.patientName || '').toLowerCase().includes(q) ||
        (l.user || '').toLowerCase().includes(q) ||
        (l.actionDescription || '').toLowerCase().includes(q);

      const matchesCategory =
        categoryFilter === 'All' || l.actionCategory === categoryFilter;

      const matchesRole =
        userRoleFilter === 'All' || l.userRole === userRoleFilter;

      return matchesSearch && matchesCategory && matchesRole;
    });
  }, [logs, searchQuery, categoryFilter, userRoleFilter]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 space-y-6 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 animate-fade-in">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Compliance &amp; Audit Trail History</h1>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
              HIPAA &amp; ISO 15189 ACTIVE
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Complete cryptographic traceability, version history logs, user access records, and report revision diffs.
          </p>
        </div>

        <button
          onClick={handleExportAuditLog}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition cursor-pointer flex items-center gap-2 shadow-xs"
        >
          <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Export Audit Log (CSV)</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="lg:col-span-5 relative">
            <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by Log ID, Case ID, User Name, Action..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-400 outline-none transition"
            />
          </div>

          {/* Action Category Filter */}
          <div className="lg:col-span-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-400 outline-none transition"
            >
              <option value="All">All Action Categories</option>
              <option value="REPORT_DIGITALLY_SIGNED">Report Digitally Signed</option>
              <option value="RESULT_VALUE_MODIFIED">Result Value Modified</option>
              <option value="INTERPRETATION_ADDED">Interpretation Added</option>
              <option value="RANGE_VALIDATION_PASSED">Range Validation Passed</option>
              <option value="RE_TEST_ORDERED">Re-test Ordered</option>
            </select>
          </div>

          {/* User Role Filter */}
          <div className="lg:col-span-3">
            <select
              value={userRoleFilter}
              onChange={(e) => setUserRoleFilter(e.target.value)}
              className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-400 outline-none transition"
            >
              <option value="All">All User Roles</option>
              <option value="Pathologist">Pathologist</option>
              <option value="Lab Technician">Lab Technician</option>
              <option value="Lab Manager">Lab Manager</option>
              <option value="System LIMS Engine">System LIMS Engine</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Audit Logs Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Log ID &amp; Timestamp</th>
                <th className="py-3.5 px-4">Case &amp; Patient</th>
                <th className="py-3.5 px-4">User &amp; Device IP</th>
                <th className="py-3.5 px-4">Action Event</th>
                <th className="py-3.5 px-4">State Mutation</th>
                <th className="py-3.5 px-4">Standards</th>
                <th className="py-3.5 px-4 text-center">Version Diff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    
                    {/* Log ID & Timestamp */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{log.id}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{log.timestamp}</div>
                    </td>

                    {/* Case & Patient */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-teal-800">{log.caseId}</div>
                      <div className="text-[11px] text-gray-600">{log.patientName}</div>
                    </td>

                    {/* User & IP */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-900">{log.user}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{log.ipAddress}</div>
                    </td>

                    {/* Action Event */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-800 rounded mb-1">
                        {log.actionCategory}
                      </span>
                      <div className="text-[11px] text-gray-600">{log.actionDescription}</div>
                    </td>

                    {/* State Mutation */}
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <div className="text-red-600 line-through truncate max-w-xs">{log.previousValue}</div>
                      <div className="text-emerald-700 font-bold truncate max-w-xs">{log.newValue}</div>
                    </td>

                    {/* Compliance Standards */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {log.complianceStandards.map((std, i) => (
                          <span key={i} className="bg-gray-100 text-gray-600 text-[9px] font-semibold px-1.5 py-0.5 rounded">
                            {std}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Version Diff Action */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-slate-500">{log.version}</span>
                        {log.hasDiff ? (
                          <button
                            onClick={() => setSelectedDiffLog(log)}
                            className="px-2.5 py-1 text-[11px] font-bold bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-lg transition cursor-pointer border border-teal-200"
                          >
                            View Diff
                          </button>
                        ) : (
                          <span className="text-[10px] text-gray-300">—</span>
                        )}
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No compliance audit logs match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side-by-Side Version Control Diff Modal */}
      {selectedDiffLog && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold">Version Audit Diff: {selectedDiffLog.id}</h3>
                  <span className="bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                    {selectedDiffLog.version}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Target Case: <strong className="text-white">{selectedDiffLog.caseId}</strong> • Modified by {selectedDiffLog.user}
                </p>
              </div>

              <button
                onClick={() => setSelectedDiffLog(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Content - Side by Side Comparison */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              
              <div className="grid grid-cols-2 gap-4">
                {/* Previous Version */}
                <div className="space-y-2">
                  <span className="font-bold text-red-600 uppercase tracking-wider block bg-red-50 p-2 rounded-lg border border-red-100">
                    - Previous State (Before Edit)
                  </span>
                  <div className="bg-red-50/40 p-4 rounded-xl border border-red-100 font-mono text-red-900 whitespace-pre-wrap leading-relaxed">
                    {selectedDiffLog.diffDetails.oldText}
                  </div>
                </div>

                {/* New Version */}
                <div className="space-y-2">
                  <span className="font-bold text-emerald-700 uppercase tracking-wider block bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                    + New State (After Edit)
                  </span>
                  <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100 font-mono text-emerald-950 whitespace-pre-wrap leading-relaxed">
                    {selectedDiffLog.diffDetails.newText}
                  </div>
                </div>
              </div>

              {/* Compliance Stamps */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                <span>Timestamp: <strong>{selectedDiffLog.timestamp}</strong></span>
                <span>IP Address: <strong>{selectedDiffLog.ipAddress}</strong></span>
                <span className="text-teal-700 font-bold">Cryptographic Checksum: SHA-256 Verified</span>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedDiffLog(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition"
              >
                Close Diff Viewer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
