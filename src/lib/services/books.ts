import { createServerSupabase } from "@/lib/supabase/server"

export interface Book {
  id: string
  title: string
  publication_date: string
  isbn: string
  authors: Array<{ name: string }>
  categories: Array<{ name: string }>
  image_url?: string
  alt_text?: string
}

export async function getBooks(): Promise<Book[]> {
  try {
    const supabase = createServerSupabase()
    
    console.log('🔍 Fetching all books from server...')
    
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

export async function getBookById(id: string): Promise<Book | null> {
  try {
    const supabase = createServerSupabase()
    
    console.log('🔍 Fetching book with ID:', id)
    
    const { data: rawBook, error } = await supabase
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
      .eq('id', id)
      .single()

    if (error) {
      console.error('❌ Error fetching book:', error)
      return null
    }

    if (!rawBook) {
      console.log('📭 Book not found')
      return null
    }

    console.log('✅ Book found:', rawBook.title)

    // Proper mapping
    const formatted: Book = {
      id: rawBook.id,
      title: rawBook.title,
      publication_date: rawBook.publication_date,
      isbn: rawBook.isbn,
      authors: rawBook.book_authors?.map((ba: any) => ba.authors) || [],
      categories: rawBook.book_categories_books?.map((bc: any) => bc.book_categories) || [],
      image_url: rawBook.book_images?.[0]?.image_url,
      alt_text: rawBook.book_images?.[0]?.alt_text,
    }

    return formatted
  } catch (error) {
    console.error('💥 Unexpected error in getBookById:', error)
    return null
  }
}
