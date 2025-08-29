import { getBooks } from "@/lib/services/books"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookCard } from "@/components/book-card"
import { LayoutWithSidebar } from "@/components/layout-with-sidebar"

export default async function Page() {
  const books = await getBooks()

  return (
    <LayoutWithSidebar breadcrumbTitle="Dashboard - Books">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {books.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground">No books found. Add your first book to get started!</p>
            <p className="text-xs text-muted-foreground mt-2">Check server logs for debugging info</p>
          </CardContent>
        </Card>
      )}
    </LayoutWithSidebar>
  )
}
