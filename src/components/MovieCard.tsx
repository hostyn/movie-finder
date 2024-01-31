import { Movie } from "@/types/algolia";
import { NoPhotoIcon, StarIcon } from "./icons";
import { parseNumVotes, parsePoster, parseRuntime } from "@/util/parsers";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <a
      href={`https://www.imdb.com/title/${movie.objectID}`}
      target="_blank"
      className="flex flex-col w-64 p-2 hover:bg-[#1d1728] rounded-lg transition [&>div]:hover:scale-95"
    >
      <div className="flex flex-col gap-2 transition-all">
        <div className="w-full rounded-lg aspect-[2/3] bg-slate-600 flex items-center justify-center">
          {movie.poster != null ? (
            <img
              src={parsePoster(movie.poster)}
              alt={movie.primaryTitle}
              className="w-full rounded-lg aspect-[2/3] object-cover object-center"
            />
          ) : (
            <NoPhotoIcon className="text-slate-300 text-xl" />
          )}
        </div>
        <div>
          <h2 className="font-bold">{movie.primaryTitle}</h2>
          <div className="flex justify-between items-center">
            <p className="text-slate-400 font-bold text-sm">
              {movie.year}
              {movie.runtimeMinutes &&
                ` · ${parseRuntime(movie.runtimeMinutes)}`}
            </p>
            <div className="flex">
              <StarIcon className="text-yellow-500" />
              <span className="flex items-center gap-1 font-bold">
                {movie.averageRating ?? "-"}
                <span className="text-slate-400 text-sm">
                  / {parseNumVotes(movie.numVotes)}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {movie.genres?.map((genre) => (
            <span
              key={genre}
              className="whitespace-nowrap text-sm rounded-md border-slate-400 border-[1px] text-slate-400 px-2"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
