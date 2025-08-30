import { supabase } from "@/lib/supabase/client"
import { Book } from "@/lib/services/books"

export async function fetchBooks(): Promise<Book[]> {
  console.log("fetching books");
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
    throw new Error(`Failed to fetch books: ${error.message}`)
  }

  if (!rawBooks || rawBooks.length === 0) {
    return []
  }

  return rawBooks.map((b: any) => ({
    id: b.id,
    title: b.title,
    publication_date: b.publication_date,
    isbn: b.isbn,
    authors: b.book_authors?.map((ba: any) => ba.authors) || [],
    categories: b.book_categories_books?.map((bc: any) => bc.book_categories) || [],
    image_url: b.book_images?.[0]?.image_url,
    alt_text: b.book_images?.[0]?.alt_text,
  }))
}

export async function fetchBookById(id: string): Promise<Book> {
  console.log("fetching book by id", id);
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
    throw new Error(`Failed to fetch book: ${error.message}`)
  }

  if (!rawBook) {
    throw new Error('Book not found')
  }

  return {
    id: rawBook.id,
    title: rawBook.title,
    publication_date: rawBook.publication_date,
    isbn: rawBook.isbn,
    authors: rawBook.book_authors?.map((ba: any) => ba.authors) || [],
    categories: rawBook.book_categories_books?.map((bc: any) => bc.book_categories) || [],
    image_url: rawBook.book_images?.[0]?.image_url,
    alt_text: rawBook.book_images?.[0]?.alt_text,
  }
}
