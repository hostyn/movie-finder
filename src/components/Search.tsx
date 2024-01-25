"use client";

import { algolia } from "@/services/algolia";
import { Movie } from "@/types/algolia";
import MovieCard from "./MovieCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import Input from "./Input";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowUpIcon, ErrorIcon } from "./icons";
import Loading from "./Loading";

export default function Search() {
  const [query, setQuery] = useState("");
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
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

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div className="col-span-full flex flex-col items-center pt-8 gap-4 justify-center">
          <ErrorIcon className="text-xl" />
          <p>Error!? What happened?? 🤯</p>
        </div>
      ) : (
        <>
          <p>
            {data?.pages[0].nbHits} hits in {data?.pages[0].processingTimeMS}ms
          </p>
          <InfiniteScroll
            className="grid grid-cols-4 gap-4"
            dataLength={
              data?.pages.reduce((prev, curr) => curr.hits.length + prev, 0) ??
              0
            }
            hasMore={hasNextPage}
            next={fetchNextPage}
            loader={<Loading />}
            endMessage={
              <div className="col-span-full flex flex-col items-center pt-8 gap-4 justify-center">
                <i
                  title="Scroll to top"
                  className="text-xl cursor-pointer"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <ArrowUpIcon />
                </i>
                <p className="font-bold">Yay! You have seen it all! 🎉</p>
              </div>
            }
          >
            {data?.pages.map((page) =>
              page?.hits.map((hit) => (
                <MovieCard key={hit.objectID} movie={hit} />
              ))
            )}
          </InfiniteScroll>
        </>
      )}
    </div>
  );
}
