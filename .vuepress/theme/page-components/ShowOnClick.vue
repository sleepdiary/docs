<template>
  <div ref="main" @focusout="has_focus=0" class="show-on-click">
    <div class="show-on-click-header" @click="handle_click">
      <slot name="header"></slot>
    </div>
    <div class="show-on-click-body" ref="main">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      has_focus: 0,
    };
  },
  methods: {
    handle_click(event) {
      if ( !( this.has_focus ^= 1 ) ) {
        document.activeElement.blur();
      }
    },
  },
};
</script>
<style>
@media only screen and (max-width: 959px) {
.show-on-click-body {
  height: 0;
  overflow: hidden;
  transition: 2s;
}
.show-on-click:focus-within .show-on-click-body {
  height: inherit;
  display: contents;
}
.show-on-click-header {
  cursor: pointer;
}
.show-on-click-header > :first-child:before {
  font-size: smaller;
  opacity: 0.5;
  content: "";
  display: inline-block;
  width: 1em;
  height: 0.75em;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='10' width='20'><line x1='3'  y1='2' x2='10' y2='8' stroke-width='2' stroke='black' /><line x1='17' y1='2' x2='10' y2='8' stroke-width='2' stroke='black' /></svg>");
  background-repeat: no-repeat;
  background-position: center;
}
.show-on-click:not(:focus-within) .show-on-click-header > :first-child {
  border-bottom: 1px solid var(--c-border);
}
.show-on-click:focus-within .show-on-click-header > :first-child:before {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='10' width='20'><line x1='3'  y1='8' x2='10' y2='2' stroke-width='2' stroke='black' /><line x1='17' y1='8' x2='10' y2='2' stroke-width='2' stroke='black' /></svg>");
}
}
</style>
