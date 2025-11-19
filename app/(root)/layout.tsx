import Navbar from "@/components/Navbar"
import { Suspense } from "react"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="font-work-sans">
        <Suspense fallback={
            <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
                <nav className="flex justify-between items-center">
                    <div className="w-[144px] h-[30px] bg-gray-200 animate-pulse rounded" />
                    <div className="w-20 h-6 bg-gray-200 animate-pulse rounded" />
                </nav>
            </header>
        }>
            <Navbar />
        </Suspense>
            {children}
        </main>
    )
}