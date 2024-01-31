"use client";

import { useRef, useState } from "react";
import { SearchIcon } from "./icons";
import { Root as FilterRoot } from "@radix-ui/react-dialog";
import { FilterPortal, FilterTrigger } from "./Filters";

export default function Input({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const inputRef = useRef<HTMLLabelElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLLabelElement>) => {
    const input = inputRef.current;
    if (!input) return;

    const rect = input.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <FilterRoot>
      <label
        ref={inputRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex w-full cursor-text items-center gap-2 overflow-hidden rounded-full bg-[#1d1728] px-3 py-4 text-slate-300 transition duration-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-[#8678F9] focus-within:ring-offset-2 focus-within:ring-offset-slate-950 sm:gap-4 sm:px-6 lg:w-[32rem]"
        style={{
          background: isFocused ? "#2d243e" : "#1d1728",
        }}
      >
        <div
          className="pointer-events-none absolute inset-px rounded-full transition duration-300"
          style={{
            opacity: isFocused ? 0 : opacity,
            background: `radial-gradient(100px 800px at ${position.x}px ${position.y}px, #2d243e 45%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(80px 800px at ${position.x}px ${position.y}px, black 45%, transparent)`,
            border: "1px solid #8678F9",
          }}
        />
        <SearchIcon className="z-10 text-[#565c7a]" />
        <input
          className="z-10 w-full bg-transparent text-xl placeholder:text-[#565c7a] focus:outline-none"
          {...props}
        />
        <FilterTrigger />
      </label>
      <FilterPortal />
    </FilterRoot>
  );
}
