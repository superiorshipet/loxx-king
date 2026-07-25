import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export function FloatingChat() {
  const { dir, lang, chatUnread, setChatUnread } = useApp()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: '1', sender: 'support', text: lang === 'ar' ? 'مرحباً! كيف يمكنني مساعدتك؟ 👋' : 'Hi there! How can we help you today? 👋', time: 'Just now' },
  ])

  function handleOpen() {
    setOpen(true)
    setChatUnread(0)
  }

  function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    const newMsg = { id: Date.now().toString(), sender: 'user', text: message, time: 'Just now' }
    setMessages(prev => [...prev, newMsg])
    setMessage('')
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), sender: 'support', text: lang === 'ar' ? 'شكراً على رسالتك! سيرد عليك أحد ممثلينا قريباً.' : "Thanks for your message! A support rep will reply shortly.", time: 'Just now' },
      ])
    }, 1200)
  }

  return (
    <div className={`fixed bottom-20 md:bottom-6 z-50 ${dir === 'rtl' ? 'left-4' : 'right-4'}`}>
      {/* Chat Panel */}
      {open && (
        <div className="mb-3 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-brand px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={16} className="text-[#0E0E11]" />
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-[#0E0E11]">LOXX KING Support</p>
                <p className="text-[10px] text-[#0E0E11]/70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block" />
                  {lang === 'ar' ? 'متصل الآن' : 'Online now'}
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors tap-highlight">
              <X size={16} className="text-[#0E0E11]" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-60 overflow-y-auto p-3 space-y-2 bg-muted/30">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    msg.sender === 'user'
                      ? 'bg-brand text-[#0E0E11] rounded-br-sm'
                      : 'bg-card text-foreground rounded-bl-sm border border-border'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="flex items-center gap-2 p-3 border-t border-border bg-card">
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={lang === 'ar' ? 'اكتب رسالة...' : 'Type a message...'}
              className="flex-1 h-9 px-3 rounded-xl bg-muted text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center disabled:opacity-40 transition-opacity tap-highlight shrink-0"
            >
              <Send size={15} className="text-[#0E0E11]" />
            </button>
          </form>
        </div>
      )}

      {/* Bubble */}
      <button
        onClick={handleOpen}
        className="w-13 h-13 bg-brand rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform tap-highlight relative"
        style={{ width: 52, height: 52 }}
        aria-label="Open support chat"
      >
        <MessageCircle size={24} className="text-[#0E0E11]" />
        {chatUnread > 0 && (
          <span className="absolute -top-1 -end-1 min-w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 animate-bounce-in">
            {chatUnread}
          </span>
        )}
      </button>
    </div>
  )
}
