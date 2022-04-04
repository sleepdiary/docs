<template>
  <span class="meta-item entry-updated" style="float:right;margin:0">
    <span class="meta-item-label">Entry&nbsp;updated:&nbsp;</span>
    <span class="meta-item-info">{{date_text}}</span>
  </span>
</template>

<script>
export default {
  props: ['date'],
  computed: {
    date_text() { return new Date(this.date).toLocaleDateString(); }
  },
}
</script>


