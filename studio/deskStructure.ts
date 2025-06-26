import S from '@sanity/structure-builder'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog')
        .icon(() => '📝')
        .child(
          S.documentTypeList('post')
            .title('Blog Posts')
        ),
      S.listItem()
        .title('Instagram')
        .icon(() => '📸')
        .child(
          S.documentTypeList('instagramPost')
            .title('Instagram Posts')
        ),
      S.listItem()
        .title('Facebook')
        .icon(() => '📘')
        .child(
          S.documentTypeList('facebookPost')
            .title('Facebook Posts')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['post', 'instagramPost', 'facebookPost'].includes(listItem.getId())
      )
    ])
