import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import {
    HeadphonesIcon,
    MessageSquare,
    Clock,
    CheckCircle2,
    AlertCircle,
    Calendar,
    HelpCircle,
    Send,
    ExternalLink,
    User,
    RefreshCw,
    XCircle,
    ChevronRight
} from "lucide-react";
import {
    getTickets,
    createTicket,
    addMessageToTicket,
    updateTicketStatus,
    getStatusColor,
    FAQS,
    type SupportTicket,
    type TicketCategory
} from "@/lib/support";

interface DashboardSupportProps {
    onNavigate?: (section: string) => void;
}

const DashboardSupport = ({ onNavigate }: DashboardSupportProps) => {
    const [ticketSubject, setTicketSubject] = useState("");
    const [ticketMessage, setTicketMessage] = useState("");
    const [ticketCategory, setTicketCategory] = useState<TicketCategory>("technical");
    const [tickets, setTickets] = useState<SupportTicket[]>([]);

    // Ticket Details state
    const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
    const [replyMessage, setReplyMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load tickets on mount and listen for updates
    useEffect(() => {
        const loadTickets = () => {
            const allTickets = getTickets();
            setTickets(allTickets);
            if (selectedTicket) {
                const updatedSelected = allTickets.find(t => t.id === selectedTicket.id);
                if (updatedSelected) setSelectedTicket(updatedSelected);
            }
        };

        loadTickets();
        const handleUpdate = () => loadTickets();
        window.addEventListener('ticket-update', handleUpdate);

        return () => window.removeEventListener('ticket-update', handleUpdate);
    }, [selectedTicket?.id]); // specific dependency to refresh selected ticket

    // Auto-scroll to bottom of conversation
    useEffect(() => {
        if (selectedTicket) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedTicket?.messages, selectedTicket?.id]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "resolved":
                return <CheckCircle2 className="w-4 h-4" />;
            case "in_progress":
                return <Clock className="w-4 h-4" />;
            default:
                return <AlertCircle className="w-4 h-4" />;
        }
    };

    const handleSubmitTicket = (e: React.FormEvent) => {
        e.preventDefault();
        if (!ticketSubject || !ticketMessage) return;

        createTicket(ticketSubject, ticketMessage, ticketCategory);

        setTicketSubject("");
        setTicketMessage("");
        setTicketCategory("technical");
    };

    const handleReply = () => {
        if (!selectedTicket || !replyMessage.trim()) return;
        addMessageToTicket(selectedTicket.id, replyMessage, 'user');
        setReplyMessage("");
    };

    const handleStatusChange = (status: SupportTicket['status']) => {
        if (!selectedTicket) return;
        updateTicketStatus(selectedTicket.id, status);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <AnimatedSection animation="fadeInUp">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-display font-bold text-foreground">Support Center</h1>
                        <p className="text-muted-foreground">Get help and manage support requests</p>
                    </div>
                    <Link to="/contact-quote">
                        <Button variant="outline" className="gap-2">
                            <Calendar className="w-4 h-4" />
                            Schedule Consultation
                        </Button>
                    </Link>
                </div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Submit Ticket */}
                <AnimatedSection animation="fadeInUp" delay={100}>
                    <Card className="gradient-card shadow-card h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-accent" />
                                Submit a Request
                            </CardTitle>
                            <CardDescription>We'll get back to you within 24 hours</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmitTicket} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select value={ticketCategory} onValueChange={(v) => setTicketCategory(v as TicketCategory)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="technical">Technical Support</SelectItem>
                                            <SelectItem value="billing">Billing Question</SelectItem>
                                            <SelectItem value="product">Product Inquiry</SelectItem>
                                            <SelectItem value="order">Order Issue</SelectItem>
                                            <SelectItem value="general">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        placeholder="Brief description of your issue"
                                        value={ticketSubject}
                                        onChange={(e) => setTicketSubject(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Describe your issue in detail..."
                                        rows={4}
                                        value={ticketMessage}
                                        onChange={(e) => setTicketMessage(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" variant="hero" className="w-full gap-2">
                                    <Send className="w-4 h-4" />
                                    Submit Request
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </AnimatedSection>

                {/* Ticket History */}
                <AnimatedSection animation="fadeInUp" delay={200}>
                    <Card className="gradient-card shadow-card h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HeadphonesIcon className="w-5 h-5 text-accent" />
                                Your Tickets
                            </CardTitle>
                            <CardDescription>Track your support requests</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                            {tickets.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    onClick={() => setSelectedTicket(ticket)}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 cursor-pointer transition-all border border-transparent hover:border-accent/20 group"
                                >
                                    <div>
                                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">{ticket.subject}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {ticket.id} • {new Date(ticket.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 self-end sm:self-auto">
                                        <Badge
                                            variant="secondary"
                                            className={`${getStatusColor(ticket.status)} text-white border-0 flex items-center gap-1 capitalize`}
                                        >
                                            {getStatusIcon(ticket.status)}
                                            {ticket.status.replace('_', ' ')}
                                        </Badge>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent" />
                                    </div>
                                </div>
                            ))}
                            {tickets.length === 0 && (
                                <div className="text-center py-8">
                                    <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">No active tickets</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </AnimatedSection>
            </div>

            {/* Ticket Details Dialog */}
            <Dialog open={!!selectedTicket} onOpenChange={(open) => !open && setSelectedTicket(null)}>
                <DialogContent className="max-w-2xl h-[90vh] sm:h-[80vh] flex flex-col p-0 gap-0 overflow-hidden">
                    {selectedTicket && (
                        <>
                            <DialogHeader className="p-6 pb-4 border-b border-border/50 bg-muted/20">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <DialogTitle className="text-xl font-bold">{selectedTicket.subject}</DialogTitle>
                                        <DialogDescription className="flex items-center gap-3 mt-2">
                                            #{selectedTicket.id}
                                            <span className="text-muted-foreground/30">•</span>
                                            {new Date(selectedTicket.createdAt).toLocaleDateString()}
                                            <span className="text-muted-foreground/30">•</span>
                                            <span className="capitalize">{selectedTicket.category}</span>
                                        </DialogDescription>
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className={`${getStatusColor(selectedTicket.status)} text-white border-0 capitalize px-3 py-1`}
                                    >
                                        {selectedTicket.status.replace('_', ' ')}
                                    </Badge>
                                </div>
                            </DialogHeader>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/5">
                                {selectedTicket.messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent/20 text-accent'
                                            }`}>
                                            {msg.sender === 'user' ? <User className="w-4 h-4" /> : <HeadphonesIcon className="w-4 h-4" />}
                                        </div>
                                        <div className={`flex flex-col gap-1 max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                                ? 'bg-primary text-primary-foreground rounded-tr-none'
                                                : 'bg-card border border-border/50 rounded-tl-none shadow-sm'
                                                }`}>
                                                {msg.text}
                                            </div>
                                            <span className="text-[10px] text-muted-foreground px-1">
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm">
                                {selectedTicket.status === 'resolved' || selectedTicket.status === 'closed' ? (
                                    <div className="flex flex-col items-center justify-center py-4 gap-3">
                                        <p className="text-muted-foreground text-sm">This ticket is marked as fully resolved.</p>
                                        <Button variant="outline" onClick={() => handleStatusChange('open')}>
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            Reopen Ticket
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <Textarea
                                            value={replyMessage}
                                            onChange={(e) => setReplyMessage(e.target.value)}
                                            placeholder="Type your reply..."
                                            className="min-h-[50px] resize-none"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleReply();
                                                }
                                            }}
                                        />
                                        <div className="flex flex-col gap-2">
                                            <Button size="icon" onClick={handleReply} disabled={!replyMessage.trim()} className="h-full">
                                                <Send className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                {selectedTicket.status !== 'resolved' && (
                                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/30">
                                        <span className="text-xs text-muted-foreground">
                                            Press Enter to send
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-muted-foreground hover:text-emerald-600 h-8 text-xs"
                                            onClick={() => handleStatusChange('resolved')}
                                        >
                                            <CheckCircle2 className="w-3 h-3 mr-2" />
                                            Mark as Resolved
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* FAQ Section */}
            <AnimatedSection animation="fadeInUp" delay={300}>
                <Card className="gradient-card shadow-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-accent" />
                            Frequently Asked Questions
                        </CardTitle>
                        <CardDescription>Quick answers to common questions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {FAQS.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                                    <AccordionTrigger className="text-left hover:no-underline hover:text-primary">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </AnimatedSection>

            {/* Contact Banner */}
            <AnimatedSection animation="fadeInUp" delay={400}>
                <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-accent/20">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-accent/20">
                                    <HeadphonesIcon className="w-8 h-8 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Need immediate assistance?</h3>
                                    <p className="text-sm text-muted-foreground">Our support team is available Mon-Fri, 9AM-6PM IST</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" className="gap-2">
                                    <ExternalLink className="w-4 h-4" />
                                    Live Chat
                                </Button>
                                <Link to="/contact-quote">
                                    <Button variant="hero" className="gap-2">
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </AnimatedSection>
        </div>
    );
};

export default DashboardSupport;
