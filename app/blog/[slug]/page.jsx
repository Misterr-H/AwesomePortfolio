import { createReader } from '@keystatic/core/reader'
import { MDXRemote } from 'next-mdx-remote/rsc'
import keystaticConfig from '../../../keystatic.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'

const SITE_URL = 'https://himanshu-saini.com'

const reader = createReader(process.cwd(), keystaticConfig)

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const post = await reader.collections.posts.read(params.slug)
  if (!post) return {}

  const title = `${post.title} | Himanshu Saini`
  const description = post.summary || ''
  const url = `${SITE_URL}/blog/${params.slug}`
  const ogImage = post.coverImage
    ? `${SITE_URL}${post.coverImage}`
    : `${SITE_URL}/images/og-default.png`

  return {
    title,
    description,
    authors: [{ name: 'Himanshu Saini', url: SITE_URL }],
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      publishedTime: post.publishedAt,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPostPage({ params }) {
  const post = await reader.collections.posts.read(params.slug)
  if (!post) notFound()

  // post.content is () => Promise<string> — call it to get the raw MDX string
  const content = await post.content()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary || '',
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Himanshu Saini',
      url: SITE_URL,
    },
    url: `${SITE_URL}/blog/${params.slug}`,
    ...(post.coverImage && { image: `${SITE_URL}${post.coverImage}` }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Header */}
        <header className="mb-10">
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-4xl font-bold leading-tight mb-4">{post.title}</h1>
          {post.summary && (
            <p className="text-lg text-gray-400 leading-relaxed mb-4">{post.summary}</p>
          )}
          <time dateTime={post.publishedAt} className="text-sm text-gray-500">
            {formatDate(post.publishedAt)}
          </time>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* MDX Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-400 prose-code:text-blue-300 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800">
          <MDXRemote source={content} />
        </div>
      </article>
    </>
  )
}
