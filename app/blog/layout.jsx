import Link from 'next/link'

export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 sticky top-0 z-10 bg-gray-950/90 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          >
            ← Portfolio
          </Link>
          <Link href="/blog" className="font-semibold text-white">
            Blog
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-12">{children}</main>
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Himanshu Saini
        </div>
      </footer>
    </div>
  )
}
