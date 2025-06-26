import React from 'react'
import { Rule } from 'sanity'

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(2).max(32).error('A category name between 2 and 32 characters is required.')
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 48,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 48)
      },
      validation: (Rule: Rule) => Rule.required().error('A slug is required.')
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule: Rule) => Rule.max(120).warning('Keep descriptions concise (max 120 characters).')
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color for editorial and frontend filtering (e.g., #C86A43).',
      validation: (Rule: Rule) => Rule.regex(/^#([0-9A-Fa-f]{6})$/).error('Must be a valid hex color (e.g., #C86A43).')
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
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'locale',
      color: 'color'
    },
    prepare(selection: any) {
      const { title, subtitle, color } = selection
      return {
        title: title,
        subtitle: subtitle ? `Locale: ${subtitle}` : '',
        media: color
          ? () => React.createElement('span', {
              style: {
                display: 'inline-block',
                width: '1em',
                height: '1em',
                backgroundColor: color,
                borderRadius: '50%'
              }
            })
          : undefined
      }
    }
  }
}
