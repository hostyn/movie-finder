export default function Loading() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center overflow-hidden pt-8 gap-4">
      <div
        className="inline-block size-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      />
      <p className="max-w-[40ch] text-balance text-center">
        Searching at warp speed! If you&apos;re seeing this, you&apos;ve
        outpaced the internet. 🚀🌐
      </p>
    </div>
  );
}
