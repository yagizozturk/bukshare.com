import { getBookById, Book } from "@/lib/services/books"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Tag, Hash } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BookPageProps {
  params: {
    id: string
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const book = await getBookById(params.id)

  if (!book) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {book.image_url ? (
            <div className="aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-lg bg-muted">
              <img 
                src={book.image_url} 
                alt={book.alt_text || book.title}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-[3/4] w-full max-w-md mx-auto bg-muted rounded-lg flex items-center justify-center">
              <div className="text-muted-foreground text-center">
                <Hash className="h-12 w-12 mx-auto mb-2" />
                <p>No image available</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            {book.authors.length > 0 && (
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <User className="h-4 w-4" />
                <span>{book.authors.map(author => author.name).join(', ')}</span>
              </div>
            )}
          </div>

          {book.publication_date && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Published: {new Date(book.publication_date).toLocaleDateString()}
              </span>
            </div>
          )}

          {book.categories.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Categories:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {book.categories.map((category) => (
                  <Badge key={category.name} variant="secondary">
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {book.isbn && (
            <div className="space-y-2">
              <span className="text-sm font-medium">ISBN:</span>
              <p className="text-sm text-muted-foreground font-mono bg-muted px-3 py-2 rounded">
                {book.isbn}
              </p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button className="flex-1">
              Add to Library
            </Button>
            <Button variant="outline" className="flex-1">
              Share Book
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center text-muted-foreground py-8">
            <p>Related books will appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
