import React, { useState, useMemo } from 'react';
import { useLims } from '../../../context/LimsContext';

// Mock initial incoming lab test validation queue
const initialValidationData = [
  {
    id: 'VAL-901',
    sampleId: 'SMP-2026-8801',
    patientName: 'David Miller',
    age: 52,
    gender: 'Male',
    equipment: 'Sysmex XN-1000 Hematology',
    qcStatus: 'QC PASS',
    testName: 'Hemoglobin (Hb)',
    measuredValue: 6.8,
    unit: 'g/dL',
    refRange: '13.5 - 17.5',
    minRef: 13.5,
    maxRef: 17.5,
    flag: 'CRITICAL LOW',
    category: 'Hematology',
    timestamp: '2026-08-06 10:12 AM',
    validated: false,
  },
  {
    id: 'VAL-902',
    sampleId: 'SMP-2026-8802',
    patientName: 'Sophia Rodriguez',
    age: 34,
    gender: 'Female',
    equipment: 'Roche Cobas c501 Chemistry',
    qcStatus: 'QC PASS',
    testName: 'Fasting Plasma Glucose',
    measuredValue: 245,
    unit: 'mg/dL',
    refRange: '70 - 99',
    minRef: 70,
    maxRef: 99,
    flag: 'CRITICAL HIGH',
    category: 'Biochemistry',
    timestamp: '2026-08-06 10:20 AM',
    validated: false,
  },
  {
    id: 'VAL-903',
    sampleId: 'SMP-2026-8803',
    patientName: 'Arthur Pendelton',
    age: 68,
    gender: 'Male',
    equipment: 'Abbott Alinity i Immunoassay',
    qcStatus: 'QC PASS',
    testName: 'Serum Creatinine',
    measuredValue: 2.4,
    unit: 'mg/dL',
    refRange: '0.7 - 1.3',
    minRef: 0.7,
    maxRef: 1.3,
    flag: 'HIGH',
    category: 'Biochemistry',
    timestamp: '2026-08-06 10:28 AM',
    validated: false,
  },
  {
    id: 'VAL-904',
    sampleId: 'SMP-2026-8804',
    patientName: 'Emily Watson',
    age: 28,
    gender: 'Female',
    equipment: 'Sysmex XN-1000 Hematology',
    qcStatus: 'QC PASS',
    testName: 'White Blood Cell (WBC)',
    measuredValue: 7.2,
    unit: 'x10^3/µL',
    refRange: '4.5 - 11.0',
    minRef: 4.5,
    maxRef: 11.0,
    flag: 'NORMAL',
    category: 'Hematology',
    timestamp: '2026-08-06 10:35 AM',
    validated: false,
  },
  {
    id: 'VAL-905',
    sampleId: 'SMP-2026-8805',
    patientName: 'Marcus Aurelius',
    age: 60,
    gender: 'Male',
    equipment: 'Roche Cobas c501 Chemistry',
    qcStatus: 'QC WARNING',
    testName: 'Serum Potassium (K+)',
    measuredValue: 6.2,
    unit: 'mmol/L',
    refRange: '3.5 - 5.1',
    minRef: 3.5,
    maxRef: 5.1,
    flag: 'CRITICAL HIGH',
    category: 'Biochemistry',
    timestamp: '2026-08-06 10:40 AM',
    validated: false,
  },
  {
    id: 'VAL-906',
    sampleId: 'SMP-2026-8806',
    patientName: 'Clara Oswald',
    age: 41,
    gender: 'Female',
    equipment: 'Stago STA Compact Max Coagulation',
    qcStatus: 'QC PASS',
    testName: 'Prothrombin Time (PT/INR)',
    measuredValue: 1.1,
    unit: 'INR',
    refRange: '0.8 - 1.2',
    minRef: 0.8,
    maxRef: 1.2,
    flag: 'NORMAL',
    category: 'Coagulation',
    timestamp: '2026-08-06 10:45 AM',
    validated: false,
  }
];

