import { defineClientAppEnhance } from '@vuepress/client'
import ImageFrame from './page-components/ImageFrame.vue'
import Editor from './page-components/Editor.vue'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component('ImageFrame', ImageFrame);
  app.component('Editor', Editor);
})
