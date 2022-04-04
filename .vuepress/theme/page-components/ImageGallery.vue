<template>
  <div class="image-gallery">
    <div v-for="image in images">
      <a :href="image.url"><img :src="image.thumb"></a><br/>
      {{image.display_name}}
    </div>
  </div>
</template>

<style>
.image-gallery div {
  display: inline-block;
  vertical-align: top;
  background: var(--c-bg);
  border-radius: 6px;
  border: 1px solid var(--c-border);
  box-shadow: 0 0px 5px var(--c-bg);
  font-size: smaller;
  margin: 3px;
  max-width: 160px;
  padding: 4px;
  text-align: center;
  transition: border-color var(--t-color);
}
</style>

<script>
export default {
 props: ['images'],
}
</script>
