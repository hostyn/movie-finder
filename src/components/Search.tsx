"use client";

import { SearchResponse } from "@algolia/client-search";
import { algolia } from "@/services/algolia";
import { Movie } from "@/types/algolia";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function Search({ query }: { query: string }) {
  const [data, setData] = useState<null | SearchResponse<Movie>>(null);

  useEffect(() => {
    algolia.search<Movie>(query).then((data) => setData(data));
  }, [query]);

  return (
    <>
      {data?.hits.map((hit) => (
        <MovieCard key={hit.objectID} movie={hit} />
      ))}
    </>
  );
}
