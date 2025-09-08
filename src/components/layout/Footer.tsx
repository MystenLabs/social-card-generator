export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10">
      <img src="/footer.svg" alt="footer" className="pointer-events-none absolute bottom-0 left-0 z-0 z-20 w-full" />
      <div className="relative z-10 mx-auto min-h-24 w-full max-w-[1920px] px-5 py-6 lg:px-28 lg:py-9">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-center text-base font-medium md:text-left lg:text-2xl">SuiFest Card Generator App</div>
          <div className="flex items-center justify-center text-lg lg:text-2xl">
            <img src="/logo-sui.png" alt="logo Suifest" className="h-7" />
            <div className="mx-1 h-6 w-px bg-white sm:mx-2" aria-hidden="true" />
            <img src="/logo-walrus.png" alt="logo Sui" className="h-7" />
          </div>
        </div>
      </div>
    </footer>
  );
}
