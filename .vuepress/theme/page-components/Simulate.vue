<template>
    <a ref="run" href="#run">
        <slot>Run this simulation</slot>
    </a>
    <span
      v-if="error"
      style="padding-left:1em;color:red"
    >
        {{error}}
    </span>
</template>

<script>

export default {
  props: ['source'],
  data: () => ({
    error: '',
  }),
  mounted () {

    const elem = document.createElement("script");
    elem.setAttribute( "src", "https://sleepdiary.github.io/core/sleepdiary-core.min.js" );
    document.body.appendChild(elem);

    const interval = setInterval( () => {

      if ( !window.DiaryLoader ) return;
      clearInterval(interval);

      const diary_loader = new window.DiaryLoader(
        diary => {
          const elem = document.createElement('A');
          elem.setAttribute( "href", 'https://sleepdiary.github.io/dashboard/#?'+diary.to("Standard").to("url") );
          elem.setAttribute( "target", "_blank" );
          elem.click();
        }
      );

      this.$refs.run.addEventListener(
        "click",
        event => {
          event.preventDefault();

          var start = ( new Date().getFullYear()-1 ) + "-01-01T00:00:00Z",
              diary = [
                "SleepStart,SleepEnd,status"
              ]
          ;

          this.error = '';

          try {
            new Function(
              // functions:
              "start_at",
              "add_diary_entry",
              "normal_distribution",
              "day_of_week",
              // constants:
              "seconds",
              "minutes",
              "hours",
              "days",
              // pre-declared "var"s:
              "asleep_at",
              "awake_at",
              "n",
              this.source
            )(

              time => start = time,
              options => (
                diary.push(
                  Math.round( new Date(start).getTime() + (options.asleep_at||options.begin) ) + ',' +
                  Math.round( new Date(start).getTime() + (options. awake_at||options.  end) ) + ',' +
                  ( options.status || "asleep" ),
                )
              ),
              // Standard Normal variate using Box-Muller transform, from https://stackoverflow.com/a/36481059
              () => {
                var u = 0, v = 0;
                while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
                while(v === 0) v = Math.random();
                return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
              },

              n => [
                "Sunday",
                "Monday",
                "Tueday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ][ ( new Date(start).getDay() + n ) % 7 ],

              1000,
              1000*60,
              1000*60*60,
              1000*60*60*24,

            );
          } catch (e) {
            this.error = e;
            return;
          }

          diary_loader.load(
            {
              "file_format": "string",
              "contents"   : diary.join("\n"),
            }
          );

        }
      );

    }, 500 );

  }
}

</script>
