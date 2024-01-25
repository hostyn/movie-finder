import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "./getQueryClient";
import { algolia } from "@/services/algolia";
import { Movie } from "@/types/algolia";
import Search from "@/components/Search";

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["search", ""],
    queryFn: () => algolia.search<Movie>(""),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <main className="flex min-h-screen flex-col items-center p-24 gap-8">
        <h1 className="text-6xl">Find a movie</h1>
        <Search />
      </main>
    </HydrationBoundary>
  );
}
