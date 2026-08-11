import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useLims } from '../../../context/LimsContext'

export default function PricingBilling() {
  const { testCatalog } = useLims()

  // Active Sub-Tab: 'analytics' | 'pricing-matrix' | 'b2b-billing' | 'gateways' | 'policies'
  const [activeSubTab, setActiveSubTab] = useState('analytics')

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState('')
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 4000)
  }

  // 1. REVENUE METRICS DATA
  const [revenueSummary, setRevenueSummary] = useState({
    grossRevenue: '₹0.00',
    netRevenue: '₹0.00',
    receivables: '₹0.00',
    refunds: '₹0.00',
    growth: '0% vs last month'
  })

  const [branchRevenue, setBranchRevenue] = useState([])

  const topTests = []

  // 2. GLOBAL PRICING MATRIX DATA
  const [pricingMatrix, setPricingMatrix] = useState([])

  const fetchCalledRef = useRef(false)

  useEffect(() => {
    if (fetchCalledRef.current) return
    fetchCalledRef.current = true

    const fetchPricingData = async () => {
      try {
        const { data } = await axios.get('/api/superadmin/pricing-billing')
        if (data.success && data.data) {
          if (data.data.revenueSummary) setRevenueSummary(data.data.revenueSummary)
          if (data.data.branchRevenue) setBranchRevenue(data.data.branchRevenue)
          if (data.data.tests && data.data.tests.length > 0) setPricingMatrix(data.data.tests)
        }
      } catch (error) {
        console.error('Error fetching pricing data:', error)
      }
    }
    fetchPricingData()
  }, [])

  const [editingPriceItem, setEditingPriceItem] = useState(null)

  // 3. B2B & CLIENT HOSPITAL BILLING DATA
  const [b2bClients, setB2bClients] = useState([])

  const [invoices, setInvoices] = useState([])

  const [newInvoiceModal, setNewInvoiceModal] = useState(false)
  const [newInvoiceForm, setNewInvoiceForm] = useState({ client: '', amount: '', period: '' })

  // 4. TAXES & FINANCIAL POLICIES STATE
  const [financialPolicies, setFinancialPolicies] = useState({
    gstRate: 5,
    vatRate: 0,
    enableTaxExemption: true,
    fullRefundHours: 24,
    partialRefundPercent: 50,
    cancellationFee: 5,
    baseHomeCollectionFee: 10,
    perMileFee: 1.5,
    freeHomeCollectionMinAmount: 100
  })

  // 5. PAYMENT GATEWAYS & CURRENCY STATE
  const [gateways, setGateways] = useState([])

  const [paymentMethods, setPaymentMethods] = useState({
    creditDebitCard: true,
    mobileWallets: true,
    insuranceBilling: true,
    cashOnCollection: true,
    bankTransfer: true
  })

  const [currencyProfile, setCurrencyProfile] = useState({
    baseCurrency: 'INR (₹)',
    exchangeUSD: 0.012,
    exchangeEUR: 0.011,
    exchangeGBP: 0.0093,
    autoRateUpdate: true
  })

  // HANDLERS
  const handleSavePriceItem = (e) => {
    e.preventDefault()
    if (!editingPriceItem) return
    setPricingMatrix((prev) =>
      prev.map((item) => (item.id === editingPriceItem.id ? editingPriceItem : item))
    )
    showToast(`Pricing updated for ${editingPriceItem.code}: Base ₹${editingPriceItem.basePrice}`)
    setEditingPriceItem(null)
  }

  const handleSettleInvoice = (invId) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invId ? { ...inv, status: 'Paid' } : inv))
    )
    showToast(`Invoice ${invId} marked as Paid & Balance Settled.`)
  }

  const handleCreateInvoice = (e) => {
    e.preventDefault()
    const newInv = {
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      client: newInvoiceForm.client,
      period: newInvoiceForm.period,
      amount: `₹${parseFloat(newInvoiceForm.amount || '0').toFixed(2)}`,
      dueDate: new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10),
      status: 'Pending'
    }
    setInvoices((prev) => [newInv, ...prev])
    setNewInvoiceModal(false)
    showToast(`New B2B Invoice ${newInv.id} issued for ${newInv.client}!`)
  }

  const handleSavePolicies = (e) => {
    e.preventDefault()
    showToast('Taxes & Financial Policies updated successfully!')
  }

  const handleToggleGateway = (id) => {
    setGateways((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: g.status === 'Connected' ? 'Inactive' : 'Connected' } : g))
    )
    showToast('Merchant Gateway status updated!')
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 font-sans text-left relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-lg flex items-center justify-between animate-fade-in transition-all">
          <div className="flex items-center gap-3 text-xs font-bold">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-white/80 hover:text-white text-xs font-bold cursor-pointer">✕</button>
        </div>
      )}

      {/* Main Module Header Banner */}
      <div className="border-b border-gray-100 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Pricing &amp; Financial Management</h2>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-blue-100">
              Executive Financial Engine
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Configure diagnostic test tariffs, B2B hospital billing slabs, tax policies, merchant payment gateways, and revenue metrics.
          </p>
        </div>

        {/* Global Action */}
        <button
          onClick={() => setActiveSubTab('policies')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          Configure Policies
        </button>
      </div>

      {/* SUB-TABS NAVIGATION BAR */}
      <div className="flex items-center gap-2 border-b border-gray-100 overflow-x-auto pb-1 text-xs font-bold text-gray-500">
        <button
          onClick={() => setActiveSubTab('analytics')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'analytics' ? 'bg-blue-50 text-blue-700 font-black shadow-2xs' : 'hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          📊 Revenue &amp; Analytics
        </button>
        <button
          onClick={() => setActiveSubTab('pricing-matrix')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'pricing-matrix' ? 'bg-blue-50 text-blue-700 font-black shadow-2xs' : 'hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          💲 Test Pricing Matrix
        </button>
        <button
          onClick={() => setActiveSubTab('b2b-billing')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'b2b-billing' ? 'bg-blue-50 text-blue-700 font-black shadow-2xs' : 'hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          🏥 B2B Hospital Billing
        </button>
        <button
          onClick={() => setActiveSubTab('gateways')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'gateways' ? 'bg-blue-50 text-blue-700 font-black shadow-2xs' : 'hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          💳 Payment Gateways
        </button>
        <button
          onClick={() => setActiveSubTab('policies')}
          className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'policies' ? 'bg-blue-50 text-blue-700 font-black shadow-2xs' : 'hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          ⚙️ Taxes &amp; Financial Policies
        </button>
      </div>

      {/* ========================================================= */}
      {/* 5. REVENUE & FINANCIAL ANALYTICS TAB                      */}
      {/* ========================================================= */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-6 animate-fade-in">
          {/* Revenue KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl shadow-sm space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200">Gross Revenue</span>
              <p className="text-2xl font-black">{revenueSummary.grossRevenue}</p>
              <div className="flex justify-between items-center text-[10px] text-blue-200 font-semibold pt-1 border-t border-white/10">
                <span>{revenueSummary.growth}</span>
                <span className="bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded">Target Met</span>
              </div>
            </div>

            <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Net Revenue (After Taxes/Discounts)</span>
              <p className="text-2xl font-black text-gray-900">{revenueSummary.netRevenue}</p>
              <p className="text-[10px] text-gray-500 font-semibold pt-1 border-t border-gray-100">Margin Efficiency: 87.8%</p>
            </div>

            <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600">Pending Receivables (B2B)</span>
              <p className="text-2xl font-black text-amber-600">{revenueSummary.receivables}</p>
              <p className="text-[10px] text-amber-700 font-semibold pt-1 border-t border-amber-50">3 Outstanding Invoices</p>
            </div>

            <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Total Refunds Issued</span>
              <p className="text-2xl font-black text-rose-600">{revenueSummary.refunds}</p>
              <p className="text-[10px] text-gray-500 font-semibold pt-1 border-t border-gray-100">0.58% Cancellation Rate</p>
            </div>
          </div>

          {/* Branch Revenue Comparison & Top Tests */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Branch Revenue Breakdown */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-2xs space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Branch Revenue Comparison</h3>
                <span className="text-[10px] font-bold text-gray-400">Current Month</span>
              </div>
              <div className="space-y-3">
                {branchRevenue.map((b, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-gray-900">{b.name}</span>
                      <span className="text-blue-700">{b.revenue} ({b.percentage})</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all"
                        style={{ width: b.percentage }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
                      <span>Invoices Processed: {b.invoices}</span>
                      <span>Gross Margin: {b.margin}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Revenue Generating Tests */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-2xs space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Top Revenue-Generating Tests &amp; Packages</h3>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">High Margin</span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {topTests.map((t, idx) => (
                  <div key={idx} className="p-3 bg-gray-50/50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-blue-600 text-[10px]">{t.code}</span>
                        <span className="font-bold text-gray-900">{t.name}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-semibold">Volume: {t.volume} Orders • Avg Price: {t.avgPrice}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-gray-900">{t.totalRevenue}</p>
                      <span className="text-[10px] text-emerald-600 font-bold">Margin: {t.margin}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. GLOBAL TEST PRICING MATRIX TAB                        */}
      {/* ========================================================= */}
      {activeSubTab === 'pricing-matrix' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-black text-gray-900 tracking-tight">Master Pricing Matrix &amp; Package Discounts</h3>
              <p className="text-xs text-gray-500 font-medium">Configure base tariffs, city-tier multipliers, and package bundle discount percentages.</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-extrabold uppercase tracking-wider text-[10px] border-b border-gray-100">
                  <th className="py-3.5 px-4">Code</th>
                  <th className="py-3.5 px-4">Test / Package Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Base Standard Price</th>
                  <th className="py-3.5 px-4">City Tier Multiplier</th>
                  <th className="py-3.5 px-4">Suburban Tier Price</th>
                  <th className="py-3.5 px-4">Package Discount</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {pricingMatrix.map((item) => {
                  const bPrice = typeof item.basePrice === 'number' ? item.basePrice : parseFloat(item.basePrice) || 50
                  const mult = typeof item.cityMultiplier === 'number' ? item.cityMultiplier : parseFloat(item.cityMultiplier) || 1.1

                  return (
                    <tr key={item.id || item._id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-blue-700">{item.code}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{item.name}</span>
                          {item.isPackage && (
                            <span className="bg-indigo-100 text-indigo-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Bundle</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{item.category}</td>
                      <td className="py-3 px-4 font-extrabold text-gray-900">₹{bPrice.toFixed(2)}</td>
                      <td className="py-3 px-4 text-gray-700 font-bold">{mult}x (+{((mult - 1)*100).toFixed(0)}%)</td>
                      <td className="py-3 px-4 text-gray-700 font-semibold">₹{(bPrice * mult).toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 text-[10px]">
                          {item.discount || '0%'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setEditingPriceItem({ ...item, basePrice: bPrice, cityMultiplier: mult })}
                          className="text-[10px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                        >
                          Adjust Pricing
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Edit Pricing Modal */}
          {editingPriceItem && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col text-left font-sans">
                <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-extrabold text-blue-300 uppercase">Tariff Adjustment</span>
                    <h3 className="text-base font-black tracking-tight mt-0.5">{editingPriceItem.name} ({editingPriceItem.code})</h3>
                  </div>
                  <button onClick={() => setEditingPriceItem(null)} className="text-white text-sm font-bold">✕</button>
                </div>
                <form onSubmit={handleSavePriceItem} className="p-6 space-y-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Standard Base Price (₹ INR)</label>
                    <input
                      type="number"
                      step="any"
                      value={editingPriceItem.basePrice}
                      onChange={(e) => setEditingPriceItem({ ...editingPriceItem, basePrice: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:bg-white focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Metro / City Tier Multiplier</label>
                    <input
                      type="number"
                      step="0.05"
                      value={editingPriceItem.cityMultiplier}
                      onChange={(e) => setEditingPriceItem({ ...editingPriceItem, cityMultiplier: parseFloat(e.target.value) || 1.0 })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:bg-white focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Package Bundle Discount</label>
                    <input
                      type="text"
                      value={editingPriceItem.discount}
                      onChange={(e) => setEditingPriceItem({ ...editingPriceItem, discount: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:bg-white focus:border-blue-500"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                    <button type="button" onClick={() => setEditingPriceItem(null)} className="px-4 py-2 font-bold text-gray-600 bg-gray-100 rounded-xl">Cancel</button>
                    <button type="submit" className="px-5 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs">Save Tariff</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. B2B & CLIENT HOSPITAL BILLING MANAGEMENT TAB           */}
      {/* ========================================================= */}
      {activeSubTab === 'b2b-billing' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-black text-gray-900 tracking-tight">Partner Healthcare Accounts &amp; B2B Tariffs</h3>
              <p className="text-xs text-gray-500 font-medium">Manage rate cards, credit limit controls, and monthly sample processing settlements.</p>
            </div>
            <button
              onClick={() => setNewInvoiceModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              + Issue B2B Invoice
            </button>
          </div>

          {/* Partner Accounts Slabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {b2bClients.map((client) => {
              const isOverdue = client.status.includes('Paused') || client.currentBalance >= client.creditLimit
              return (
                <div key={client.id} className="p-5 bg-gray-50/50 border border-gray-100 rounded-2xl space-y-3 relative hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-blue-600">{client.code}</span>
                      <h4 className="font-extrabold text-gray-900 text-sm">{client.name}</h4>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isOverdue ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {client.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-[10px] text-gray-400 font-semibold block">Custom Tariff</span>
                      <span className="font-bold text-blue-700">{client.tariffDiscount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-semibold block">Credit Limit</span>
                      <span className="font-bold text-gray-800">₹{client.creditLimit.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-semibold block">Current Balance</span>
                      <span className="font-extrabold text-gray-900">₹{client.currentBalance.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-semibold block">Invoice Period</span>
                      <span className="font-semibold text-gray-700">{client.invoicePeriod}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Outstanding B2B Invoices Table */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">Periodic B2B Invoices &amp; Settlements</h4>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 font-extrabold uppercase tracking-wider text-[10px] border-b border-gray-100">
                    <th className="py-3 px-4">Invoice ID</th>
                    <th className="py-3 px-4">Client Partner</th>
                    <th className="py-3 px-4">Billing Period</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Payment Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-blue-50/20">
                      <td className="py-3 px-4 font-mono font-bold text-blue-700">{inv.id}</td>
                      <td className="py-3 px-4 font-bold text-gray-900">{inv.client}</td>
                      <td className="py-3 px-4">{inv.period}</td>
                      <td className="py-3 px-4 font-extrabold text-gray-900">{inv.amount}</td>
                      <td className="py-3 px-4 font-semibold text-gray-600">{inv.dueDate}</td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                          inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                          inv.status === 'Overdue' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {inv.status !== 'Paid' && (
                          <button
                            onClick={() => handleSettleInvoice(inv.id)}
                            className="text-[10px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 cursor-pointer"
                          >
                            Record Settlement
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* New Invoice Modal */}
          {newInvoiceModal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col text-left font-sans">
                <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                  <h3 className="text-base font-black">Issue Periodic B2B Invoice</h3>
                  <button onClick={() => setNewInvoiceModal(false)} className="text-white">✕</button>
                </div>
                <form onSubmit={handleCreateInvoice} className="p-6 space-y-4 text-xs">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Partner Client</label>
                    <select
                      value={newInvoiceForm.client}
                      onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, client: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                    >
                      {b2bClients.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Billing Period</label>
                    <input
                      type="text"
                      value={newInvoiceForm.period}
                      onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, period: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Total Invoice Amount (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 5400"
                      value={newInvoiceForm.amount}
                      onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, amount: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-3">
                    <button type="button" onClick={() => setNewInvoiceModal(false)} className="px-4 py-2 font-bold text-gray-600 bg-gray-100 rounded-xl">Cancel</button>
                    <button type="submit" className="px-5 py-2 font-bold text-white bg-blue-600 rounded-xl">Issue Invoice</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. PAYMENT GATEWAYS & MERCHANT PROFILES TAB              */}
      {/* ========================================================= */}
      {activeSubTab === 'gateways' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="text-sm font-black text-gray-900 tracking-tight">Merchant Gateway Integration &amp; Currency Profiles</h3>
            <p className="text-xs text-gray-500 font-medium">Manage payment APIs, enabled checkout methods, and primary currency settings.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Merchant Gateways */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-2xs space-y-4">
              <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">Integrated Merchant Gateways</h4>
              <div className="space-y-3">
                {gateways.map((g) => (
                  <div key={g.id} className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-gray-900 text-sm">{g.name}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          g.status === 'Connected' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {g.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-semibold mt-1">API Key: {g.apiKey} ({g.environment})</p>
                    </div>
                    <button
                      onClick={() => handleToggleGateway(g.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                        g.status === 'Connected' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {g.status === 'Connected' ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Accepted Payment Methods & Currency Profile */}
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-2xs space-y-4">
                <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">Globally Accepted Payment Methods</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentMethods.creditDebitCard}
                      onChange={() => setPaymentMethods({ ...paymentMethods, creditDebitCard: !paymentMethods.creditDebitCard })}
                      className="rounded text-blue-600"
                    />
                    <span className="font-bold text-gray-800">Credit / Debit Cards</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentMethods.mobileWallets}
                      onChange={() => setPaymentMethods({ ...paymentMethods, mobileWallets: !paymentMethods.mobileWallets })}
                      className="rounded text-blue-600"
                    />
                    <span className="font-bold text-gray-800">Mobile Wallets</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentMethods.insuranceBilling}
                      onChange={() => setPaymentMethods({ ...paymentMethods, insuranceBilling: !paymentMethods.insuranceBilling })}
                      className="rounded text-blue-600"
                    />
                    <span className="font-bold text-gray-800">Insurance Direct</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentMethods.cashOnCollection}
                      onChange={() => setPaymentMethods({ ...paymentMethods, cashOnCollection: !paymentMethods.cashOnCollection })}
                      className="rounded text-blue-600"
                    />
                    <span className="font-bold text-gray-800">Cash on Collection</span>
                  </label>
                </div>
              </div>

              {/* Currency Settings */}
              <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-sm space-y-3">
                <h4 className="text-xs font-black uppercase text-blue-300 tracking-wider">Primary System Base Currency</h4>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span>Base Currency Unit</span>
                  <span className="font-black text-emerald-400 bg-white/10 px-3 py-1 rounded-lg">{currencyProfile.baseCurrency}</span>
                </div>
                <div className="text-[11px] text-gray-300 pt-2 border-t border-white/10 space-y-1">
                  <p>Multi-Currency Rates: EUR (€): {currencyProfile.exchangeEUR} | INR (₹): {currencyProfile.exchangeINR} | GBP (£): {currencyProfile.exchangeGBP}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. TAXES & FINANCIAL POLICIES ("Configure Policies") TAB  */}
      {/* ========================================================= */}
      {activeSubTab === 'policies' && (
        <form onSubmit={handleSavePolicies} className="space-y-6 animate-fade-in text-xs">
          <div>
            <h3 className="text-sm font-black text-gray-900 tracking-tight">Taxes, Refund &amp; Collection Policy Settings</h3>
            <p className="text-xs text-gray-500 font-medium">Set national sales taxes, order cancellation rules, and home sample collection fee structures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tax Rules */}
            <div className="p-6 bg-gray-50/60 border border-gray-100 rounded-2xl space-y-4">
              <h4 className="text-xs font-black uppercase text-gray-900">1. Tax Rules &amp; GST/VAT Rates</h4>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Standard Diagnostic GST Rate (%)</label>
                <input
                  type="number"
                  value={financialPolicies.gstRate}
                  onChange={(e) => setFinancialPolicies({ ...financialPolicies, gstRate: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-bold outline-none"
                />
              </div>
              <label className="flex items-center gap-2 pt-2 cursor-pointer font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={financialPolicies.enableTaxExemption}
                  onChange={() => setFinancialPolicies({ ...financialPolicies, enableTaxExemption: !financialPolicies.enableTaxExemption })}
                  className="rounded text-blue-600"
                />
                Apply Tax Exemption to Essential Preventative Tests
              </label>
            </div>

            {/* Refund & Cancellation Rules */}
            <div className="p-6 bg-gray-50/60 border border-gray-100 rounded-2xl space-y-4">
              <h4 className="text-xs font-black uppercase text-gray-900">2. Refund &amp; Cancellation Policies</h4>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Refund Window (Hours Before Sample Draw)</label>
                <input
                  type="number"
                  value={financialPolicies.fullRefundHours}
                  onChange={(e) => setFinancialPolicies({ ...financialPolicies, fullRefundHours: parseInt(e.target.value) || 0 })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-bold outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Partial Refund Percentage (%)</label>
                <input
                  type="number"
                  value={financialPolicies.partialRefundPercent}
                  onChange={(e) => setFinancialPolicies({ ...financialPolicies, partialRefundPercent: parseInt(e.target.value) || 0 })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-bold outline-none"
                />
              </div>
            </div>

            {/* Home Sample Collection Fees */}
            <div className="p-6 bg-gray-50/60 border border-gray-100 rounded-2xl space-y-4">
              <h4 className="text-xs font-black uppercase text-gray-900">3. Home Sample Collection Fees</h4>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Base Visit Fee (₹ INR)</label>
                <input
                  type="number"
                  value={financialPolicies.baseHomeCollectionFee}
                  onChange={(e) => setFinancialPolicies({ ...financialPolicies, baseHomeCollectionFee: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-bold outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Free Home Collection Minimum Order (₹)</label>
                <input
                  type="number"
                  value={financialPolicies.freeHomeCollectionMinAmount}
                  onChange={(e) => setFinancialPolicies({ ...financialPolicies, freeHomeCollectionMinAmount: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-bold outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Save Policy Configurations
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
