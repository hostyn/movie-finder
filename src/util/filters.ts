import { useSearchParams } from "next/navigation";

interface Filters {
  [key: string]: string | string[] | undefined;
  minYear?: string;
  maxYear?: string;
  minRating?: string;
  maxRating?: string;
  minVotes?: string;
  minRuntime?: string;
  maxRuntime?: string;
  genres?: string[];
}

export const getStringOrFirstElement = (
  value: string | string[] | undefined
): string | undefined => {
  if (Array.isArray(value)) {
    return value[0]?.toString();
  }
  return value?.toString();
};

export const getFiltersFromSearchParams = (searchParams: {
  [key: string]: string | string[] | undefined;
}): Filters => {
  return {
    minYear: getStringOrFirstElement(searchParams.minYear),
    maxYear: getStringOrFirstElement(searchParams.maxYear),
    minRating: getStringOrFirstElement(searchParams.minRating),
    maxRating: getStringOrFirstElement(searchParams.maxRating),
    minVotes: getStringOrFirstElement(searchParams.minVotes),
    minRuntime: getStringOrFirstElement(searchParams.minRuntime),
    maxRuntime: getStringOrFirstElement(searchParams.maxRuntime),
    genres: searchParams.genres?.toString().split(","),
  };
};

export const useFilters = (): Filters => {
  const searchParams = useSearchParams();

  return {
    minYear: searchParams.getAll("minYear")?.[0]?.toString() || undefined,
    maxYear: searchParams.getAll("maxYear")?.[0]?.toString() || undefined,
    minRating: searchParams.getAll("minRating")?.[0]?.toString() || undefined,
    maxRating: searchParams.getAll("maxRating")?.[0]?.toString() || undefined,
    minVotes: searchParams.getAll("minVotes")?.[0]?.toString() || undefined,
    minRuntime: searchParams.getAll("minRuntime")?.[0]?.toString() || undefined,
    maxRuntime: searchParams.getAll("maxRuntime")?.[0]?.toString() || undefined,
    genres: searchParams.getAll("genres")?.toString().split(","),
  };
};

export const constructFilters = (filters: Filters): string => {
  const algoliaFilters: string[] = [];

  if (
    (filters.minYear?.length ?? 0) > 0 &&
    !Number.isNaN(Number(filters.minYear))
  ) {
    algoliaFilters.push(`year >= ${filters.minYear}`);
  }

  if (
    (filters.maxYear?.length ?? 0) > 0 &&
    !Number.isNaN(Number(filters.maxYear))
  ) {
    algoliaFilters.push(`year <= ${filters.maxYear}`);
  }

  if (
    (filters.minRating?.length ?? 0) > 0 &&
    !Number.isNaN(Number(filters.minRating))
  ) {
    algoliaFilters.push(`averageRating >= ${filters.minRating}`);
  }

  if (
    (filters.maxRating?.length ?? 0) > 0 &&
    !Number.isNaN(Number(filters.maxRating))
  ) {
    algoliaFilters.push(`averageRating <= ${filters.maxRating}`);
  }

  if (
    (filters.minVotes?.length ?? 0) > 0 &&
    !Number.isNaN(Number(filters.minVotes))
  ) {
    algoliaFilters.push(`numVotes >= ${filters.minVotes}`);
  }

  if (
    (filters.minRuntime?.length ?? 0) > 0 &&
    !Number.isNaN(Number(filters.minRuntime))
  ) {
    algoliaFilters.push(`runtimeMinutes >= ${filters.minRuntime}`);
  }

  if (
    (filters.maxRuntime?.length ?? 0) > 0 &&
    !Number.isNaN(Number(filters.maxRuntime))
  ) {
    algoliaFilters.push(`runtimeMinutes <= ${filters.maxRuntime}`);
  }

  if (filters.genres?.length) {
    algoliaFilters.push(
      `(${filters.genres.map((genre) => `genres:${genre}`).join(" OR ")})`
    );
  }

  return algoliaFilters.join(" AND ");
};

type SearchParams = { [key: string]: string | string[] | undefined };

interface QueryParamsObject {
  [key: string]: string | string[] | undefined;
}

export const objectToQueryParams = (obj: {
  [key: string]: string | string[] | undefined;
}) => {
  return Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .map((key) => {
      const value = obj[key];
      if (value != null) {
        return (
          encodeURIComponent(key) + "=" + encodeURIComponent(value.toString())
        );
      }
    })
    .join("&");
};
