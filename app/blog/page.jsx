import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'
import Link from 'next/link'

export const metadata = {
  title: 'Blog | Himanshu Saini',
  description:
    'Thoughts on software engineering, web development, and building things on the internet.',
  openGraph: {
    title: 'Blog | Himanshu Saini',
    description:
      'Thoughts on software engineering, web development, and building things on the internet.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Himanshu Saini',
    description:
      'Thoughts on software engineering, web development, and building things on the internet.',
  },
  alternates: {
    canonical: '/blog',
  },
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPage() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const posts = await reader.collections.posts.all()

  const sorted = posts
    .filter((p) => p.entry.publishedAt)
    .sort((a, b) => new Date(b.entry.publishedAt) - new Date(a.entry.publishedAt))

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Blog</h1>
      <p className="text-gray-400 mb-12">
        Thoughts on software engineering, web development, and building things on the internet.
      </p>

      {sorted.length === 0 ? (
        <p className="text-gray-500 text-center py-16">No posts yet. Check back soon!</p>
      ) : (
        <ul className="space-y-10">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article>
                  <time
                    dateTime={post.entry.publishedAt}
                    className="text-sm text-gray-500 mb-1 block"
                  >
                    {formatDate(post.entry.publishedAt)}
                  </time>
                  <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors mb-2">
                    {post.entry.title}
                  </h2>
                  {post.entry.summary && (
                    <p className="text-gray-400 leading-relaxed">{post.entry.summary}</p>
                  )}
                  {post.entry.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
