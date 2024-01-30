export interface Movie {
  objectID: string;
  primaryTitle: string;
  originalTitle: string;
  year: number;
  genres: Genre[];
  averageRating: number | null;
  numVotes: number;
  poster: string | null;
  runtimeMinutes: number | null;
}

export type Genre =
  | "Action"
  | "Adult"
  | "Adventure"
  | "Animation"
  | "Biography"
  | "Comedy"
  | "Crime"
  | "Documentary"
  | "Drama"
  | "Family"
  | "Fantasy"
  | "Film-Noir"
  | "Game-Show"
  | "History"
  | "Horror"
  | "Music"
  | "Musical"
  | "Mystery"
  | "News"
  | "Reality-TV"
  | "Romance"
  | "Sci-Fi"
  | "Short"
  | "Sport"
  | "Talk-Show"
  | "Thriller"
  | "War"
  | "Western";
