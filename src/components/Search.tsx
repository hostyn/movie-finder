"use client";

import { algolia } from "@/services/algolia";
import { Movie } from "@/types/algolia";
import MovieCard from "./MovieCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import Input from "./Input";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowUpIcon, ErrorIcon, SearchIcon } from "./icons";
import Loading from "./Loading";
import { useSearchParams, useRouter } from "next/navigation";
import {
  constructFilters,
  objectToQueryParams,
  useFilters,
} from "@/util/filters";

export default function Search() {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const filters = useFilters();

  const [query, setQuery] = useState(
    searchParams.getAll("q")?.[0]?.toString() || ""
  );

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["search", query, constructFilters(filters)],
      queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
        algolia.search<Movie>(query, {
          page: pageParam,
          filters: constructFilters(filters),
        }),
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
        onBlur={() =>
          push(`/?${objectToQueryParams({ q: query, ...filters })}`)
        }
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
          <div className="flex justify-between w-full text-slate-300">
            <span className="flex text-lg font-bold gap-2 items-center ">
              <SearchIcon className="text-md" />
              Search results
            </span>
            <p className="font-bold">
              {data?.pages[0].nbHits} hits in {data?.pages[0].processingTimeMS}
              ms
            </p>
          </div>
          <InfiniteScroll
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
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
