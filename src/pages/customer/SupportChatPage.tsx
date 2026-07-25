import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { CustomerLayout } from '../../components/layout/CustomerLayout'
import { useApp } from '../../context/AppContext'
import { chatMessages as initialMessages } from '../../lib/mockData'

export default function SupportChatPage() {
  const { lang, dir } = useApp()
  const navigate = useNavigate()
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    const newMsg = { id: Date.now().toString(), sender: 'user', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), read: true }
    setMessages(prev => [...prev, newMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'support',
          text: lang === 'ar'
            ? 'شكراً على رسالتك! فريق الدعم سيرد عليك في أقرب وقت ممكن.'
            : "Thanks for reaching out! Our support team will get back to you as soon as possible.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
        },
      ])
    }, 2000)
  }

  return (
    <CustomerLayout>
      <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-56px-80px)] md:h-[calc(100vh-56px)]">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl hover:bg-muted flex items-center justify-center tap-highlight">
            <ArrowLeft size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
          </button>
          <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-[#0E0E11] font-bold shrink-0">
            LK
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">LOXX KING Support</p>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              {lang === 'ar' ? 'متصل الآن' : 'Online now'}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="text-center text-xs text-muted-foreground py-2">
            {lang === 'ar' ? 'اليوم' : 'Today'}
          </div>
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'support' && (
                <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-[#0E0E11] text-xs font-bold me-2 mt-auto shrink-0">
                  LK
                </div>
              )}
              <div className={`max-w-[75%] group`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-brand text-[#0E0E11] rounded-br-sm'
                    : 'bg-card border border-border rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
                <p className={`text-[10px] text-muted-foreground mt-1 ${msg.sender === 'user' ? 'text-end' : 'text-start'}`}>
                  {msg.time}
                  {msg.sender === 'user' && msg.read && <span className="ms-1 text-brand">✓✓</span>}
                </p>
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-[#0E0E11] text-xs font-bold shrink-0">LK</div>
              <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="flex items-center gap-2 p-3 border-t border-border bg-card">
          <button type="button" className="w-9 h-9 rounded-xl hover:bg-muted flex items-center justify-center tap-highlight text-muted-foreground">
            <Paperclip size={18} />
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={lang === 'ar' ? 'اكتبي رسالة...' : 'Type a message...'}
            className="flex-1 h-10 px-4 rounded-xl bg-muted text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center disabled:opacity-40 transition-opacity tap-highlight shrink-0"
          >
            <Send size={16} className={`text-[#0E0E11] ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </button>
        </form>
      </div>
    </CustomerLayout>
  )
}
