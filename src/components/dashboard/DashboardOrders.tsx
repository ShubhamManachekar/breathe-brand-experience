import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AnimatedSection from "@/components/AnimatedSection";
import {
    Search,
    Filter,
    Download,
    Eye,
    RefreshCw,
    Package,
    CheckCircle2,
    Truck,
    Clock,
} from "lucide-react";

interface DashboardOrdersProps {
    onNavigate?: (section: string) => void;
}

const DashboardOrders = ({ onNavigate }: DashboardOrdersProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Mock data
    const orders = [
        {
            id: "ORD-2024-001",
            date: "Jan 15, 2024",
            products: ["Lavender Dream Aroma Oil", "Diffuser Refill Pack"],
            status: "Delivered",
            total: "$89.99",
            statusColor: "bg-emerald-500",
        },
        {
            id: "ORD-2024-002",
            date: "Jan 18, 2024",
            products: ["EZE Diffuser Pro 5000"],
            status: "Shipped",
            total: "$349.00",
            statusColor: "bg-blue-500",
        },
        {
            id: "ORD-2024-003",
            date: "Jan 20, 2024",
            products: ["Citrus Fresh Collection (5 pack)", "Premium Subscription"],
            status: "Processing",
            total: "$149.99",
            statusColor: "bg-amber-500",
        },
        {
            id: "ORD-2023-089",
            date: "Dec 28, 2023",
            products: ["Ocean Breeze Aroma"],
            status: "Delivered",
            total: "$24.99",
            statusColor: "bg-emerald-500",
        },
        {
            id: "ORD-2023-088",
            date: "Dec 15, 2023",
            products: ["Holiday Scent Collection", "Gift Wrapping"],
            status: "Delivered",
            total: "$129.99",
            statusColor: "bg-emerald-500",
        },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Delivered":
                return <CheckCircle2 className="w-4 h-4" />;
            case "Shipped":
                return <Truck className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.products.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <AnimatedSection animation="fadeInUp">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-display font-bold text-foreground">Order History</h1>
                        <p className="text-muted-foreground">View and manage your orders</p>
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export Orders
                    </Button>
                </div>
            </AnimatedSection>

            {/* Filters */}
            <AnimatedSection animation="fadeInUp" delay={100}>
                <Card className="gradient-card shadow-card">
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search orders..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-48">
                                    <Filter className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={200}>
                <Card className="gradient-card shadow-card overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-accent" />
                            Orders ({filteredOrders.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-3 p-4">
                            {filteredOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-foreground">{order.id}</span>
                                        <Badge
                                            variant="secondary"
                                            className={`${order.statusColor} text-white border-0 flex items-center gap-1`}
                                        >
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground">{order.date}</div>
                                    <div className="text-sm text-foreground">
                                        {order.products.map((product, idx) => (
                                            <span key={idx}>
                                                {product}
                                                {idx < order.products.length - 1 && ", "}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                        <span className="font-bold text-foreground">{order.total}</span>
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="icon" title="View Details">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Reorder" onClick={() => onNavigate?.("aroma-oils")}>
                                                <RefreshCw className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Download Invoice">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30">
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Products</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredOrders.map((order) => (
                                        <TableRow key={order.id} className="hover:bg-muted/20 transition-colors">
                                            <TableCell className="font-medium">{order.id}</TableCell>
                                            <TableCell className="text-muted-foreground">{order.date}</TableCell>
                                            <TableCell>
                                                <div className="max-w-xs">
                                                    {order.products.map((product, idx) => (
                                                        <span key={idx}>
                                                            {product}
                                                            {idx < order.products.length - 1 && ", "}
                                                        </span>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="secondary"
                                                    className={`${order.statusColor} text-white border-0 flex items-center gap-1 w-fit`}
                                                >
                                                    {getStatusIcon(order.status)}
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-semibold">{order.total}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" title="View Details">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" title="Reorder" onClick={() => onNavigate?.("aroma-oils")}>
                                                        <RefreshCw className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" title="Download Invoice">
                                                        <Download className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </AnimatedSection>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
                <Card className="gradient-card shadow-card">
                    <CardContent className="py-12 text-center">
                        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-semibold text-foreground mb-2">No orders found</h3>
                        <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default DashboardOrders;
