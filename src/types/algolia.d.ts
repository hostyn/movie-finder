export interface Movie {
  objectID: string;
  primaryTitle: string;
  originalTitle: string;
  year: number;
  genres: string[];
  averageRating: number | null;
  numVotes: number;
  poster: string | null;
  runtimeMinutes: number | null;
}
