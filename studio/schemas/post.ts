import { Rule } from 'sanity'
import blockContent from './blockContent'

export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(5).max(120).error('A title between 5 and 120 characters is required.')
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 96)
      },
      validation: (Rule: Rule) => Rule.required().error('A slug is required.')
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule: Rule) => Rule.max(200).warning('Keep excerpts concise (max 200 characters).')
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (Rule: Rule) => Rule.required().error('Body content is required.')
    },
    {
      name: 'featureImage',
      title: 'Feature Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for accessibility and SEO.',
          validation: (Rule: Rule) => Rule.required().error('Image alt text is required')
        }
      ],
      validation: (Rule: Rule) => Rule.required().error('Feature image is required.')
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (Rule: Rule) => Rule.required().min(1).error('At least one category is required.')
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error('Author is required.')
    },
    {
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required().error('Publish date is required.')
    },
    {
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: {
        list: [
          { title: 'Spanish', value: 'es' },
          { title: 'English', value: 'en' }
        ],
        layout: 'radio'
      },
      validation: (Rule: Rule) => Rule.required().error('Locale is required.')
    },
    {
      name: 'publishingControls',
      title: 'Publishing Controls',
      type: 'object',
      fields: [
        {
          name: 'readyForReview',
          title: 'Ready for Review',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'approved',
          title: 'Approved (Editor Only)',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'published',
          title: 'Published',
          type: 'boolean',
          initialValue: false
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      publishedAt: 'publishedAt',
      media: 'featureImage'
    },
    prepare(selection: any) {
      const { title, author, publishedAt, media } = selection
      return {
        title: title,
        subtitle: `${author ? 'By ' + author : ''}${publishedAt ? ' | ' + new Date(publishedAt).toLocaleDateString() : ''}`,
        media: media
      }
    }
  },
  // Role-based access logic (for reference, actual implementation is in Sanity config/permissions)
  // Only 'Autor' can create/edit their own drafts; only 'Editor' can approve/publish.
}
