<template>
    <div
      ref="editor"
      style="min-height:20em;margin-bottom:2em;border-radius:6px"
    />
</template>

<script>

export default {

  props: ['source'],

  mounted () {

    const elem = document.createElement("script");
    [
      [ "src", "https://pagecdn.io/lib/ace/1.4.12/ace.min.js" ],
      [ "crossorigin", "anonymous" ],
      [ "integrity", "sha256-T5QdmsCQO5z8tBAXMrCZ4f3RX8wVdiA0Fu17FGnU1vU=" ]
    ].forEach( attr => elem.setAttribute( attr[0], attr[1] ) );
    document.body.appendChild(elem);

    const interval = setInterval( () => {
      if ( window.ace ) {
        clearInterval(interval);
        const editor = window.ace.edit(this.$refs.editor);
        window.ace.config.set('basePath', 'https://pagecdn.io/lib/ace/1.4.12');
        editor.setTheme("ace/theme/monokai");
        editor.setOptions({
          fontFamily: "var(--font-family-code)",
          fontSize: ".85em",
          maxLines: 50,
        });
        editor.renderer.setScrollMargin(20, 20);
        editor.session.setMode("ace/mode/javascript");
        editor.session.setValue(this.source);
        editor.setShowPrintMargin(false);
        editor.setHighlightActiveLine(false);
        editor.on("input", () => this.$emit('source',editor.getValue()) );
      }
    }, 500 );
  }

}

</script>
