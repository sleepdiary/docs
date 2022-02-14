# Simulation reference

This page contains a complete list of available features you can use when you [create your own simulation](simulate#create-your-own).  You may also like to see [the simulation framework on GitHub](https://github.com/sleepdiary/docs/tree/main/.vuepress/theme/page-components/Simulate.vue).

## Pre-declared variables

JavaScript usually requires you to declare variables before using them.  For convenience, the framework declares the variables `n`, `asleep_at` and `awake_at` by default:

```javascript
// this is OK because the framework pre-declares the variables:
for ( n=0; n<365; ++n ) {
  asleep_at = n*days +  6*hours;
  awake_at  = n*days + 14*hours;
  add_diary_entry({ asleep_at, awake_at });
}

// if you use another variable name, make sure to declare it:
var x;
for ( x=0; x<365; ++x ) {
  asleep_at = x*days +  6*hours;
  awake_at  = x*days + 14*hours;
  add_diary_entry({ asleep_at, awake_at });
}
```

## Specify Dates

Simulations calculate dates by adding a number of milliseconds to a start date.  For readability, the framework provides the constants `seconds`, `minutes`, `hours` and `days` as aliases for the equivalent number of milliseconds.  You can also set the start date with the `start_at()` function:

```javascript
// set the start date and time:
start_at("2020-03-25T18:00:00Z");

// specify times literally or using the constants provided:
var time = 1; // one millisecond
var time = 1000; // one second
var time = 1*seconds; // also one second
var time = 1*minutes; // 60*seconds
var time = 1*hours; // 60*minutes
var time = 1*days; // 24*hours
```

## Add a diary entry

The `add_diary_entry` function takes an `options` argument, which is an object containing the following values:

* `asleep_at` or `begin` - the time when the entry began (in milliseconds since the start date)
* `awake_at` or `end` - the time when the entry ended (in milliseconds since the start date)
* `status` - your status during the time described by the entry (default: `asleep`)

```javascript
// these two are identical:
add_diary_entry({
  asleep_at: 1000, // one second past the start date
  awake_at: 8*60*60*1000, // 8 hours past the start date
});
add_diary_entry({
  begin: 1_seconds, // one second past the start date
  end  : 8*hours, // 8 hours past the start date
  status: 'asleep',
});

// specify an alarm clock woke you up:
add_diary_entry({
  begin: 8*hours, // 8 hours past the start date
  end  : 8*hours, // 8 hours past the start date
  status: 'alarm',
});
```

The list of valid record types is stored in `DiaryStandardRecordStatus` in [`Standard/engine.js`](https://github.com/andrew-sayers/core/blob/main/src/Standard/engine.js#L31).

## Miscellaneous

The framework also provides the `normal_distribution()` function (a random number with a bell curve centred on `0`) and `day_of_week()` (the English name of the date at a specified time).  You can also use any JavaScript functionality to generate models:

```javascript
// Use various functions to calculate a time:
var time = 4*days + 2*normal_distribution()*hours + Math.random()*minutes;

switch ( day_of_week(time) ) {
  case "Sunday":
    // ...
    break;
  case "Monday":
    // ...
    break;
  case "Tueday":
    // ...
    break;
  case "Wednesday":
    // ...
    break;
  case "Thursday":
    // ...
    break;
  case "Friday":
    // ...
    break;
  case "Saturday":
    // ...
    break;
}
```
