"use client"

import { BookCard } from "@/components/book-card"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"
import { useBooks } from "@/hooks/use-books"
import { BookGridSkeleton } from "@/components/ui/loading-skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function BooksPage() {
  const { data: books, isLoading, error } = useBooks()

  if (isLoading) {
    return (
      <LayoutWithSidebar breadcrumbTitle="All Books">
        <BookGridSkeleton />
      </LayoutWithSidebar>
    )
  }

  if (error) {
    return (
      <LayoutWithSidebar breadcrumbTitle="All Books">
        <Alert variant="destructive">
          <AlertDescription>
            {error instanceof Error ? error.message : 'An unexpected error occurred while loading books.'}
          </AlertDescription>
        </Alert>
      </LayoutWithSidebar>
    )
  }

  return (
    <LayoutWithSidebar breadcrumbTitle="All Books">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">All Books</h1>
          <p className="text-muted-foreground">Discover and explore our book collection</p>
        </div>
        <Badge variant="secondary">{books?.length || 0} books</Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      
      {(!books || books.length === 0) && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground">No books found. Add your first book to get started!</p>
          </CardContent>
        </Card>
      )}
    </LayoutWithSidebar>
  )
}