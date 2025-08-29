"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center">
      <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
        Bukshare <span className="text-muted-foreground">başlıyor</span>
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
        Next.js + Tailwind + shadcn/ui ile hızlı prototipler oluştur.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Button size="lg">
          Başla <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg">
          Daha Fazla
        </Button>
      </div>
    </section>
  );
}
