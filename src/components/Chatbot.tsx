import React, { useEffect, useRef, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { MessageSquare, X, Send, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import rules from "@/lib/chatbot-rules.json";
import { Link } from "react-router-dom";
import { createTicket } from "@/lib/support";

type ChatMessage = { id: string; from: "bot" | "user"; text: string; image?: string | null };
type ChatFlowState = "idle" | "ticket_subject" | "ticket_message";

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

  // Ticket creation flow state
  const [flowState, setFlowState] = useState<ChatFlowState>("idle");
  const [tempTicket, setTempTicket] = useState<{ subject: string }>({ subject: "" });

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

    // Handle ticket creation flow
    if (flowState === "ticket_subject") {
      setTempTicket({ subject: text });
      setFlowState("ticket_message");
      setTimeout(() => pushBot("Got it. Please describe your issue in detail."), 500);
      return;
    }

    if (flowState === "ticket_message") {
      setFlowState("idle");
      const ticket = createTicket(tempTicket.subject, text);
      setTimeout(() => pushBot(`Ticket #${ticket.id} has been created successfully! Our support team will get back to you shortly. You can track this in the Support Center.`), 500);
      return;
    }

    const ltext = (text || '').toLowerCase();

    // Start ticket flow
    if (containsAny(ltext, ["ticket", "support request", "raise a complaint", "create ticket"])) {
      setFlowState("ticket_subject");
      setTimeout(() => pushBot("I can help you create a support ticket. What is the subject of your request?"), 500);
      return;
    }

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

    // Rule-based fallback
    pushBot("Sorry — I don't have an exact answer. Try: 'order diffusers', 'diffuser quote', 'create ticket', or 'help troubleshooting'.");
  }

  function quickAsk(q: string) { sendMessage(q); }

  function startTicket() {
    setIsOpen(true);
    setFlowState("ticket_subject");
    pushBot("I can help you create a support ticket. What is the subject of your request?");
  }

  function resetConversation() {
    setMessages([{ id: uid("m"), from: "bot", text: "Hi — ask me about FAQ, troubleshooting, or type 'diffuser quote' for an aroma suggestion." }]);
    setFlowState("idle");
  }

  return createPortal(
    <>
      {/* Persistent chat bubble (always visible) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          aria-label={isOpen ? "Close chat" : "Open chat"}
          onClick={() => setIsOpen(s => !s)}
          className={`w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center shadow-glow hover:shadow-elegant transition-all duration-300 hover:scale-105 ${isOpen ? 'rotate-180' : 'animate-pulse'
            }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && createPortal(
        <div
          role="dialog"
          aria-label="EZE Aircare Assistant"
          aria-modal="false"
          className="fixed inset-0 flex items-end justify-end pointer-events-none z-50"
        >
          <div className="pointer-events-auto m-6 animate-fade-in">
            <Card className="w-[420px] max-w-[calc(100vw-3rem)] h-[600px] flex flex-col shadow-elegant backdrop-blur-sm bg-card/95 border-border/50 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                      <span className="text-white font-display font-bold text-lg">E</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-display">EZE Aircare Assistant</CardTitle>
                      <p className="text-xs text-muted-foreground">Your scent & diffuser expert</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetConversation}
                      className="hover:bg-accent/20 text-xs"
                    >
                      Reset
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      aria-label="Close chat"
                      className="hover:bg-destructive/20 hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent
                ref={scrollRef as any}
                className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-background/50 to-muted/30"
              >
                <div className="flex flex-col gap-4">
                  {messages.map((m, index) => (
                    <div
                      key={m.id}
                      className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${m.from === 'user'
                          ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground'
                          : 'bg-card border border-border/50 text-card-foreground'
                        }`}>
                        {m.image && (
                          <div className="mb-2">
                            <img
                              src={m.image}
                              alt="uploaded"
                              className="max-w-[280px] rounded-xl border border-border/20"
                            />
                          </div>
                        )}
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</div>
                        {m.from === 'bot' && m.text.includes('For details see:') && (() => {
                          const [before, linksPart] = m.text.split('For details see:');
                          const paths = linksPart ? linksPart.split(',').map((s: string) => s.trim()) : [];
                          return (
                            <div className="mt-3 flex gap-2 flex-wrap">
                              {paths.map((p: string, i: number) => p ? (
                                <Link
                                  key={i}
                                  to={p}
                                  className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full hover:bg-accent/30 transition-colors"
                                >
                                  {p}
                                </Link>
                              ) : null)}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  ))}
                  {flowState !== 'idle' && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="bg-card border border-border/50 text-card-foreground max-w-[85%] rounded-2xl p-3 shadow-sm">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <LifeBuoy className="w-3 h-3 animate-spin-slow" />
                          {flowState === 'ticket_subject' ? 'Waiting for subject...' : 'Waiting for message...'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 bg-gradient-to-t from-muted/20 to-transparent border-t border-border/50">
                <div className="flex flex-col gap-3 w-full">
                  {/* Quick Actions */}
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => quickAsk("diffuser quote")}
                      className="text-xs hover:bg-primary/10 hover:border-primary/30"
                      disabled={flowState !== 'idle'}
                    >
                      Aroma Quote
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => quickAsk("troubleshooting")}
                      className="text-xs hover:bg-accent/10 hover:border-accent/30"
                      disabled={flowState !== 'idle'}
                    >
                      Troubleshooting
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startTicket()}
                      className="text-xs hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-600"
                      disabled={flowState !== 'idle'}
                    >
                      Create Ticket
                    </Button>
                  </div>

                  {/* Input Area */}
                  <div className="flex gap-2 items-end">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0] ?? null;
                        setImageFile(f);
                        if (f) {
                          const reader = new FileReader();
                          reader.onload = (ev) => setImagePreview(ev.target?.result as string);
                          reader.readAsDataURL(f);
                        } else {
                          setImagePreview(null);
                        }
                      }}
                    />

                    <div className="flex-1">
                      {imagePreview && (
                        <div className="mb-2 p-2 bg-muted/50 rounded-lg border border-border/30 flex items-center gap-2">
                          <img
                            src={imagePreview}
                            alt="preview"
                            className="w-12 h-12 rounded object-cover"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => { setImageFile(null); setImagePreview(null); }}
                            className="text-xs text-muted-foreground hover:text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="hover:bg-accent/20"
                          disabled={flowState !== 'idle'}
                        >
                          📎
                        </Button>
                        <Input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              sendMessage(inputValue, imagePreview ?? undefined);
                            }
                          }}
                          placeholder={flowState === 'idle' ? "Ask about scents..." : flowState === 'ticket_subject' ? "Type ticket subject..." : "Type your message..."}
                          className="bg-background/80 border-border/50 focus:border-primary/50"
                          autoFocus={flowState !== 'idle'}
                        />
                        <Button
                          onClick={() => sendMessage(inputValue, imagePreview ?? undefined)}
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-glow"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>,
        document.body
      )}

      {/* Dev-only: rules editor */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="fixed left-4 bottom-4 w-96 max-w-[90vw] bg-card border border-border rounded-lg shadow-lg p-3 z-40 hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold">Chatbot Rules (dev)</div>
            {/* ... simplified ... */}
          </div>
        </div>
      )}
    </>,
    document.body
  );
}