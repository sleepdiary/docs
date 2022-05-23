# Add new documentation

This documentation uses [VuePress v2](https://v2.vuepress.vuejs.org/), which makes it most editing trivial, but requires a little housekeeping in some cases.

## Use custom components

VuePress allows sites to create custom components, which this project stores in [`.vuepress/theme/page-components`](https://github.com/sleepdiary/docs/tree/main/.vuepress/theme/page-components).

### Add an image frame

To put an image in a frame, use the `<ImageFrame>` component:

```vue
<ImageFrame link="/directory/image.jpg" thumb="/directory/image-thumbnail.jpg">
  Caption
</ImageFrame>
```

For technical reasons, you need to specify the full path to your image, not just `image.jpg`.

### Add an editor

To add a source code editor, use the `<Editor>` component:

```vue
<Editor
  :source="initial_source_code"
  @source="this.updated_source_code = $event"
  />
```

### Add a simulator

To run a sleeping pattern simulation, use the `<Simulate>` component:

```vue
<Simulate :source="source_code"/>
```

This component is mainly used in [the &ldquo;simulate&rdquo; page](../patterns/simulate), but should work just as well anywhere else.


## Create a new component

Pages can use both in-page Vue functionality and new components to improve the reading experience.  For example, [`patterns/simulate.md`](https://raw.githubusercontent.com/sleepdiary/docs/main/patterns/simulate.md) uses both to create an interactive way to learn about sleeping patterns.

1. Create the component in [`page-components`](../.vuepress/theme/page-components/)
2. Add it to [`clientAppEnhance.ts`](.vuepress/theme/clientAppEnhance.ts)
3. Document it on this page

## Create a new page

Creating a new page involves a bit of administrative work:

1. Create the page itself
2. Add a link in [`.vuepress/config.js`](https://github.com/sleepdiary/docs/tree/main/.vuepress/config.js)

`config.js` controls which pages appear in the sidebar on the left, and what order they appear in.  Make sure to put your page in a place that people will find it.

## Create a new folder

Creating a new folder involves quite a bit of administrative work:

1. Create the folder itself
2. Create a `README.md` file in that directory
3. Add a section in [`.vuepress/config.js`](https://github.com/sleepdiary/docs/tree/main/.vuepress/config.js)
4. Add a symbolic link in [`.vuepress/public`](https://github.com/sleepdiary/docs/tree/main/.vuepress/public)

A symbolic link is a filesystem mechanism used by the `<ImageFrame>` component to make image links work the same as site links.  If you're not sure how to make symlinks, [create an issue](https://github.com/sleepdiary/docs/issues/new/choose) and someone can walk you through it or do it for you.
