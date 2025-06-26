import { Rule } from 'sanity'
import blockContent from './blockContent'

export default {
  name: 'instagramPost',
  title: 'Instagram Post',
  type: 'document',
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'blockContent',
      validation: (Rule: Rule) => Rule.required().error('Caption is required.')
    },
    {
      name: 'image',
      title: 'Image',
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
      validation: (Rule: Rule) => Rule.required().error('Image is required.')
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
      caption: 'caption',
      author: 'author',
      scheduledFor: 'scheduledFor',
      media: 'image'
    },
    prepare(selection: any) {
      const { caption, author, scheduledFor, media } = selection
      return {
        title: caption && caption[0] && caption[0].children && caption[0].children[0] ? caption[0].children[0].text : 'Instagram Post',
        subtitle: `${author ? 'By ' + author : ''}${scheduledFor ? ' | ' + new Date(scheduledFor).toLocaleDateString() : ''}`,
        media: media
      }
    }
  }
}
