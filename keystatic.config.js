import { config, collection, fields } from '@keystatic/core'

const isDev = process.env.NODE_ENV === 'development'

export default config({
  storage: isDev
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: {
          owner: 'Misterr-H',
          name: 'AwesomePortfolio',
        },
      },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      columns: ['title', 'publishedAt'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedAt: fields.date({
          label: 'Published At',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        summary: fields.text({
          label: 'Summary',
          description:
            'Used for meta description and post cards. Keep under 160 characters.',
          multiline: true,
          validation: { isRequired: true },
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        content: fields.mdx({ label: 'Content' }),
      },
    }),
  },
})
