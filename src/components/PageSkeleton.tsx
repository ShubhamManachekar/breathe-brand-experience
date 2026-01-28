import { Skeleton } from "@/components/ui/skeleton";

/**
 * PageSkeleton - Full-page loading skeleton for route transitions
 * 
 * Displays a responsive loading state while lazy-loaded pages are being fetched.
 * Uses the shadcn-ui Skeleton component with pulse animation.
 */
const PageSkeleton = () => {
    return (
        <div className="min-h-screen bg-background animate-pulse">
            {/* Hero Section Skeleton */}
            <div className="pt-16">
                <div className="relative h-[70vh] bg-muted/30">
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                        {/* Badge */}
                        <Skeleton className="h-8 w-48 rounded-full mb-6" />

                        {/* Title */}
                        <Skeleton className="h-12 w-3/4 max-w-2xl mb-4" />
                        <Skeleton className="h-12 w-1/2 max-w-xl mb-8" />

                        {/* Description */}
                        <Skeleton className="h-6 w-2/3 max-w-xl mb-2" />
                        <Skeleton className="h-6 w-1/2 max-w-lg mb-8" />

                        {/* CTA Buttons */}
                        <div className="flex gap-4">
                            <Skeleton className="h-12 w-40 rounded-lg" />
                            <Skeleton className="h-12 w-32 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section Skeleton */}
            <div className="py-12 border-y border-border/30">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center space-y-3">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Section Skeleton */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <Skeleton className="h-8 w-48 mx-auto mb-4 rounded-full" />
                        <Skeleton className="h-10 w-2/3 max-w-xl mx-auto mb-4" />
                        <Skeleton className="h-6 w-1/2 max-w-lg mx-auto" />
                    </div>

                    {/* Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="p-6 rounded-xl border border-border/40 bg-card">
                                <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                                <Skeleton className="h-6 w-3/4 mb-3" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-2/3 mb-6" />
                                <div className="border-t border-border/30 pt-4">
                                    <Skeleton className="h-8 w-16 mb-2" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Content Section */}
            <div className="py-16 bg-muted/20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <Skeleton className="h-8 w-40 mx-auto mb-4 rounded-full" />
                        <Skeleton className="h-10 w-1/2 max-w-lg mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="p-6 rounded-xl border border-border/40 bg-card">
                                <Skeleton className="h-2 w-full mb-4" />
                                <Skeleton className="h-16 w-16 rounded-xl mb-4" />
                                <Skeleton className="h-6 w-3/4 mb-3" />
                                <Skeleton className="h-4 w-24 mb-4 rounded-full" />
                                <Skeleton className="h-8 w-32 mb-4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3 mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageSkeleton;

/**
 * CardSkeleton - Smaller skeleton for individual card loading
 */
export const CardSkeleton = () => (
    <div className="p-6 rounded-xl border border-border/40 bg-card animate-pulse">
        <Skeleton className="h-12 w-12 rounded-lg mb-4" />
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
    </div>
);

/**
 * TableSkeleton - Skeleton for table/list views
 */
export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
    <div className="space-y-3 animate-pulse">
        {/* Header */}
        <div className="flex gap-4 p-4 border-b border-border">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
        </div>
        {/* Rows */}
        {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex gap-4 p-4 border-b border-border/50">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
            </div>
        ))}
    </div>
);

/**
 * ProductCardSkeleton - Skeleton for product cards
 */
export const ProductCardSkeleton = () => (
    <div className="rounded-xl border border-border/40 bg-card overflow-hidden animate-pulse">
        <Skeleton className="h-48 w-full" />
        <div className="p-6">
            <Skeleton className="h-4 w-20 mb-3 rounded-full" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
        </div>
    </div>
);
