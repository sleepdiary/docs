<template>
  <div style="float:right;padding:4px;margin:4px 0 4px 8px;border:1px solid var(--c-border);transition:border-color var(--t-color);border-radius:6px;text-align:center;width:200px;font-size:smaller">
    <a style="display:block" :href="$withBase(link)"><img style="border-radius:3px 3px 1px 1px" :src="$withBase(thumb)" :alt="alt"></a>
    <slot/>
  </div>
</template>

<script>
export default {
 props: ['link','thumb','alt'],
}
</script>