export function SkeletonBlock({ className = "" }) {
    return (
        <div
            className={`animate-pulse rounded-md bg-gray-200/80 ${className}`}
            aria-hidden="true"
        />
    );
}

export function LoadingServiceCards({ count = 6 }) {
    return (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                >
                    <SkeletonBlock className="h-48 w-full" />
                    <div className="space-y-3 p-4">
                        <SkeletonBlock className="h-4 w-2/3" />
                        <SkeletonBlock className="h-3 w-1/2" />
                        <SkeletonBlock className="h-9 w-full rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function LoadingProductCards({ count = 4 }) {
    return (
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                >
                    <SkeletonBlock className="h-44 w-full" />
                    <div className="space-y-3 p-4">
                        <SkeletonBlock className="h-4 w-3/4" />
                        <SkeletonBlock className="h-3 w-1/3" />
                        <SkeletonBlock className="h-8 w-full rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function LoadingBookingRows({ count = 3 }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-2 flex-1">
                            <SkeletonBlock className="h-4 w-1/3" />
                            <SkeletonBlock className="h-3 w-2/3" />
                        </div>
                        <SkeletonBlock className="h-7 w-20 rounded-full" />
                    </div>
                    <div className="mt-4 space-y-2">
                        <SkeletonBlock className="h-3 w-full" />
                        <SkeletonBlock className="h-3 w-5/6" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function LoadingDetailSkeleton() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
            <SkeletonBlock className="mb-6 h-4 w-24" />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <SkeletonBlock className="aspect-square w-full rounded-xl" />
                <div className="space-y-4">
                    <SkeletonBlock className="h-6 w-28 rounded-full" />
                    <SkeletonBlock className="h-8 w-3/4" />
                    <SkeletonBlock className="h-4 w-1/2" />
                    <SkeletonBlock className="h-10 w-1/3" />
                    <SkeletonBlock className="h-4 w-full" />
                    <SkeletonBlock className="h-4 w-5/6" />
                    <SkeletonBlock className="h-4 w-2/3" />
                    <SkeletonBlock className="h-12 w-full rounded-full" />
                </div>
            </div>
        </div>
    );
}

export function LoadingCartSkeleton() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
            <SkeletonBlock className="mb-6 h-8 w-40" />
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                        <div className="flex gap-4">
                            <SkeletonBlock className="h-20 w-20 rounded-lg" />
                            <div className="flex-1 space-y-3">
                                <SkeletonBlock className="h-4 w-2/5" />
                                <SkeletonBlock className="h-3 w-1/3" />
                                <SkeletonBlock className="h-3 w-1/2" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function LoadingTableSkeleton({ rows = 5, columns = 5 }) {
    return (
        <div className="mt-6 space-y-3">
            <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                {Array.from({ length: columns }).map((_, index) => (
                    <SkeletonBlock key={`header-${index}`} className="h-4 w-full" />
                ))}
            </div>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    className="grid gap-3"
                    style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
                >
                    {Array.from({ length: columns }).map((__, colIndex) => (
                        <SkeletonBlock key={`${rowIndex}-${colIndex}`} className="h-10 w-full rounded-lg" />
                    ))}
                </div>
            ))}
        </div>
    );
}
