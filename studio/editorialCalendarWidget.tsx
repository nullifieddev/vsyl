import { Card, Stack, Text, Heading } from '@sanity/ui'
import { useEffect, useState } from 'react'
import { useClient } from 'sanity'

const query = `
*[_type in ['post', 'instagramPost', 'facebookPost'] && publishingControls.readyForReview == true && (!publishingControls.published || publishingControls.published == false)]|order(scheduledFor asc, publishedAt asc){
  _id,
  _type,
  title,
  caption,
  body,
  scheduledFor,
  publishedAt,
  author,
  locale
}`

function getTitle(doc: any) {
  if (doc.title) return doc.title
  if (doc.caption && doc.caption[0] && doc.caption[0].children && doc.caption[0].children[0]) return doc.caption[0].children[0].text
  if (doc.body && doc.body[0] && doc.body[0].children && doc.body[0].children[0]) return doc.body[0].children[0].text
  return doc._type
}

export default function EditorialCalendarWidget() {
  const client = useClient({ apiVersion: '2023-01-01' })
  const [items, setItems] = useState<any[]>([])
  useEffect(() => {
    client.fetch(query).then(setItems)
  }, [client])

  return (
    <Card padding={4} radius={2} shadow={1} tone="default">
      <Stack space={3}>
        <Heading size={1}>Editorial Calendar</Heading>
        {items.length === 0 && <Text muted>No content ready for translation.</Text>}
        {items.map((item) => (
          <Card key={item._id} padding={3} radius={2} shadow={1} tone="transparent" style={{ borderLeft: '4px solid #C86A43' }}>
            <Stack space={2}>
              <Text size={2} weight="semibold">{getTitle(item)}</Text>
              <Text size={1} muted>{item._type.replace('Post', ' Post').replace(/^./, (str: string) => str.toUpperCase())} | {item.locale?.toUpperCase()} | {item.author}</Text>
              <Text size={1} style={{ color: '#A1A19B' }}>
                {item.scheduledFor ? `Scheduled: ${new Date(item.scheduledFor).toLocaleString()}` : item.publishedAt ? `Publish: ${new Date(item.publishedAt).toLocaleString()}` : ''}
              </Text>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Card>
  )
}
