import { useQuery } from "@tanstack/react-query"
import { fetchBooks, fetchBookById } from "@/lib/api/books"
import { Book } from "@/lib/services/books"

export function useBooks() {
  return useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: fetchBooks,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000 // 10 minutes
  })
}

export function useBook(id: string) {
  return useQuery<Book>({
    queryKey: ['book', id],
    queryFn: () => fetchBookById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes for individual books
  })
}
