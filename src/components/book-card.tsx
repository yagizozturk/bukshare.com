import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Book } from "@/lib/services/books"

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ç/g, 'c')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

interface BookCardProps {
  book: Book
  className?: string
}

export function BookCard({ book, className = "" }: BookCardProps) {
  const cardContent = (
    <Card className={`hover:shadow-md transition-shadow cursor-pointer ${className}`}>
      <CardHeader>
        <CardTitle className="line-clamp-2">{book.title}</CardTitle>
        <CardDescription className="line-clamp-1">
          {book.authors.map(author => author.name).join(', ')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {book.image_url && (
            <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-muted">
              <img 
                src={book.image_url} 
                alt={book.alt_text || book.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            {book.categories.map((category) => (
              <Badge key={category.name} variant="outline" className="text-xs">
                {category.name}
              </Badge>
            ))}
            {book.publication_date && (
              <Badge variant="secondary" className="text-xs">
                {new Date(book.publication_date).getFullYear()}
              </Badge>
            )}
          </div>
          {book.isbn && (
            <p className="text-xs text-muted-foreground">
              ISBN: {book.isbn}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Link href={`/books/${book.id}`}>
      {cardContent}
    </Link>
  )
}
