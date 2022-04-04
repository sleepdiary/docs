<template>
  <div class="imageframe-frame">
    <div :class="'imageframe '+(classes||[]).join(' ')">
      <a :href="(base===undefined)?$withBase(link):base+link">
         <img :src="(base===undefined)?$withBase(thumb):base+thumb" :alt="alt" style="border-radius:3px 3px 1px 1px"></a>
      <slot/>
    </div>
  </div>
</template>

<style>
.imageframe-frame {
  float: right;
  clear: both;
  background: var(--c-bg);
  margin: 3px 0 3px 3px;
  padding: 1px 0 1px 1px;
  max-width: 210px;
  border-radius: 6px;
  box-shadow: 0 0px 5px var(--c-bg);
}
.imageframe {
  padding: 4px;
  border: 1px solid var(--c-border);
  transition: border-color var(--t-color);
  border-radius: 6px;
  text-align: center;
  font-size: smaller
}
.dark .imageframe.reactive {
  opacity: 0.75;
}
.imageframe a {
  display: block;
}
@media only screen and (max-width: 959px) {
.imageframe {
  float: inherit;
}
}
</style>

<script>
export default {
 props: ['classes','link','thumb','alt','base'],
}
</script>
