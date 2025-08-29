"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data: session } = await supabase.auth.getSession()
      if (!mounted) return
      if (!session.session) {
        router.replace("/login")
        return
      }
      const { data: userData } = await supabase.auth.getUser()
      setEmail(userData.user?.email ?? null)
      setLoading(false)
    })()
    return () => { mounted = false }
  }, [router])

  async function signOut() {
    await supabase.auth.signOut()
    router.replace("/login")
  }

  if (loading) return <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">Yükleniyor…</div>

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Hoş geldin{email ? `, ${email}` : ""} 👋</h1>
      <p className="mt-2 text-muted-foreground">
        Başarıyla giriş yaptın. Buradan dashboard’a geçebilir veya çıkış yapabilirsin.
      </p>

      <div className="mt-6 flex gap-3">
        <Button onClick={() => router.push("/dashboard")}>Dashboard’a git</Button>
        <Button variant="outline" onClick={signOut}>Çıkış Yap</Button>
      </div>
    </main>
  )
}
