<template>
  <div v-if="editNavLinks" class="meta-item edit-links">
    <DropdownLink :item="editNavLinks" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import {
  usePageData,
  usePageFrontmatter,
} from '@vuepress/client'
import type {
  DefaultThemePageData,
  DefaultThemeNormalPageFrontmatter,
  NavLink as NavLinkType,
} from '@vuepress/theme-default/lib/shared'
import { useThemeLocaleData } from '@vuepress/theme-default/lib/client/composables'
import { resolveEditLink } from '@vuepress/theme-default/lib/client/utils'
import NavLink from '@vuepress/theme-default/lib/client/components/NavLink.vue'
import DropdownLink from '@vuepress/theme-default/lib/client/components/DropdownLink.vue'

const useEditNavLink = (): ComputedRef<null | NavLinkType> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocale.value.editLink ?? true
    if (!showEditLink) {
      return null
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
      editLinkText,
    } = themeLocale.value

    if (!docsRepo) return null

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern: themeLocale.value.editLinkPattern,
    })

    if (!editLink) return null

    return {
      text: editLinkText ?? 'Edit this page',
      link: editLink,
    }
  })
}

const useViewNavLink = (): ComputedRef<null | NavLinkType> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showViewLink =
      frontmatter.value.viewLink ?? themeLocale.value.viewLink ?? true
    if (!showViewLink) {
      return null
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
      viewLinkText,
    } = themeLocale.value

    if (!docsRepo) return null

    const viewLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern: ':repo/blob/:branch/:path',
    })

    if (!viewLink) return null

    return {
      text: viewLinkText ?? 'View page source',
      link: viewLink,
    }
  })
}

const useReportNavLink = (): ComputedRef<null | NavLinkType> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showReportLink =
      frontmatter.value.reportLink ?? themeLocale.value.reportLink ?? true
    if (!showReportLink) {
      return null
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
      reportLinkText,
    } = themeLocale.value

    if (!docsRepo) return null

    const reportLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern: ':repo/issues/new/?assignees=&labels=&template=page_problem.md&title=Problem+with+:path',
    })

    if (!reportLink) return null

    return {
      text: reportLinkText ?? 'Report problem',
      link: reportLink,
    }
  })
}

const editNavLinks = {
  text: 'Found a problem?',
  children: [
    useEditNavLink(),
    useViewNavLink(),
    useReportNavLink(),
  ],
}
</script>

<style>
footer.page-meta {
  overflow: initial;
}
.edit-links {
  position: relative;
  display: inline-block;
}

.edit-links a {
  color: inherit;
}

.edit-links .nav-dropdown {
  top: initial;
  right: initial;
  bottom: 100%;
  left: 0;
}
</style>
