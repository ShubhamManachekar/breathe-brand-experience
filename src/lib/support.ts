export interface TicketMessage {
    id: string;
    sender: 'user' | 'agent';
    text: string;
    timestamp: string;
}

export interface SupportTicket {
    id: string;
    subject: string;
    // Removed legacy 'message' field in favor of messages array, but keeping for backward compat if needed during migration
    message?: string;
    messages: TicketMessage[];
    category: 'technical' | 'billing' | 'product' | 'order' | 'general';
    priority: 'low' | 'medium' | 'high';
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    createdAt: string;
    updatedAt: string;
}

export type TicketCategory = SupportTicket['category'];
export type TicketStatus = SupportTicket['status'];

// Mock initial data
const INITIAL_TICKETS: SupportTicket[] = [
    {
        id: "TKT-001",
        subject: "Diffuser installation query",
        messages: [
            { id: "m1", sender: "user", text: "I need help installing my new EZE Pro 5000.", timestamp: "2024-01-18T10:00:00Z" },
            { id: "m2", sender: "agent", text: "Hi! I can help with that. Have you checked the mounting bracket included in the box?", timestamp: "2024-01-18T10:05:00Z" }
        ],
        category: "technical",
        priority: "medium",
        status: "open",
        createdAt: "2024-01-18T10:00:00Z",
        updatedAt: "2024-01-18T10:05:00Z",
    },
    {
        id: "TKT-002",
        subject: "Subscription billing question",
        messages: [
            { id: "m1", sender: "user", text: "I was charged twice for this month.", timestamp: "2024-01-10T14:30:00Z" },
            { id: "m2", sender: "agent", text: "We apologize for the error. We have processed a refund for the duplicate charge.", timestamp: "2024-01-11T09:00:00Z" }
        ],
        category: "billing",
        priority: "high",
        status: "resolved",
        createdAt: "2024-01-10T14:30:00Z",
        updatedAt: "2024-01-11T09:00:00Z",
    },
    {
        id: "TKT-003",
        subject: "Custom scent request",
        messages: [
            { id: "m1", sender: "user", text: "Do you have a sandalwood and vanilla blend?", timestamp: "2024-01-05T16:45:00Z" }
        ],
        category: "product",
        priority: "low",
        status: "in_progress",
        createdAt: "2024-01-05T16:45:00Z",
        updatedAt: "2024-01-06T11:20:00Z",
    },
];

// Helper to get color for status
export const getStatusColor = (status: TicketStatus): string => {
    switch (status) {
        case 'open': return 'bg-blue-500';
        case 'in_progress': return 'bg-amber-500';
        case 'resolved': return 'bg-emerald-500';
        case 'closed': return 'bg-gray-500';
        default: return 'bg-gray-400';
    }
};

// Storage key
const STORAGE_KEY = 'eze_support_tickets';

// Get all tickets
export const getTickets = (): SupportTicket[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error("Failed to parse tickets", e);
    }
    return INITIAL_TICKETS;
};

// Create a new ticket
export const createTicket = (
    subject: string,
    initialMessage: string,
    category: TicketCategory = 'general',
    priority: SupportTicket['priority'] = 'medium'
): SupportTicket => {
    const tickets = getTickets();
    const newTicket: SupportTicket = {
        id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
        subject,
        messages: [
            {
                id: `msg-${Date.now()}`,
                sender: 'user',
                text: initialMessage,
                timestamp: new Date().toISOString()
            }
        ],
        category,
        priority,
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const updatedTickets = [newTicket, ...tickets];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTickets));

    // Dispatch event for real-time updates across components
    window.dispatchEvent(new Event('ticket-update'));

    return newTicket;
};

// Add message to ticket
export const addMessageToTicket = (ticketId: string, text: string, sender: 'user' | 'agent'): SupportTicket | null => {
    const tickets = getTickets();
    const ticketIndex = tickets.findIndex(t => t.id === ticketId);

    if (ticketIndex === -1) return null;

    const newMessage: TicketMessage = {
        id: `msg-${Date.now()}`,
        sender,
        text,
        timestamp: new Date().toISOString()
    };

    tickets[ticketIndex].messages.push(newMessage);
    tickets[ticketIndex].updatedAt = new Date().toISOString();

    // Auto-reopen if user replies to resolved ticket
    if (sender === 'user' && (tickets[ticketIndex].status === 'resolved' || tickets[ticketIndex].status === 'closed')) {
        tickets[ticketIndex].status = 'open';
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    window.dispatchEvent(new Event('ticket-update'));

    return tickets[ticketIndex];
};

// Update ticket status
export const updateTicketStatus = (ticketId: string, status: TicketStatus): SupportTicket | null => {
    const tickets = getTickets();
    const ticketIndex = tickets.findIndex(t => t.id === ticketId);

    if (ticketIndex === -1) return null;

    tickets[ticketIndex].status = status;
    tickets[ticketIndex].updatedAt = new Date().toISOString();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    window.dispatchEvent(new Event('ticket-update'));

    return tickets[ticketIndex];
};


// Get ticket stats
export const getTicketStats = () => {
    const tickets = getTickets();
    return {
        total: tickets.length,
        open: tickets.filter(t => t.status === 'open').length,
        inProgress: tickets.filter(t => t.status === 'in_progress').length,
        resolved: tickets.filter(t => t.status === 'resolved').length,
    };
};

// FAQ Data (migrated from rules for easier access if needed)
export const FAQS = [
    {
        question: "How do I install my EZE Diffuser?",
        answer: "Our diffusers come with a comprehensive installation guide. For professional installations, please contact our support team to schedule a technician visit.",
    },
    {
        question: "Can I create a custom scent blend?",
        answer: "Yes! We offer custom scent creation services for our business clients. Contact our aroma specialists for a consultation.",
    },
    {
        question: "What's included in the Premium subscription?",
        answer: "Premium includes priority support, monthly aroma deliveries, maintenance services, and exclusive access to new scent collections.",
    },
    {
        question: "How often should I replace aroma cartridges?",
        answer: "Depending on usage, most cartridges last 30-60 days. We recommend checking levels monthly and scheduling automatic refills.",
    },
];
