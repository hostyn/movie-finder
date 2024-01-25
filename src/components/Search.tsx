"use client";

import { algolia } from "@/services/algolia";
import { Movie } from "@/types/algolia";
import MovieCard from "./MovieCard";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Input from "./Input";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      algolia.search<Movie>(query, { page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.page === lastPage.nbPages - 1 ? undefined : lastPage.page + 1,
    initialPageParam: 0,
  });

  return (
    <div className="flex flex-col items-center gap-8">
      <Input
        placeholder="The Machinist"
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />

      <p>
        Got {data?.pages[0].nbHits} hits in {data?.pages[0].processingTimeMS}ms
      </p>

      <div className="grid grid-cols-4 gap-4">
        {data?.pages.map((page) =>
          page?.hits.map((hit) => <MovieCard key={hit.objectID} movie={hit} />)
        )}
      </div>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load more</button>
      )}
    </div>
  );
}
