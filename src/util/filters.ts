import { GENRES, MAX_NUM_VOTES, MAX_YEAR, MIN_YEAR } from "@/config/constants";
import { Genre } from "@/types/algolia";
import { useSearchParams } from "next/navigation";

export interface Filters {
  [key: string]: number | string[] | undefined;
  minYear?: number;
  maxYear?: number;
  minRating?: number;
  maxRating?: number;
  minVotes?: number;
  minRuntime?: number;
  maxRuntime?: number;
  genres?: string[];
}

const getNumberOrUndefined = (
  value: string | undefined
): number | undefined => {
  if (value == null || value.length === 0) {
    return undefined;
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return undefined;
  }
  return parsed;
};

export const getStringOrFirstElement = (
  value: string | string[] | undefined
): string | undefined => {
  if (Array.isArray(value)) {
    return value[0]?.toString();
  }
  return value?.toString();
};

export const validateFilters = (filters: Filters): Filters => {
  return {
    minYear:
      filters.minYear == null ||
      filters.minYear <= MIN_YEAR ||
      filters.minYear > MAX_YEAR
        ? undefined
        : filters.minYear,
    maxYear:
      filters.maxYear == null ||
      filters.maxYear < MIN_YEAR ||
      filters.maxYear >= MAX_YEAR
        ? undefined
        : filters.maxYear,
    minVotes:
      filters.minRating == null ||
      filters.minRating <= 0 ||
      filters.minRating > MAX_NUM_VOTES ||
      filters.minRating % 10000 !== 0
        ? undefined
        : filters.minRating,
    minRating:
      filters.minRating == null ||
      filters.minRating <= 0 ||
      filters.minRating > 10 ||
      filters.minRating % 0.1 !== 0
        ? undefined
        : filters.minRating,
    maxRating:
      filters.maxRating == null ||
      filters.maxRating < 0 ||
      filters.maxRating >= 10 ||
      filters.maxRating % 0.1 !== 0
        ? undefined
        : filters.maxRating,
    minRuntime:
      filters.minRuntime == null ||
      filters.minRuntime <= 0 ||
      filters.minRuntime > 180 ||
      filters.minRuntime % 10 !== 0
        ? undefined
        : filters.minRuntime,
    maxRuntime:
      filters.maxRuntime == null ||
      filters.maxRuntime < 0 ||
      filters.maxRuntime > 180 ||
      filters.maxRuntime % 10 !== 0
        ? undefined
        : filters.maxRuntime,
    genres: filters.genres?.filter((genre) => GENRES.includes(genre as Genre)),
  };
};

export const getFiltersFromSearchParams = (searchParams: {
  [key: string]: string | string[] | undefined;
}): Filters => {
  return validateFilters({
    minYear: getNumberOrUndefined(
      getStringOrFirstElement(searchParams.minYear)
    ),
    maxYear: getNumberOrUndefined(
      getStringOrFirstElement(searchParams.maxYear)
    ),
    minRating: getNumberOrUndefined(
      getStringOrFirstElement(searchParams.minRating)
    ),
    maxRating: getNumberOrUndefined(
      getStringOrFirstElement(searchParams.maxRating)
    ),
    minVotes: getNumberOrUndefined(
      getStringOrFirstElement(searchParams.minVotes)
    ),
    minRuntime: getNumberOrUndefined(
      getStringOrFirstElement(searchParams.minRuntime)
    ),
    maxRuntime: getNumberOrUndefined(
      getStringOrFirstElement(searchParams.maxRuntime)
    ),
    genres: searchParams.genres?.toString().split(",") ?? [],
  });
};

export const useFilters = (): Filters => {
  const searchParams = useSearchParams();

  return validateFilters({
    minYear: getNumberOrUndefined(
      searchParams.getAll("minYear")?.[0]?.toString() || undefined
    ),
    maxYear: getNumberOrUndefined(
      searchParams.getAll("maxYear")?.[0]?.toString() || undefined
    ),
    minRating: getNumberOrUndefined(
      searchParams.getAll("minRating")?.[0]?.toString() || undefined
    ),
    maxRating: getNumberOrUndefined(
      searchParams.getAll("maxRating")?.[0]?.toString() || undefined
    ),
    minVotes: getNumberOrUndefined(
      searchParams.getAll("minVotes")?.[0]?.toString() || undefined
    ),
    minRuntime: getNumberOrUndefined(
      searchParams.getAll("minRuntime")?.[0]?.toString() || undefined
    ),
    maxRuntime: getNumberOrUndefined(
      searchParams.getAll("maxRuntime")?.[0]?.toString() || undefined
    ),
    genres: searchParams.getAll("genres")?.toString().split(",") ?? [],
  });
};

export const constructFilters = (filters: Filters): string => {
  const algoliaFilters: string[] = [];

  filters.minYear && algoliaFilters.push(`year >= ${filters.minYear}`);
  filters.maxYear && algoliaFilters.push(`year <= ${filters.maxYear}`);
  filters.minRating &&
    algoliaFilters.push(`averageRating >= ${filters.minRating}`);
  filters.maxRating &&
    algoliaFilters.push(`averageRating <= ${filters.maxRating}`);
  filters.minVotes && algoliaFilters.push(`numVotes >= ${filters.minVotes}`);
  filters.minRuntime &&
    algoliaFilters.push(`runtimeMinutes >= ${filters.minRuntime}`);
  filters.maxRuntime &&
    algoliaFilters.push(`runtimeMinutes <= ${filters.maxRuntime}`);

  if (filters.genres?.length) {
    algoliaFilters.push(
      `(${filters.genres.map((genre) => `genres:${genre}`).join(" OR ")})`
    );
  }

  return algoliaFilters.join(" AND ");
};

export const objectToQueryParams = (obj: {
  [key: string]: string | string[] | number | undefined;
}) => {
  return Object.keys(obj)
    .map((key) => {
      const value = obj[key];
      if (value == null) return;
      if (Array.isArray(value) && value.length === 0) {
        return;
      }
      return (
        encodeURIComponent(key) + "=" + encodeURIComponent(value.toString())
      );
    })
    .filter((key) => key != null)
    .join("&");
};
