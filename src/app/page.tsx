import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "./getQueryClient";
import { algolia } from "@/services/algolia";
import { Movie } from "@/types/algolia";
import Search from "@/components/Search";
import {
  constructFilters,
  getFiltersFromSearchParams,
  getStringOrFirstElement,
} from "@/util/filters";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const q = getStringOrFirstElement(searchParams.q) ?? "";
  const filters = constructFilters(getFiltersFromSearchParams(searchParams));

  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["search", q, filters],
    queryFn: ({ pageParam }) =>
      algolia.search<Movie>(q, { page: pageParam, filters }),
    initialPageParam: 0,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <main className="flex min-h-screen flex-col items-center p-4 py-12 md:p-12 lg:p-24 gap-8">
        <h1 className="text-4xl font-nunito-sans font-bold max-w-[20ch] text-pretty text-center">
          What would you like to watch?
        </h1>
        <Search />
      </main>
    </HydrationBoundary>
  );
}
