import React from 'react'

export default function FlaggedResultsReview({ flaggedNotes }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 font-sans">
      <h3 className="text-xs font-bold text-slate-800 mb-2 tracking-tight">
        Flagged Results for Review
      </h3>
      <p className="text-[10px] text-slate-600 leading-relaxed">
        {flaggedNotes || "Notes to see exchanged to the notes to Pathologist."}
      </p>
    </div>
  )
}
