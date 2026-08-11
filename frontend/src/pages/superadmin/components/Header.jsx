import React, { useState } from 'react'
import HeaderUserDropdown from '../../../components/HeaderUserDropdown'

// Header SVG Icons
const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-600">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-600">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

export default function Header({ onLogout, onBack, onOpenProfile }) {
  const [showMessages, setShowMessages] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  // Messages list state
  const [messages, setMessages] = useState([])

  // Notifications list state
  const [notifications, setNotifications] = useState([])

  const [newMessageText, setNewMessageText] = useState('')

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const markAllMessagesRead = () => {
    setMessages((prev) => prev.map((m) => ({ ...m, unread: false })))
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessageText.trim()) return
    const msgObj = {
      id: Date.now(),
      sender: 'Super Admin (You)',
      role: 'Root Admin',
      text: newMessageText,
      time: 'Just now',
      unread: false
    }
    setMessages((prev) => [msgObj, ...prev])
    setNewMessageText('')
  }

  const unreadMessagesCount = messages.filter((m) => m.unread).length
  const unreadNotificationsCount = notifications.filter((n) => n.unread).length

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-6 border-b border-gray-100 font-sans relative">
      {/* Title block */}
      <div className="flex items-center gap-3 text-left">
        {onBack && (
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all cursor-pointer border border-gray-200/70 shadow-2xs group shrink-0"
            title="Back to Roles / Landing"
            aria-label="Back to Roles or Landing Page"
          >
            <div className="group-hover:-translate-x-0.5 transition-transform">
              <BackArrowIcon />
            </div>
          </button>
        )}
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">Welcome, Super Admin</h1>
          <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">
            Laboratory Information Management System (LIMS)
          </p>
        </div>
      </div>

      {/* Control Actions toolbar */}
      <div className="flex items-center flex-wrap gap-4 w-full md:w-auto relative">
        {/* Global Search Bar */}
        <div className="relative w-full md:w-60">
          <input 
            type="text" 
            placeholder="Global Search" 
            className="w-full bg-gray-50/50 border border-gray-100 rounded-xl pl-9.5 pr-4 py-2 text-xs font-medium outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-700 placeholder:text-gray-400"
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
        </div>

        {/* Action buttons (Messages & Notifications) */}
        <div className="flex items-center gap-3 relative">
          {/* Chat bubble button */}
          <button 
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all cursor-pointer border relative ${
              showMessages ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50/50 hover:bg-gray-100/50 text-gray-600 border-gray-100'
            }`}
            onClick={() => {
              setShowMessages(!showMessages)
              setShowNotifications(false)
            }}
            title="Admin Messages"
          >
            <ChatIcon />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          {/* Bell notification button */}
          <button 
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all cursor-pointer relative border ${
              showNotifications ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50/50 hover:bg-gray-100/50 text-gray-600 border-gray-100'
            }`}
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowMessages(false)
            }}
            title="System Notifications"
          >
            <BellIcon />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-white animate-pulse" />
            )}
          </button>
        </div>

        {/* Profile drop and Settings / Logout button */}
        <div className="flex items-center gap-2 border-l border-gray-100 pl-4">
          <HeaderUserDropdown />
        </div>
      </div>

      {/* MESSAGES DROPDOWN MODAL */}
      {showMessages && (
        <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 z-50 text-left animate-fade-in space-y-3 font-sans">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-gray-900">Messages Inbox</span>
              {unreadMessagesCount > 0 && (
                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
                  {unreadMessagesCount} Unread
                </span>
              )}
            </div>
            <button
              onClick={markAllMessagesRead}
              className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer"
            >
              Mark all read
            </button>
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`p-3 rounded-2xl border transition-all text-xs ${
                  m.unread ? 'bg-blue-50/40 border-blue-100' : 'bg-gray-50/50 border-gray-100'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <span className="font-bold text-gray-900">{m.sender}</span>
                    <span className="text-[10px] text-gray-400 font-semibold ml-2">({m.role})</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{m.time}</span>
                </div>
                <p className="text-gray-600 font-medium text-[11px] leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>

          {/* Send Quick Reply */}
          <form onSubmit={handleSendMessage} className="pt-2 border-t border-gray-100 flex gap-2">
            <input
              type="text"
              placeholder="Send quick broadcast message..."
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium focus:bg-white focus:border-blue-500 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* NOTIFICATIONS DROPDOWN MODAL */}
      {showNotifications && (
        <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 z-50 text-left animate-fade-in space-y-3 font-sans">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-gray-900">Notifications Feed</span>
              {unreadNotificationsCount > 0 && (
                <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-100">
                  {unreadNotificationsCount} New
                </span>
              )}
            </div>
            <button
              onClick={markAllNotificationsRead}
              className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer"
            >
              Clear badges
            </button>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-2xl border transition-all text-xs ${
                  n.type === 'urgent'
                    ? 'bg-amber-50/40 border-amber-100'
                    : n.unread
                    ? 'bg-blue-50/40 border-blue-100'
                    : 'bg-gray-50/50 border-gray-100'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-gray-900">{n.title}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{n.time}</span>
                </div>
                <p className="text-gray-600 font-medium text-[11px] leading-relaxed">{n.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 text-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              System Audit Engine Synchronized
            </span>
          </div>
        </div>
      )}
    </header>
  )
}
