# Trouble getting to sleep on time

Some people like to wake up early, others prefer to work late into the night.  There's a lot of normal variation between these so-called [larks](https://en.wikipedia.org/wiki/Lark_(person)) and [night owls](https://en.wikipedia.org/wiki/Night_owl_(person)), but it can cause problems if your bed time is so late you're still asleep during social hours.

Some people manage to identify specific issues that disrupt their sleep, like drinking coffee in the evening.  But many people find it's just the way their body works.  A specialist sleep doctor may be able to help, and will usually ask you to [keep a sleep diary](../create) for at least two weeks prior to your appointment.

[Vitamin D](https://en.wikipedia.org/wiki/Vitamin_D) is an important compound for health, which you naturally make when your skin is exposed to the sun.  If you tend to sleep late, and to spend daylight hours indoors, you might need to get it from foods or supplements instead.  This also depends on your lifestyle and the country you live in, so you should look for advice in your country (or from your doctor).  For example, the UK isn't a particularly sunny country and [the NHS advice on vitamin D](https://www.nhs.uk/conditions/vitamins-and-minerals/vitamin-d/) mentions sunlight exposure as one of many variables to consider.

## Simulate this sleeping pattern

Some people find they understand their sleeping pattern better if they can compare it to a mathematical model.  Here is a simple program that describes someone who sleeps between 4am and noon each day:

<div ref="source"></div>

```javascript
for ( n = 0; n < 365; n = n+1 ) {
    add_diary_entry({
      asleep_at: n*days + (  4 + normal_distribution() ) * hours,
      awake_at:  n*days + ( 12 + normal_distribution() ) * hours,
    });
}
```

<Simulate :source="source"/>

## See also

* [Delayed Sleep Phase Disorder subreddit](https://www.reddit.com/r/DSPD/)
* [Dealing with sunlight while you're asleep](sunlight)
* [Simulate different patterns](simulate)

<script>
export default {
  data: () => ({
    source: '',
  }),
  mounted() {
    this.source = this.$refs.source.nextElementSibling.getElementsByTagName("PRE")[0].innerText;
  },
};
</script>
