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
