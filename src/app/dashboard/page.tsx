import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { createServerSupabase } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Book {
  id: string
  title: string
  publication_date: string
  isbn: string
  authors: Array<{ name: string }>
  categories: Array<{ name: string }>
  image_url?: string
  alt_text?: string
}

async function getBooks(): Promise<Book[]> {
  try {
    const supabase = createServerSupabase()
    
    console.log('🔍 Fetching books from server...')
    
    const { data: rawBooks, error } = await supabase
      .from('books')
      .select(`
        id,
        title,
        publication_date,
        isbn,
        book_authors ( authors ( name ) ),
        book_categories_books ( book_categories ( name ) ),
        book_images ( image_url, alt_text )
      `)

    if (error) {
      console.error('❌ Error fetching books:', error)
      return []
    }

    console.log('📚 Raw books data:', rawBooks?.length || 0, 'books found')

    if (!rawBooks || rawBooks.length === 0) {
      console.log('📭 No books found in database')
      return []
    }

    // Proper mapping
    const formatted = rawBooks.map((b: any) => ({
      id: b.id,
      title: b.title,
      publication_date: b.publication_date,
      isbn: b.isbn,
      authors: b.book_authors?.map((ba: any) => ba.authors) || [],
      categories: b.book_categories_books?.map((bc: any) => bc.book_categories) || [],
      image_url: b.book_images?.[0]?.image_url,
      alt_text: b.book_images?.[0]?.alt_text,
    }))

    console.log('✅ Formatted books:', formatted.length, 'books ready')
    return formatted
  } catch (error) {
    console.error('💥 Unexpected error in getBooks:', error)
    return []
  }
}

export default async function Page() {
  const books = await getBooks()

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Dashboard - Books
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Books Dashboard</h1>
              <p className="text-muted-foreground">Manage and view your book collection</p>
            </div>
            <Badge variant="secondary">{books.length} books</Badge>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <Card key={book.id} className="hover:shadow-md transition-shadow">
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
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}
