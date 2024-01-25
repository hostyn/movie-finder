"use client";

import { algolia } from "@/services/algolia";
import { Movie } from "@/types/algolia";
import MovieCard from "./MovieCard";
import { useQuery } from "@tanstack/react-query";
import Input from "./Input";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const { data } = useQuery({
    queryKey: ["search", query],
    queryFn: () => algolia.search<Movie>(query),
  });

  console.log(data);

  return (
    <div className="flex flex-col items-center gap-8">
      <Input
        placeholder="The Machinist"
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />

      <div className="grid grid-cols-4 gap-4">
        {data?.hits.map((hit) => (
          <MovieCard key={hit.objectID} movie={hit} />
        ))}
      </div>
    </div>
  );
}
