"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Sparkles, MessageCircle, ChevronDown } from "lucide-react";

/* ─── Types ─── */
interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
}

interface BrandTheme {
  primaryColor: string;
  accentColor: string;
  brandName: string;
  ctaLink: string;
  phone?: string;
}

interface FloatingChatProps {
  brand?: BrandTheme;
  knowledge?: string;
  /** Greeting shown before first message */
  greeting?: string;
}

/* ─── Defaults (CapeSystem) ─── */
const DEFAULT_BRAND: BrandTheme = {
  primaryColor: "#89AACC",
  accentColor: "#4E85BF",
  brandName: "CapeSystem",
  ctaLink: "/audit",
  phone: "+40 733 874 143",
};

const DEFAULT_GREETING =
  "Salut! Sunt asistentul CapeSystem. Cu ce te pot ajuta azi? 👋";

/* ─── Markdown link renderer (simple) ─── */
function RenderMessage({ text }: { text: string }) {
  // Convert [text](url) to anchor tags
  const parts = text.split(/(\[([^\]]+)\]\(([^)]+)\))/g);
  const elements: React.ReactNode[] = [];
  let i = 0;
  while (i < parts.length) {
    const part = parts[i];
    if (part && part.startsWith("[") && parts[i + 1] && parts[i + 2]) {
      elements.push(
        <a
          key={i}
          href={parts[i + 2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 font-semibold opacity-90 hover:opacity-100"
        >
          {parts[i + 1]}
        </a>
      );
      i += 3;
    } else if (part) {
      // Handle line breaks
      const lines = part.split("\n");
      lines.forEach((line, li) => {
        if (li > 0) elements.push(<br key={`br-${i}-${li}`} />);
        if (line) elements.push(<span key={`t-${i}-${li}`}>{line}</span>);
      });
      i++;
    } else {
      i++;
    }
  }
  return <>{elements}</>;
}

/* ─── Typing indicator ─── */
function TypingDots({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: color }}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

/* ─── Unread badge ─── */
function UnreadBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
      style={{ background: "#ef4444" }}
    >
      {count > 9 ? "9+" : count}
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function FloatingChat({
  brand = DEFAULT_BRAND,
  knowledge,
  greeting = DEFAULT_GREETING,
}: FloatingChatProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(1); // Start with 1 to show greeting badge
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingDismissed, setGreetingDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { primaryColor, accentColor, brandName, ctaLink } = brand;

  /* ── Auto-scroll to bottom ── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ── Focus input when opened ── */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setUnread(0);
      setGreetingDismissed(true);
      setShowGreeting(false);

      // Add greeting as first message if no messages yet
      if (messages.length === 0) {
        setMessages([
          {
            role: "assistant",
            content: greeting,
            id: "greeting",
          },
        ]);
      }
    }
  }, [open]);

  /* ── Show greeting bubble after 4s if not opened ── */
  useEffect(() => {
    if (greetingDismissed) return;
    const t = setTimeout(() => setShowGreeting(true), 4000);
    return () => clearTimeout(t);
  }, [greetingDismissed]);

  /* ── Send message ── */
  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text, id: Date.now().toString() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          knowledge,
          // messageCount drives CTA injection (after 2+ exchanges)
          messageCount: newMessages.filter((m) => m.role === "user").length,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text, id: Date.now().toString() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Îmi pare rău, am o problemă tehnică momentan. Poți să ne contactezi direct pe [WhatsApp](https://wa.me/40733874143).`,
          id: Date.now().toString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, knowledge]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ── Gradient style helpers ── */
  const gradientStyle = {
    background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
  };

  return (
    <>
      {/* ── Greeting bubble ── */}
      <AnimatePresence>
        {showGreeting && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="fixed bottom-24 right-6 z-40 max-w-[220px] cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <div
              className="rounded-2xl rounded-br-sm px-4 py-3 text-white text-xs leading-relaxed shadow-2xl"
              style={{
                background: "hsl(0 0% 8%)",
                border: `1px solid ${primaryColor}40`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${primaryColor}20`,
              }}
            >
              {greeting}
              <div
                className="absolute -bottom-1.5 right-4 w-3 h-3 rotate-45"
                style={{ background: "hsl(0 0% 8%)", border: `1px solid ${primaryColor}40`, borderTop: "none", borderLeft: "none" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ── */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative"
        style={{
          ...gradientStyle,
          boxShadow: `0 8px 32px ${primaryColor}50, 0 2px 8px rgba(0,0,0,0.4)`,
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? "Închide chat" : "Deschide chat"}
      >
        <UnreadBadge count={unread} />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Pulse ring */}
        {!open && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${primaryColor}` }}
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] flex flex-col overflow-hidden"
            style={{
              height: "min(520px, calc(100vh - 120px))",
              background: "hsl(0 0% 5%)",
              border: `1px solid ${primaryColor}30`,
              borderRadius: "1.75rem",
              boxShadow: `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px ${primaryColor}15, 0 -1px 0 ${primaryColor}20`,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}18 0%, ${accentColor}10 100%)`,
                borderBottom: `1px solid ${primaryColor}20`,
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ ...gradientStyle, boxShadow: `0 4px 12px ${primaryColor}40` }}
              >
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-bold leading-none mb-0.5 truncate">
                  {brandName} AI
                </p>
                <p className="text-xs flex items-center gap-1.5" style={{ color: `${primaryColor}` }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                  Online acum
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin"
              style={{ scrollbarColor: `${primaryColor}30 transparent` }}>
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div
                        className="w-6 h-6 rounded-lg flex-shrink-0 mr-2 mt-0.5 flex items-center justify-center"
                        style={{ background: `${primaryColor}20`, border: `1px solid ${primaryColor}30` }}
                      >
                        <Sparkles size={10} style={{ color: primaryColor }} />
                      </div>
                    )}
                    <div
                      className="max-w-[82%] px-3.5 py-2.5 text-[13px] leading-relaxed"
                      style={{
                        background: msg.role === "user"
                          ? `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`
                          : "hsl(0 0% 10%)",
                        color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.88)",
                        borderRadius: msg.role === "user"
                          ? "1.2rem 1.2rem 0.3rem 1.2rem"
                          : "1.2rem 1.2rem 1.2rem 0.3rem",
                        border: msg.role === "assistant" ? `1px solid ${primaryColor}18` : "none",
                        boxShadow: msg.role === "user" ? `0 4px 12px ${primaryColor}35` : "none",
                      }}
                    >
                      <RenderMessage text={msg.content} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: `${primaryColor}20`, border: `1px solid ${primaryColor}30` }}
                  >
                    <Sparkles size={10} style={{ color: primaryColor }} />
                  </div>
                  <div
                    className="rounded-2xl"
                    style={{ background: "hsl(0 0% 10%)", border: `1px solid ${primaryColor}18` }}
                  >
                    <TypingDots color={primaryColor} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies (shown before first user message) */}
            {messages.filter((m) => m.role === "user").length === 0 && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="px-4 pb-2 flex flex-wrap gap-1.5"
              >
                {["Cât costă un site?", "Faceți SEO?", "Vreau un audit"].map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); setTimeout(() => sendMessage(), 50); }}
                    className="text-[11px] px-3 py-1.5 rounded-full transition-all hover:scale-105"
                    style={{
                      background: `${primaryColor}15`,
                      border: `1px solid ${primaryColor}35`,
                      color: primaryColor,
                    }}
                  >
                    {q}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Input */}
            <div
              className="px-4 pb-4 pt-2 flex-shrink-0"
              style={{ borderTop: `1px solid ${primaryColor}18` }}
            >
              <div
                className="flex items-center gap-2 rounded-2xl px-4 py-2.5"
                style={{
                  background: "hsl(0 0% 9%)",
                  border: `1px solid ${primaryColor}25`,
                  boxShadow: `0 0 0 0px ${primaryColor}00`,
                  transition: "box-shadow 0.2s",
                }}
                onFocus={() => {}}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Scrie un mesaj..."
                  disabled={loading}
                  className="flex-1 bg-transparent text-white text-sm placeholder:text-white/25 outline-none min-w-0"
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-30"
                  style={input.trim() ? gradientStyle : { background: "hsl(0 0% 15%)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  {loading
                    ? <Loader2 size={14} className="text-white animate-spin" />
                    : <Send size={14} className="text-white" />
                  }
                </motion.button>
              </div>
              <p className="text-center text-[9px] text-white/15 mt-2 font-mono tracking-widest uppercase">
                Powered by CapeSystem AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