export default function TestResultsValidation() {
  const {
    testValidations: dbValidations,
    validateTestResultDB,
    batchValidateTestResultsDB,
    retestTestResultDB,
    createAuditLogDB,
  } = useLims();

  // Merge database validation items with initial data
  const data = useMemo(() => {
    if (dbValidations && dbValidations.length > 0) {
      const existingIds = new Set(dbValidations.map(v => v.id));
      const uniqueInitial = initialValidationData.filter(v => !existingIds.has(v.id));
      return [...dbValidations, ...uniqueInitial];
    }
    return initialValidationData;
  }, [dbValidations]);

  const [searchQuery, setSearchQuery] = useState('');
  const [flagFilter, setFlagFilter] = useState('All');
  const [equipmentFilter, setEquipmentFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);

  // Show Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle Checkbox for batch
  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAllNormals = () => {
    const normals = filteredData.filter(d => d.flag === 'NORMAL' && !d.validated).map(d => d.id);
    setSelectedIds(normals);
  };

  // Batch Validate Action connected to DB
  const handleBatchValidate = async () => {
    if (selectedIds.length === 0) return;
    if (batchValidateTestResultsDB) {
      await batchValidateTestResultsDB(selectedIds);
    }
    if (createAuditLogDB) {
      createAuditLogDB({
        caseId: selectedIds[0] || 'BATCH-VAL',
        actionCategory: 'RANGE_VALIDATION_PASSED',
        actionDescription: `Batch validated ${selectedIds.length} lab test result(s).`,
        previousValue: 'Status: Pending Validation',
        newValue: 'Status: Validated',
      });
    }
    showToast(`Successfully batch validated ${selectedIds.length} test result(s) in MongoDB.`);
    setSelectedIds([]);
  };

  // Single Item Validate connected to DB
  const handleValidateSingle = async (id) => {
    if (validateTestResultDB) {
      await validateTestResultDB(id);
    }
    if (createAuditLogDB) {
      createAuditLogDB({
        caseId: id,
        actionCategory: 'RANGE_VALIDATION_PASSED',
        actionDescription: `Validated test result ${id}`,
        previousValue: 'Status: Pending Validation',
        newValue: 'Status: Validated',
      });
    }
    showToast(`Validated test result ${id} in database.`);
    if (selectedDetailItem?.id === id) setSelectedDetailItem(null);
  };

  // Flag for Re-test / Calibration connected to DB
  const handleRetestSingle = async (id) => {
    if (retestTestResultDB) {
      await retestTestResultDB(id);
    }
    if (createAuditLogDB) {
      createAuditLogDB({
        caseId: id,
        actionCategory: 'RE_TEST_ORDERED',
        actionDescription: `Re-test ordered for sample ${id}.`,
        previousValue: 'QC: Passed',
        newValue: 'QC: Re-calibrate',
      });
    }
    showToast(`Re-test ordered for sample ${id} in database.`);
    if (selectedDetailItem?.id === id) setSelectedDetailItem(null);
  };

  // Filtered dataset
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const q = (searchQuery || '').toLowerCase();
      const matchesSearch =
        (item.sampleId || item.valId || '').toString().toLowerCase().includes(q) ||
        (item.patientName || '').toLowerCase().includes(q) ||
        (item.testName || '').toLowerCase().includes(q);

      const matchesFlag =
        flagFilter === 'All' ||
        (flagFilter === 'CRITICAL' && (item.flag === 'CRITICAL HIGH' || item.flag === 'CRITICAL LOW')) ||
        (flagFilter === 'ABNORMAL' && (item.flag === 'HIGH' || item.flag === 'LOW')) ||
        item.flag === flagFilter;

      const matchesEquipment =
        equipmentFilter === 'All' || item.equipment.includes(equipmentFilter);

      return matchesSearch && matchesFlag && matchesEquipment;
    });
  }, [data, searchQuery, flagFilter, equipmentFilter]);

  // Statistics
  const pendingCount = data.filter(d => !d.validated).length;
  const criticalCount = data.filter(d => !d.validated && (d.flag === 'CRITICAL HIGH' || d.flag === 'CRITICAL LOW')).length;
  const abnormalCount = data.filter(d => !d.validated && (d.flag === 'HIGH' || d.flag === 'LOW')).length;
  const validatedToday = data.filter(d => d.validated).length;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 space-y-6 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 animate-fade-in">
          <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Test Results Validation</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Automated reference range checks, abnormal result flagging, and laboratory equipment QC verification.
          </p>
        </div>

        {/* Stats Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-amber-50 border border-amber-100 px-3.5 py-1.5 rounded-xl flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-amber-800">Pending Validation:</span>
            <span className="text-xs font-bold text-amber-900 bg-white px-2 py-0.5 rounded-md border border-amber-200">{pendingCount}</span>
          </div>

          <div className="bg-red-50 border border-red-100 px-3.5 py-1.5 rounded-xl flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="text-xs font-semibold text-red-800">Critical Flags:</span>
            <span className="text-xs font-bold text-red-900 bg-white px-2 py-0.5 rounded-md border border-red-200">{criticalCount}</span>
          </div>

          <div className="bg-yellow-50 border border-yellow-100 px-3.5 py-1.5 rounded-xl flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
            <span className="text-xs font-semibold text-yellow-800">Abnormal Range:</span>
            <span className="text-xs font-bold text-yellow-900 bg-white px-2 py-0.5 rounded-md border border-yellow-200">{abnormalCount}</span>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-xl flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-semibold text-emerald-800">Validated Today:</span>
            <span className="text-xs font-bold text-emerald-900 bg-white px-2 py-0.5 rounded-md border border-emerald-200">{validatedToday}</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar & Batch Operations */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="lg:col-span-4 relative">
            <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search Sample ID, Patient, or Test..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-400 outline-none transition"
            />
          </div>

          {/* Flag Filter */}
          <div className="lg:col-span-3">
            <select
              value={flagFilter}
              onChange={(e) => setFlagFilter(e.target.value)}
              className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-400 outline-none transition"
            >
              <option value="All">All Flags & Range Status</option>
              <option value="CRITICAL">Critical Flags Only</option>
              <option value="ABNORMAL">Abnormal Range Only</option>
              <option value="NORMAL">Normal Range Only</option>
              <option value="RE-TEST ORDERED">Re-test Ordered</option>
            </select>
          </div>

          {/* Equipment Filter */}
          <div className="lg:col-span-3">
            <select
              value={equipmentFilter}
              onChange={(e) => setEquipmentFilter(e.target.value)}
              className="w-full py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-400 outline-none transition"
            >
              <option value="All">All Equipment</option>
              <option value="Sysmex">Sysmex XN-1000</option>
              <option value="Roche">Roche Cobas c501</option>
              <option value="Abbott">Abbott Alinity i</option>
              <option value="Stago">Stago STA Coagulation</option>
            </select>
          </div>

          {/* Batch Actions */}
          <div className="lg:col-span-2 flex items-center justify-end gap-2">
            <button
              onClick={selectAllNormals}
              className="text-[11px] font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 px-2.5 py-2 rounded-xl transition cursor-pointer"
            >
              Select Normals
            </button>
            <button
              disabled={selectedIds.length === 0}
              onClick={handleBatchValidate}
              className="text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 disabled:bg-gray-200 disabled:text-gray-400 px-3 py-2 rounded-xl transition cursor-pointer shadow-xs"
            >
              Batch Validate ({selectedIds.length})
            </button>
          </div>

        </div>
      </div>

      {/* Main Validation Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(filteredData.filter(d => !d.validated).map(d => d.id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                    checked={selectedIds.length > 0 && selectedIds.length === filteredData.filter(d => !d.validated).length}
                    className="rounded text-teal-600 focus:ring-teal-400"
                  />
                </th>
                <th className="py-3.5 px-4">Sample / Patient</th>
                <th className="py-3.5 px-4">Equipment & QC</th>
                <th className="py-3.5 px-4">Test Name</th>
                <th className="py-3.5 px-4">Measured Value</th>
                <th className="py-3.5 px-4">Ref. Range</th>
                <th className="py-3.5 px-4">Visual Range Status</th>
                <th className="py-3.5 px-4">Flag</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredData.length > 0 ? (
                filteredData.map((row) => {
                  const isCritical = row.flag === 'CRITICAL HIGH' || row.flag === 'CRITICAL LOW';
                  const isAbnormal = row.flag === 'HIGH' || row.flag === 'LOW';
                  const isChecked = selectedIds.includes(row.id);

                  // Calculate percentage for reference slider simulation
                  let rangePercent = 50;
                  if (row.measuredValue < row.minRef) {
                    rangePercent = Math.max(5, (row.measuredValue / row.minRef) * 30);
                  } else if (row.measuredValue > row.maxRef) {
                    rangePercent = Math.min(95, 70 + ((row.measuredValue - row.maxRef) / row.maxRef) * 25);
                  } else {
                    const span = row.maxRef - row.minRef;
                    rangePercent = 30 + ((row.measuredValue - row.minRef) / (span || 1)) * 40;
                  }

                  return (
                    <tr
                      key={row.id}
                      className={`transition-colors ${
                        row.validated
                          ? 'bg-emerald-50/20 text-gray-500'
                          : isCritical
                          ? 'bg-red-50/30 hover:bg-red-50/60'
                          : isAbnormal
                          ? 'bg-yellow-50/30 hover:bg-yellow-50/60'
                          : 'hover:bg-teal-50/20'
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="checkbox"
                          disabled={row.validated}
                          checked={isChecked}
                          onChange={() => toggleSelect(row.id)}
                          className="rounded text-teal-600 focus:ring-teal-400 disabled:opacity-40"
                        />
                      </td>

                      {/* Sample & Patient */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900">{row.sampleId}</div>
                        <div className="text-[11px] text-gray-500">{row.patientName} ({row.age}y, {row.gender})</div>
                      </td>

                      {/* Equipment & QC */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-gray-800 text-[11px]">{row.equipment}</div>
                        <span className={`inline-block px-1.5 py-0.5 text-[9px] font-extrabold rounded ${
                          row.qcStatus === 'QC PASS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {row.qcStatus}
                        </span>
                      </td>

                      {/* Test Name */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900">{row.testName}</div>
                        <div className="text-[10px] text-gray-400">{row.category}</div>
                      </td>

                      {/* Measured Value */}
                      <td className="py-3.5 px-4">
                        <span className={`text-sm font-black ${
                          isCritical ? 'text-red-700' : isAbnormal ? 'text-amber-700' : 'text-gray-900'
                        }`}>
                          {row.measuredValue}
                        </span>
                        <span className="text-[10px] text-gray-400 ml-1 font-semibold">{row.unit}</span>
                      </td>

                      {/* Ref Range */}
                      <td className="py-3.5 px-4 text-gray-600 font-mono text-[11px]">
                        {row.refRange} {row.unit}
                      </td>

                      {/* Visual Range Indicator Bar */}
                      <td className="py-3.5 px-4 w-44">
                        <div className="space-y-1">
                          <div className="h-2 w-full bg-gray-200 rounded-full relative overflow-hidden flex">
                            <div className="w-[30%] bg-blue-200"></div>
                            <div className="w-[40%] bg-green-200"></div>
                            <div className="w-[30%] bg-red-200"></div>
                            {/* Value pointer */}
                            <div
                              style={{ left: `${rangePercent}%` }}
                              className={`absolute top-0 bottom-0 w-1.5 rounded-full shadow-xs -translate-x-1/2 ${
                                isCritical ? 'bg-red-600 animate-pulse' : isAbnormal ? 'bg-amber-500' : 'bg-green-700'
                              }`}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[9px] text-gray-400 font-mono">
                            <span>Low</span>
                            <span>Normal</span>
                            <span>High</span>
                          </div>
                        </div>
                      </td>

                      {/* Flag Badge */}
                      <td className="py-3.5 px-4">
                        {row.flag === 'CRITICAL HIGH' || row.flag === 'CRITICAL LOW' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-600 text-white shadow-xs animate-pulse">
                            ⚠️ {row.flag}
                          </span>
                        ) : row.flag === 'HIGH' || row.flag === 'LOW' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            {row.flag}
                          </span>
                        ) : row.flag === 'NORMAL' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-800">
                            ✓ NORMAL
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-700">
                            {row.flag}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-center">
                        {row.validated ? (
                          <span className="text-[11px] font-bold text-emerald-600 flex items-center justify-center gap-1">
                            ✓ Validated
                          </span>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleValidateSingle(row.id)}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white transition cursor-pointer shadow-xs"
                            >
                              Validate
                            </button>
                            <button
                              onClick={() => handleRetestSingle(row.id)}
                              title="Flag for Re-test"
                              className="px-2 py-1 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition cursor-pointer"
                            >
                              Re-test
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400">
                    No results match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
