import { algolia } from "@/services/algolia";
import { Movie } from "@/types/algolia";
import MovieCard from "./MovieCard";
import { useQuery } from "@tanstack/react-query";

export default function Search({ query }: { query: string }) {
  const { data } = useQuery({
    queryKey: ["search", query],
    queryFn: () => algolia.search<Movie>(query),
  });

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.hits.map((hit) => (
        <MovieCard key={hit.objectID} movie={hit} />
      ))}
    </div>
  );
}
