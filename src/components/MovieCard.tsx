import { Movie } from "@/types/algolia";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div>
      <img src={movie.poster} alt={movie.primaryTitle} className="w-24" />
      <h1>{movie.primaryTitle}</h1>
    </div>
  );
}
