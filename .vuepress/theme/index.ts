import type { ThemeObject } from '@vuepress/core'
import { path } from '@vuepress/utils'

const localTheme: ThemeObject = {
  name: 'vuepress-theme-local',
  extends: '@vuepress/theme-default',
  layouts: {
    Layout: __dirname+'/layouts/Layout.vue',
  },
  components: {
    PageMeta: __dirname+'/components/PageMeta.vue',
  },
  clientAppEnhanceFiles: __dirname + '/clientAppEnhance.ts',
}

export default localTheme
