import { useState } from 'react'
import { Send } from 'lucide-react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { useApp } from '../../context/AppContext'
import { adminChatInbox, chatMessages } from '../../lib/mockData'

export default function AdminChatPage() {
  const { lang, dir } = useApp()
  const [activeConv, setActiveConv] = useState(adminChatInbox[0].id)
  const [messages, setMessages] = useState(chatMessages)
  const [input, setInput] = useState('')

  const conv = adminChatInbox.find(c => c.id === activeConv)

  function send(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'support', text: input, time: 'Now', read: true }])
    setInput('')
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto h-[calc(100vh-120px)] flex gap-4">
        {/* Inbox */}
        <div className="w-64 shrink-0 bg-card border border-border rounded-2xl overflow-hidden flex flex-col hidden md:flex">
          <div className="px-4 py-3 border-b border-border">
            <p className="font-semibold text-sm">{lang === 'ar' ? 'المحادثات' : 'Conversations'}</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {adminChatInbox.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveConv(c.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-start transition-colors tap-highlight ${activeConv === c.id ? 'bg-secondary' : 'hover:bg-muted'}`}
              >
                <div className={`w-10 h-10 rounded-full bg-brand text-[#0E0E11] flex items-center justify-center font-bold text-sm shrink-0 relative`}>
                  {c.avatar}
                  {c.online && <span className="absolute bottom-0 end-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-xs">{c.name}</p>
                    <p className="text-[10px] text-muted-foreground">{c.time}</p>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-brand text-[#0E0E11] text-[10px] font-bold flex items-center justify-center shrink-0">{c.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 bg-card border border-border rounded-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <div className="w-9 h-9 rounded-full bg-brand text-[#0E0E11] flex items-center justify-center font-bold text-sm">
              {conv?.avatar}
            </div>
            <div>
              <p className="font-semibold text-sm">{conv?.name}</p>
              <p className="text-xs text-green-500">{conv?.online ? (lang === 'ar' ? 'متصل' : 'Online') : (lang === 'ar' ? 'غير متصل' : 'Offline')}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'support' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${msg.sender === 'support' ? 'bg-brand text-[#0E0E11] rounded-br-sm' : 'bg-muted rounded-bl-sm'}`}>
                  {msg.text}
                  <p className={`text-[10px] mt-1 opacity-70`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={send} className="flex items-center gap-2 p-3 border-t border-border">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={lang === 'ar' ? 'اكتب ردًا...' : 'Type a reply...'}
              className="flex-1 h-10 px-4 rounded-xl bg-muted text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button type="submit" disabled={!input.trim()} className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center disabled:opacity-40 transition-opacity tap-highlight">
              <Send size={15} className={`text-[#0E0E11] ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
