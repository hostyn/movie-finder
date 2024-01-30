"use client";
import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps extends RadixSlider.SliderProps {
  value: number[];
  valueAriaLabels?: string[];
  transformValue?: (value: number) => string;
}

export default function Slider({
  value,
  valueAriaLabels,
  transformValue,
  className,
  ...props
}: SliderProps) {
  return (
    <div className="px-4">
      <RadixSlider.Root
        className={`relative flex items-center select-none touch-none w-full h-5 mt-[24px] ${className}`}
        value={value}
        {...props}
      >
        <RadixSlider.Track className="bg-[#2d243e] relative flex-grow rounded-full h-1">
          <RadixSlider.Range className="absolute bg-[#9158fa] rounded-full h-1" />
        </RadixSlider.Track>
        {value.map((value, i) => (
          <Thumb
            key={i}
            value={transformValue ? transformValue(value) : value}
            aria-label={valueAriaLabels?.[i]}
          />
        ))}
      </RadixSlider.Root>
    </div>
  );
}

const Thumb = ({
  value,
  ...props
}: RadixSlider.SliderThumbProps & { value: number | string }) => (
  <RadixSlider.Thumb
    className="block rounded-full size-5 transition-slider duration-75 bg-[#9158fa] outline-[#9158fa68] outline-4 focus:outline hover:bg-[#7345c9]"
    {...props}
  >
    <div className="flex flex-col absolute left-1/2 bottom-full -translate-x-1/2 pointer-events-none text-sm font-semibold">
      <span className="bg-[#3e246f] z-10 rounded-sm text-white leading-5 px-2 break-keep">
        {value}
      </span>
      <div className="bg-[#3e246f] size-[4px] relative left-1/2 -translate-x-1/2 -translate-y-[50%] scale-[1.41] rotate-45" />
    </div>
  </RadixSlider.Thumb>
);
