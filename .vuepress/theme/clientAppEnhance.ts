import { defineClientAppEnhance } from '@vuepress/client'
import ImageFrame from './page-components/ImageFrame.vue'
import ImageGallery from './page-components/ImageGallery.vue'
import Simulate from './page-components/Simulate.vue'
import Editor from './page-components/Editor.vue'
import SortableTable from './page-components/SortableTable.vue'
import Map from './page-components/Map.vue'
import ShowOnClick from './page-components/ShowOnClick.vue'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component('ImageFrame', ImageFrame);
  app.component('ImageGallery', ImageGallery);
  app.component('Simulate', Simulate);
  app.component('Editor', Editor);
  app.component('SortableTable', SortableTable);
  app.component('Map', Map);
  app.component('ShowOnClick', ShowOnClick);
})
