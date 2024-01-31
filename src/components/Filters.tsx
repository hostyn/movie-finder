"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CloseIcon, FilterIcon } from "./icons";
import Slider from "./Slider";
import { parseRuntimeCompact } from "@/util/parsers";
import { GENRES, MAX_NUM_VOTES, MAX_YEAR, MIN_YEAR } from "@/config/constants";
import { Genre } from "@/types/algolia";
import {
  objectToQueryParams,
  useFilters,
  validateFilters,
} from "@/util/filters";
import { useRouter } from "next/navigation";

export function FilterTrigger() {
  return (
    <Dialog.Trigger asChild>
      <button
        title="Filters"
        className="z-10 rounded-full text-[#565c7a] outline outline-8 outline-transparent transition-colors hover:bg-[#1d1728] hover:outline-[#1d1728]"
      >
        <FilterIcon />
      </button>
    </Dialog.Trigger>
  );
}

export function FilterPortal() {
  const currentFilters = useFilters();
  const { push } = useRouter();
  const searchParams = new URLSearchParams(window.location.search);

  const [year, setYear] = useState([
    currentFilters.minYear ?? MIN_YEAR,
    currentFilters.maxYear ?? MAX_YEAR,
  ]);
  const [runtime, setRuntime] = useState([
    currentFilters.minRuntime ?? 0,
    currentFilters.maxRuntime ?? 190,
  ]);
  const [genres, setGenres] = useState<Genre[]>(currentFilters.genres ?? []);
  const [rating, setRating] = useState([
    currentFilters.minRating ?? 0,
    currentFilters.maxRating ?? 10,
  ]);
  const [minVotes, setMinVotes] = useState([currentFilters.minVotes ?? 0]);

  const handleGenreClick = (genre: Genre) => {
    if (genres.includes(genre)) {
      setGenres((prev) => prev.filter((g) => g !== genre));
    } else {
      setGenres((prev) => [...prev, genre]);
    }
  };

  const handleSave = () => {
    const newFilters = validateFilters({
      minYear: year[0],
      maxYear: year[1],
      minRuntime: runtime[0],
      maxRuntime: runtime[1],
      genres,
      minRating: rating[0],
      maxRating: rating[1],
      minVotes: minVotes[0],
    });

    push(
      `/?${objectToQueryParams({
        q: searchParams.getAll("q")?.[0]?.toString() || undefined,
        ...newFilters,
      })}`
    );
  };

  const handleRestoreDefault = () => {
    setYear([MIN_YEAR, MAX_YEAR]);
    setRuntime([0, 190]);
    setGenres([]);
    setRating([0, 10]);
    setMinVotes([0]);
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-10 bg-slate-400/50 opacity-100 data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show " />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-20 flex max-h-full w-[512px] max-w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-md bg-slate-900 p-6 shadow-md data-[state=closed]:animate-content-hide data-[state=open]:animate-content-show ">
        <Dialog.Title className="flex gap-2 text-lg font-bold">
          <FilterIcon /> Filters
        </Dialog.Title>
        <div className="flex flex-col gap-8 max-w-full overflow-y-auto">
          <Fieldset name="rating">
            <Slider
              value={rating}
              onValueChange={setRating}
              min={0}
              max={10}
              step={0.1}
            />
          </Fieldset>

          <Fieldset name="votes">
            <Slider
              value={minVotes}
              onValueChange={setMinVotes}
              min={0}
              max={MAX_NUM_VOTES}
              step={10000}
              transformValue={(value) => {
                if (value === 0) return "0+";
                return `${value / 1000}K+`;
              }}
            />
          </Fieldset>

          <Fieldset name="genre">
            <div className="flex flex-wrap gap-[10px] px-1">
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  className={`rounded-full px-2 text-slate-400 outline outline-2 outline-slate-400 transition-genre hover:bg-[#9158fa2f] hover:outline-[#9158fa2f] focus-visible:outline-4 focus-visible:outline-[#9158fa9c] ${
                    genres.includes(genre) &&
                    "!hover:bg-transparent !text-[#9158fa] !outline-[#9158fa] "
                  } `}
                  onClick={() => handleGenreClick(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </Fieldset>

          <Fieldset name="year">
            <Slider
              value={year}
              onValueChange={setYear}
              min={MIN_YEAR}
              max={MAX_YEAR}
            />
          </Fieldset>

          <Fieldset name="runtime">
            <Slider
              value={runtime}
              onValueChange={setRuntime}
              min={0}
              max={190}
              step={10}
              transformValue={(value) => {
                if (value > 180) {
                  return "∞";
                }
                return parseRuntimeCompact(value);
              }}
            />
          </Fieldset>
          <div className="flex justify-between">
            <button
              className="text-red-400 outline-red-400 outline-1 outline -outline-offset-1 rounded-md px-4 py-1 hover:outline-red-500/25 hover:outline-0 hover:bg-red-500/25 hover:text-white transition-genre duration-75 focus-visible:outline-4  focus-visible:-outline-offset-4 focus-visible:outline-red-400"
              onClick={handleRestoreDefault}
            >
              Restore default
            </button>
            <Dialog.Close asChild>
              <button
                className="text-green-400 outline-green-400 outline-1 outline -outline-offset-1 rounded-md px-4 py-1 hover:outline-green-500/25 hover:outline-0 hover:bg-green-500/25 hover:text-white transition-genre duration-75 focus-visible:outline-4  focus-visible:-outline-offset-4 focus-visible:outline-green-400"
                onClick={handleSave}
              >
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="absolute right-7 top-7" aria-label="Close">
              <CloseIcon />
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

function Fieldset({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <label className="text-sm font-extrabold uppercase tracking-tighter text-slate-200">
        {name}
      </label>
      {children}
    </fieldset>
  );
}
