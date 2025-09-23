import React, { useEffect, useRef, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import rules from "@/lib/chatbot-rules.json";
import { Link } from "react-router-dom";

type ChatMessage = { id: string; from: "bot" | "user"; text: string; image?: string | null };

// NOTE: FAQ/TROUBLESHOOT/DIFFUSER_QUOTES are derived from bundled rules or
// from a development override stored in localStorage. See inside component.

// helper: does the user's text include any of the keywords?
function containsAny(text: string, keys: string[]) {
  const t = text.toLowerCase();
  return keys.some(k => t.includes(k));
}

function uid(prefix = "") {
  return prefix + Math.random().toString(36).slice(2, 9);
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try { return JSON.parse(localStorage.getItem("chatbot.open") || "false"); } catch { return false; }
  });
  // dev override JSON (stored in localStorage)
  const [overridesJson, setOverridesJson] = useState<string | null>(() => localStorage.getItem("chatbot.rules.override"));
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("chatbot.messages");
    return saved ? JSON.parse(saved) : [{ id: uid("m"), from: "bot", text: "Hi — ask me about FAQ, troubleshooting, or type 'diffuser quote' for an aroma suggestion." }];
  });
  const [inputValue, setInputValue] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const parsedRules = useMemo(() => {
    if (overridesJson) {
      try { return JSON.parse(overridesJson); } catch { return rules as any; }
    }
    return rules as any;
  }, [overridesJson]);

  const FAQ = parsedRules.faq;
  const TROUBLESHOOT = parsedRules.troubleshoot;
  const DIFFUSER_QUOTES = parsedRules.diffuserQuotes;

  useEffect(() => localStorage.setItem("chatbot.open", JSON.stringify(isOpen)), [isOpen]);
  useEffect(() => localStorage.setItem("chatbot.messages", JSON.stringify(messages)), [messages]);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages, isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setIsOpen(s => !s); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Debug: notify in console when component mounts (helpful to see in browser devtools)
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Chatbot mounted", { isOpen });
  }, []);

  // Dev helpers: expose a global control and briefly open the chat so it's visible for debugging
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      (window as any).__chatbot = {
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen(s => !s),
      };

      // Briefly open the chat for 3s so you can see it on page load while developing
      setIsOpen(true);
      const t = setTimeout(() => setIsOpen(false), 3000);

      return () => {
        clearTimeout(t);
        try { delete (window as any).__chatbot; } catch {}
      };
    }
    return;
  }, []);

  // Dev-only fullscreen overlay: shows briefly to confirm portal rendering
  const [showDevOverlay, setShowDevOverlay] = useState(false);
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      setShowDevOverlay(true);
      const to = setTimeout(() => setShowDevOverlay(false), 1500);
      return () => clearTimeout(to);
    }
  }, []);

  function pushBot(text: string) {
    setMessages(m => [...m, { id: uid("m"), from: "bot", text }]);
  }

  async function sendMessage(text: string, imageDataUrl?: string) {
    if (!text.trim() && !imageDataUrl) return;
    const userMsg: ChatMessage = { id: uid("u"), from: "user", text: text || (imageDataUrl ? 'Image attached' : ''), image: imageDataUrl ?? null };
    setMessages(m => [...m, userMsg]);
    setInputValue("");
    setImageFile(null);
    setImagePreview(null);

    const ltext = (text || '').toLowerCase();

    // Aroma quote triggers
    if ((ltext.includes("diffuser") && ltext.includes("quote")) || ltext.includes("aroma quote") || ltext.includes("diffuser quote") || ltext.includes("aroma suggestion")) {
      const q = DIFFUSER_QUOTES[Math.floor(Math.random() * DIFFUSER_QUOTES.length)];
      pushBot(`${q.scent} — ${q.text}`);
      return;
    }

    // FAQ matching
    for (const f of FAQ) {
      if (containsAny(ltext, f.keys)) {
        const linkText = f.links && f.links.length ? ` For details see: ${f.links.join(', ')}` : '';
        pushBot(`${f.answer}${linkText}`);
        return;
      }
    }

    // Troubleshooting matching
    for (const t of TROUBLESHOOT) {
      if (containsAny(ltext, t.keys)) { pushBot(t.a); return; }
    }

    // Rule-based fallback only (no external API). Add more rules above as needed.
    pushBot("Sorry — I don't have an exact answer. Try: 'order diffusers', 'diffuser quote', or 'help troubleshooting diffuser'. You can also contact support@breathe.dev.");
  }

  function quickAsk(q: string) { sendMessage(q); }

  function resetConversation() {
    setMessages([{ id: uid("m"), from: "bot", text: "Hi — ask me about FAQ, troubleshooting, or type 'diffuser quote' for an aroma suggestion." }]);
  }

  // Render UI into document.body to avoid ancestor clipping/overflow
  return createPortal(
    <>
      {showDevOverlay && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,0,0,0.06)', zIndex: 2147483645, pointerEvents: 'none' }} />
      )}
      {/* Persistent chat bubble (always visible) */}
      <div className="fixed" style={{ bottom: 24, right: 24, zIndex: 2147483646 }}>
        <button
          aria-label={isOpen ? "Close chat" : "Open chat"}
          onClick={() => setIsOpen(s => !s)}
          style={{
            width: 56,
            height: 56,
            borderRadius: 9999,
            background: 'linear-gradient(135deg,#0f4c5c,#1aa3b0)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(15,76,92,0.25)',
          }}
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>

      {isOpen && createPortal(
        <div
          role="dialog"
          aria-label="Site chat assistant"
          aria-modal="false"
          style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', pointerEvents: 'none', zIndex: 2147483647 }}
        >
          <div style={{ pointerEvents: 'auto', margin: 24 }}>
            <Card style={{ width: 420, maxWidth: '96vw', display: 'flex', flexDirection: 'column', boxShadow: '0 30px 80px rgba(2,6,23,0.5)', borderRadius: 16 }}>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <CardTitle>Help & Aroma Assistant</CardTitle>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Button variant="ghost" size="sm" onClick={resetConversation}>Reset</Button>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chat"><X /></Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8, height: 520, overflow: 'auto' }} ref={scrollRef as any}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {messages.map((m) => (
                    <div key={m.id} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div style={{ borderRadius: 12, padding: 10, maxWidth: '78%', background: m.from === 'user' ? '#0b1220' : '#f8fafc', color: m.from === 'user' ? '#fff' : '#0b1220' }}>
                        {m.image && (
                          <div style={{ marginBottom: 8 }}>
                            <img src={m.image} alt="uploaded" style={{ maxWidth: 300, borderRadius: 8, display: 'block' }} />
                          </div>
                        )}
                        <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
                        {m.from === 'bot' && m.text.includes('For details see:') && (() => {
                          const [before, linksPart] = m.text.split('For details see:');
                          const paths = linksPart ? linksPart.split(',').map((s: string) => s.trim()) : [];
                          return (
                            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                              {paths.map((p: string, i: number) => p ? <Link key={i} to={p} className="text-sm text-cyan-600 underline">{p}</Link> : null)}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter style={{ padding: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                      const f = e.target.files?.[0] ?? null;
                      setImageFile(f);
                      if (f) {
                        const reader = new FileReader();
                        reader.onload = (ev) => setImagePreview(ev.target?.result as string);
                        reader.readAsDataURL(f);
                      } else {
                        setImagePreview(null);
                      }
                    }} />
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>Attach</Button>
                    <div style={{ flex: 1, display: 'flex', gap: 8, alignItems: 'center' }}>
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(inputValue, imagePreview ?? undefined); } }}
                        placeholder="Ask about scents, quotes, troubleshooting..."
                      />
                      <Button onClick={() => sendMessage(inputValue, imagePreview ?? undefined)}>
                        <Send />
                      </Button>
                    </div>
                  </div>
                  {imagePreview && (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
                      <img src={imagePreview} alt="preview" style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8 }} />
                      <div style={{ marginLeft: 8 }}>
                        <Button size="sm" variant="ghost" onClick={() => { setImageFile(null); setImagePreview(null); }}>Remove</Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>
          {showDevOverlay && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,0,0,0.06)', pointerEvents: 'none', zIndex: 2147483646 }} />
          )}
        </div>, document.body)
      }
      {/* Dev-only: rules editor */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="fixed left-4 bottom-4 w-96 max-w-[90vw] bg-white border rounded shadow p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="font-sm font-semibold">Chatbot Rules (dev)</div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => {
                localStorage.removeItem('chatbot.rules.override');
                setOverridesJson(null);
              }}>Reset</Button>
              <Button size="sm" onClick={() => {
                // Save current overridesJson state
                try {
                  const txt = overridesJson ?? JSON.stringify(rules, null, 2);
                  localStorage.setItem('chatbot.rules.override', txt);
                  setOverridesJson(txt);
                } catch (e) { /* ignore */ }
              }}>Save</Button>
            </div>
          </div>
          <textarea
            value={overridesJson ?? JSON.stringify(rules, null, 2)}
            onChange={(e) => setOverridesJson(e.target.value)}
            rows={10}
            className="w-full p-2 border rounded text-xs font-mono"
          />
        </div>
      )}
    </>, document.body
  );
}