import { defineClientAppEnhance } from '@vuepress/client'
import ImageFrame from './page-components/ImageFrame.vue'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component('ImageFrame', ImageFrame);
})
