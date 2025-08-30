import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function BookCardSkeleton() {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader>
        <div className="h-6 bg-muted rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="aspect-[3/4] w-full bg-muted rounded-md animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-5 bg-muted rounded w-16 animate-pulse"></div>
            <div className="h-5 bg-muted rounded w-16 animate-pulse"></div>
          </div>
          <div className="h-3 bg-muted rounded w-24 animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  )
}

export function BookGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function BookDetailSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="aspect-[3/4] w-full max-w-md mx-auto bg-muted rounded-lg animate-pulse"></div>
      </div>
      <div className="space-y-6">
        <div>
          <div className="h-8 bg-muted rounded w-3/4 animate-pulse mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-1/4 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
