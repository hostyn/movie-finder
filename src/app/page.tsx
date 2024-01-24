"use client";

import Input from "@/components/Input";
import Search from "@/components/Search";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8">
      <h1 className="text-6xl">Find a movie</h1>
      <Input
        placeholder="The Machinist"
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
      <Search query={query} />
    </main>
  );
}

// bg-[#1d1728] hover:bg-[radial-gradient(80px_80px_at_var(--position-x)_var(--position-y),#2d243e,transparent_100%)]
// bg-[#1d1728] bg-[radial-gradient(80px_80px_at_var(--position-x)_var(--position-y),#2d243e,transparent)]

// #2d243e
// #1d1728
