<template>
  <div class="map" ref="map"></div>
</template>

<style>
.map {
  background: transparent;
  height: var(--content-width);
  max-height: 50vh;
  z-index: 0;
}
.map .leaflet-marker-icon.shape-square {
  filter: saturate(0.33);
}
.leaflet-container.map {
  background: transparent;
  border: 1px solid var(--c-border);
  border-radius: 4px;
}
.map:not(.leaflet-container) {
  background: url("/docs/spinning-circles.svg");
  background-repeat: no-repeat;
  background-position: center;
}
html:not(.dark) .map:not(.leaflet-container) {
  filter: invert(1);
}

html.dark .leaflet-container.map .leaflet-tile-pane {
  filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
}
</style>

<script>
export default {
  props: ['markers'],
  data() {
    return {
      status: 0,
    };
  },
  methods: {
    initialise() {
      /*
       * Leaflet won't load properly from config.js, which causes Leaflet Extra Markers behaves to break intermittently.
       * Load them both here where we can control them.
       */
      let load_script = attrs => {
        const s = document.createElement('script');
        Object.keys(attrs).forEach( key => s.setAttribute( key, attrs[key] ) );
        document.head.appendChild(s);
      };
      switch ( this.status ) {

      case 0:
        if ( !window.L ) {
          load_script({
            src: 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js',
            integrity: 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==',
            crossorigin: ''
          });
          this.status = 1;
          break;
        }
        // FALL THROUGH if Leaflet was loaded elsewhere

      case 1:
        if ( !window.L ) break;
        if ( !window.L.ExtraMarkers || !window.L.Control.SleepMapControl ) {
          if ( !window.L.ExtraMarkers ) {
            load_script({
              src: 'https://unpkg.com/leaflet-extra-markers@1.2.1/dist/js/leaflet.extra-markers.min.js'
            });
          }
          if ( !window.L.Control.SleepMapControl ) {
            load_script({
              src: '/docs/Leaflet.Sleep.js',
            });
          }
          this.status = 2;
          break;
        }
        // FALL THROUGH if Leaflet Extra Markers was loaded elsewhere

      case 2:
        if ( window.L.ExtraMarkers && window.L.Control.SleepMapControl ) {
          const map = L.map(this.$refs.map,{worldCopyJump:true,sleepNote:false,sleepOpacity:1}).fitWorld().zoomIn();
          const icons = {};
          [ 'circle', 'square' ].forEach( shape => icons[shape] = {
            // make sure to synchronise this list with the one in resources/bin/specialists.js
            physician: L.ExtraMarkers.icon({
              icon: 'fa-user-doctor',
              markerColor: 'blue',
              shape: shape,
              prefix: 'fa',
              className: 'shape-'+shape,
            }),
            researcher: L.ExtraMarkers.icon({
              icon: 'fa-user-graduate',
              markerColor: 'green',
              shape: shape,
              prefix: 'fa',
              className: 'shape-'+shape,
            }),
          });
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
          this.markers.forEach( marker =>
            L.marker(marker.location,{icon:icons[marker.shape][marker.icon]})
             .addTo(map)
             .bindTooltip(marker.tooltip)
             .bindPopup(marker.popup)
             .setZIndexOffset(marker.z_index_offset||0)
          );
          return;
        }
      }
      setTimeout( () => this.initialise(), 500 );
    },
  },
  mounted() {
    this.initialise();
  },
}
</script>
