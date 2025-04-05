export default function Home(){
    return(
        <>
        <header className="fixed inset-x-0 top-0 z-10 border-b border-black/5 dark:border-white/10">
            <nav className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
                <div className="flex items-center">
                    <img src="./logo.png" alt="" className="w-40" />
                </div>
                <div className="flex items-center">
                <a className="text-sm/6 text-gray-950 dark:text-white" href="/docs">Docs</a>
                <a className="text-sm/6 text-gray-950 dark:text-white" href="/docs">Features</a>
                </div>
            </nav>
        </header>
        </>
    )
}