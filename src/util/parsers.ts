export const parseRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}min`;
};

export const parseRuntimeCompact = (runtime: number) => {
  if (runtime === 0) return "0m";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return (hours > 0 ? `${hours}h` : "") + (minutes > 0 ? `${minutes}m` : "");
};

export const parsePoster = (poster: string) => {
  const splitedPoster = poster.split(".");
  splitedPoster[splitedPoster.length - 2] = "_V1_FMwebp_UX250_QL80_";
  splitedPoster[splitedPoster.length - 1] = "webp";
  return splitedPoster.join(".");
};

export const parseNumVotes = Intl.NumberFormat("en-US", {
  notation: "compact",
}).format;
