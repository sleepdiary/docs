# Simulate different patterns

One way to understand your sleeping pattern is to compare it to a mathematical model.  This page presents a series of simple models to help you think about how you might model your own sleeping pattern.

## An unrealistically simple model

We can model a year-long sleep diary by using a language called [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) to create 365 sleep events:

<div ref="source_unrealistic"></div>

```javascript
for ( n = 0; n < 365; n = n+1 ) {
    add_diary_entry({
      asleep_at: n*days,
      awake_at:  n*days + 8*hours,
    });
}
```

<Simulate :source="sources.source_unrealistic"/>

Click &ldquo;run this simulation&rdquo; to create a diary and view it in the dashboard.  In this case, it will look like you slept between exactly midnight and 8am GMT every day.  Notice that the graphs still show your local time, including your daylight savings time - you might like to change the timezone to _Etc/GMT_ instead.

## A more realistic model

People don't sleep at precisely the same times every day, which we can simulate by adding a bit of randomness to the start and end of sleep.  Specifically, we use a [normal distribution](https://en.wikipedia.org/wiki/Normal_distribution) (bell curve) to produce something that looks more human:

<div ref="source_midnight"></div>

```javascript
for ( n = 0; n < 365; n = n+1 ) {
    add_diary_entry({
      asleep_at: n*days + normal_distribution()*hours,
      awake_at:  n*days + normal_distribution()*hours + 8*hours,
    });
}
```

<Simulate :source="sources.source_midnight"/>

## Trouble getting to sleep on time

Now we can simulate something that looks like a human sleeping pattern, we can see what sort of graph you would have if you went to sleep about 4am every day:

<div ref="source_4am"></div>

```javascript
for ( n = 0; n < 365; n = n+1 ) {
    add_diary_entry({
      asleep_at: n*days + normal_distribution()*hours +  4*hours,
      awake_at:  n*days + normal_distribution()*hours + 12*hours,
    });
}
```

<Simulate :source="sources.source_4am"/>

A new simulation runs every time you click the button - click it a few times and compare the results.

## Trouble sticking to a bedtime

Simulations can also show what it would be like if your bedtime advanced by a constant amount every day.  Here's an example of what it would look like if your bedtime advanced by one hour per day:

<div ref="source_day_length"></div>

```javascript
for ( n = 0; n < 365; n = n+1 ) {
    add_diary_entry({
      asleep_at: n*days + normal_distribution()*hours + n*hours,
      awake_at:  n*days + normal_distribution()*hours + n*hours + 8*hours,
    });
}
```

<Simulate :source="sources.source_day_length"/>

## A complex model

We can even simulate more complex sleeping patterns.  Here's a model that describes going to bed about 10pm on week days and midnight on weekends, and being woken up by an alarm clock at 6am during the week:

<div ref="source_alarm"></div>

```javascript
for ( n = 0; n < 365; n = n+1 ) {

    if ( day_of_week(n) == "Saturday" || day_of_week(n) == "Sunday" ) {

        add_diary_entry({
          asleep_at: n*days + normal_distribution()*hours,
          awake_at:  n*days + normal_distribution()*hours + 8*hours,
        });

    } else { // Monday to Friday

        add_diary_entry({
          asleep_at: n*days + normal_distribution()*hours   - 2*hours,
          awake_at:  n*days + normal_distribution()*minutes + 6*hours,
        });

    }

}
```

<Simulate :source="sources.source_alarm"/>

## Create your own

Now you've seen some simulations, edit the block below to create your own:

<Editor
  :source="source_editor"
  @source="this.source_editor = $event"
  />

<Simulate :source="source_editor"/>

For a complete list of available features, see [the simulation reference page](simulation-reference.md).

<script>

export default {

  data: () => ({

    sources: {},

    source_editor: `for ( n = 0; n < 365; n = n+1 ) {
    add_diary_entry({
      asleep_at: n*days + normal_distribution()*hours,
      awake_at:  n*days + normal_distribution()*hours + 8*hours,
    });
}`,
  }),

  mounted () {

    Object.keys(this.$refs).forEach(
      key => this.sources[key] =
        this.$refs[key]
            .nextElementSibling
            .getElementsByTagName("PRE")[0]
            .innerText
    );

  }

}

</script>
