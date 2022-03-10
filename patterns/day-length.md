# Trouble sticking to a bedtime

Everyone goes to bed early some days and late other days, but a normal day length averages out to exactly 24 hours.  In fact, an average day length of just twenty four hours and one minute is like moving forward by one timezone every two months.  This page discusses some issues faced by people with unusually long (or short) days.

## What's causing it?  Should I talk to a doctor?

A day length that matches your environment is called [entrainment](https://en.wikipedia.org/wiki/Entrainment_(chronobiology)).  Most people are entrained to a 24-hour day/night cycle, but for example shift workers and people who work on airplanes may be entrained to some other rhythm.

A day length based on your internal body clock is called [free-running sleep](https://en.wikipedia.org/wiki/Free-running_sleep).  This can happen naturally if you don't have a set bedtime, or can be caused by some rare medical disorders.

::: tip
It's common for people with a long day to spontaneously entrain for a couple of weeks, before reverting back to normal again.  It's always worth looking for causes, but try not to fixate on whatever you happened to be doing last week as a miracle cure.
:::

You should talk to a doctor if you aren't entrained to any particular environment, and can't keep to a bed time.  Most GPs don't know much about sleeping disorders, but should be able to refer you to a sleep specialist.

Your doctor might ask about medical issues that affect your ability to keep schedules (like [ADHD](https://en.wikipedia.org/wiki/Attention_deficit_hyperactivity_disorder)).  You may want to bring any relevant paperwork with you to your appointment.

Your doctor might ask about issues that affect your quality of sleep, like traumatic events.  If you aren't comfortable talking about that, make sure to let them know before your appointment.

Doctors will usually ask you to [keep a sleep diary](../create) for at least two weeks prior to your appointment.  For example, that can help them distinguish between normal free-running and [non-24-hour sleep–wake disorder](https://en.wikipedia.org/wiki/Non-24-hour_sleep%E2%80%93wake_disorder).

## What problems can it cause?  What can I do about them?

The most common problems with an unusual day length are very practical. For example, even if you're entrained to a specific non-24-hour rhythm, shops will often be closed while you're awake.

__Work and school__.  It can be hard to do well in school or hold down a job if you can't stay entrained to their rhythm.  Some people are able to find jobs that accommodate odd hours (usually in IT).  Otherwise, you will need to talk to the organisation and see if there's anything they can do.

[__Vitamin D__](https://en.wikipedia.org/wiki/Vitamin_D).  This is an important compound for health, which you naturally make when your skin is exposed to the sun.  But it's hard to make enough vitamin D if you're awake at night half the time, so you might need to get it from foods or supplements instead.  This also depends on your lifestyle and the country you live in, so you should look for advice in your country (or from your doctor).  For example, the UK isn't a particularly sunny country and [the NHS advice on vitamin D](https://www.nhs.uk/conditions/vitamins-and-minerals/vitamin-d/) mentions sunlight exposure as one of many variables to consider.

__Carbon monoxide__.  This unlikely issue is easy to rule out, but dangerous enough to take seriously.  It's theoretically possible a boiler leaking carbon monoxide could cause a sleeping disorder as the only symptom, and a [carbon monoxide detector](https://en.wikipedia.org/wiki/Carbon_monoxide_detector) will quickly confirm that isn't what's happening.  In any case, a carbon monoxide detector is as much of a household necessity as a fire alarm.

__Keeping appointments__.  Appointments need to be handled carefully if your sleeping pattern is unpredictable.  Organisations are unlikely to understand if you say you have a sleeping disorder, so it may be better to say you work shifts and don't know your timing far in advance.  They might let you make two appointments a few hours (or a few weeks) apart, on the understanding you'll cancel one nearer the time.  Or if you know someone else with a similar appointment, you might be able to book two appointments and swap them over if necessary.  For example, say you book a morning dental check-up for yourself and an afternoon check-up for a housemate.  Then if you find yourself waking up at noon, you can call up and ask for your housemate to take the morning check-up instead.

__Meeting social obligations__.  Being around for social events can require planning months in advance.  If you're young and just need to be physically present for someone's wedding, you might be able to get up in the middle of your night and sit through it.  But sleep becomes less elastic as you age, so it becomes increasingly difficult to entertain relatives for the whole of Christmas day.  It can take years to get good at scheduling, so it's better to start now.

The main things need to know are your _minimum long-term day length_ and your _maximum long-term day length_.  For example, say you normally sleep once every 25 hours, but sometimes you sleep once every 24 or 26 hours for a few weeks at a time.  You might assume you're capable of sustaining that long-term, but if you try it for a few months, you might find your body snaps back to where you would have been if you hadn't tried at all.  The only way to measure your true minimum and maximum is to spend those months trying, fail, pick something closer to your natural average, and keep on trying until you get it right.

Once you know your minimum and maximum average day length, planning social events becomes a mathematical problem.  For example, say you want to wake up at 8am on your birthday, but your normal 25-hour day will have you waking up at 8pm instead.  If you can move your average day length up to 15 minutes either way, it will take you at least 48 sleeps to reach your target wake time.  So in practice, you might want to start scheduling your sleep up to two months before the big day.

## Simulate this sleeping pattern

Some people find they understand their sleeping pattern better if they can compare it to a mathematical model.  Here is a simple program that describes someone who goes to bed an hour later each day:

<div ref="source"></div>

```javascript
for ( n = 0; n < 365; n = n+1 ) {
    add_diary_entry({
      asleep_at: n*days + ( n + normal_distribution()     ) * hours,
      awake_at:  n*days + ( n + normal_distribution() + 8 ) * hours,
    });
}
```

<Simulate :source="source"/>

## See also

* [Non-24 subreddit](https://www.reddit.com/r/N24/)
* [Non-24 discord server](https://discord.gg/dzzT546)
* [VLiDACMel entrainment therapy](https://circadiaware.github.io/VLiDACMel-entrainment-therapy-non24/SleepNon24VLiDACMel.html)
* [Overview and treatment options for non-24](https://www.uspharmacist.com/article/non-24-hour-sleep-wake-disorder-disease-overview-and-treatment-options)
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
