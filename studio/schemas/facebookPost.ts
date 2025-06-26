import { Rule } from 'sanity'
import blockContent from './blockContent'

export default {
  name: 'facebookPost',
  title: 'Facebook Post',
  type: 'document',
  fields: [
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (Rule: Rule) => Rule.required().error('Body is required.')
    },
    {
      name: 'image',
      title: 'Image (optional)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for accessibility and SEO.',
          validation: (Rule: Rule) => Rule.custom((alt, context) => {
            // Only require alt if image is present
            const parent = context.parent as { asset?: unknown } | undefined;
            if (parent && parent.asset) {
              if (typeof alt === 'string' && alt.trim().length > 0) {
                return true;
              }
              return 'Image alt text is required';
            }
            return true;
          })
        }
      ]
    },
    {
      name: 'scheduledFor',
      title: 'Scheduled For',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required().error('Scheduled date is required.')
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
      body: 'body',
      author: 'author',
      scheduledFor: 'scheduledFor',
      media: 'image'
    },
    prepare(selection: any) {
      const { body, author, scheduledFor, media } = selection
      return {
        title: body && body[0] && body[0].children && body[0].children[0] ? body[0].children[0].text : 'Facebook Post',
        subtitle: `${author ? 'By ' + author : ''}${scheduledFor ? ' | ' + new Date(scheduledFor).toLocaleDateString() : ''}`,
        media: media
      }
    }
  }
}
