export default function Home() {
  return (
    <>
      <header className="fixed bg-white inset-x-0 top-0 z-10 border-b border-black/5 dark:border-white/10">
        <nav className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
          <div className="flex items-center">
            <img src="./logo.png" alt="" className="w-40" />
          </div>
          <div className="flex items-center gap-3">
            <a className="text-sm/6 text-gray-950 dark:text-white" href="/docs">
              Docs
            </a>
            <a className="text-sm/6 text-gray-950 dark:text-white" href="/docs">
              Features
            </a>
            <a className="text-sm/6 text-gray-950 dark:text-white" href="/docs">
              Pricing
            </a>
            <a className="text-sm/6 text-gray-950 dark:text-white" href="/docs">
              About
            </a>
          </div>
        </nav>
      </header>
      <div className="bg-[url(/home.jpg)] min-h-140 bg-cover flex items-end">
        <div className="bg-amber-950/50 mx-5 p-7 rounded-lg max-w-180 mb-10">
          <div className="md:text-5xl text-2xl text-white">
            ERP: Powering Progress. Simplifying Business.
          </div>
          <p className="text-white py-7 max-md:text-sm">
            ERP unifies your business — automating tasks, streamlining
            operations, and delivering real-time insights. It breaks down silos,
            boosts efficiency, and empowers smart decisions. More than software,
            ERP is your strategic edge for growth, agility, and lasting success.
          </p>
          <div className="flex gap-3">
            <span className="bg-amber-950 text-white rounded-lg px-3 py-2">
              Login
            </span>
            <span className="bg-amber-950 text-white rounded-lg px-3 py-2">
              Register
            </span>
            <span className="bg-amber-950 text-white rounded-lg px-3 py-2">
              Learn more
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
