import { Movie } from "@/types/algolia";

interface MovieCardProps {
  movie: Movie;
}

const parseRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}min`;
};

const parsePoster = (poster: string) => {
  const splitedPoster = poster.split(".");
  splitedPoster[splitedPoster.length - 2] = "_V1_FMwebp_UX250_QL80_";
  splitedPoster[splitedPoster.length - 1] = "webp";
  return splitedPoster.join(".");
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="flex flex-col w-48 p-2 hover:bg-[#1d1728] rounded-lg transition [&>div]:hover:scale-95">
      <div className="flex flex-col gap-4 transition-all">
        <img
          src={parsePoster(movie.poster)}
          alt={movie.primaryTitle}
          className="w-full rounded-lg aspect-[2/3] object-fill bg-slate-600 object-center"
        />
        <div>
          <h2 className="font-bold">{movie.primaryTitle}</h2>
          <p>
            {movie.year} · {parseRuntime(movie.runtimeMinutes)}
          </p>
        </div>
      </div>
    </article>
  );
}
