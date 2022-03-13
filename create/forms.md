# Forms and reports

Sleep professionals often get people to fill out forms, from which they produce reports.  For example, a researcher might give questionnaires to participants or a doctor might calculate their patients' average wake times.

This page is a collection of real-world examples that should give you some idea about the process of analysing sleep.  If you're interested in designing new forms, they should give you some ideas to build on.  In particular, [the sleepdiary report](/report) is based largely on these examples.

If you are a sleep professional and would like to add your forms or reports, [please get in touch](https://github.com/sleepdiary/docs/issues/new?title=Please+add+my+forms+or+reports)!  You'll need to provide some examples and confirm you have permission to share them publicly.  Example forms should be blank, and any reports you choose to share can use [simulated data](../patterns/simulate.html) to avoid privacy concerns.  Please mention your preferred data format for reports, so we can generate a simulation in that format.  If you would rather publish on your own site for your patients to download, just provide a link we can put on this page.

## Calendar-style sleep forms

The most common type of sleep form is the calendar-style sleep diary, which primarily asks people to mark their wake and sleep times.

### Comparison

Here is a summary of common differences between calendar-style forms.

<div class="official-forms">

| Source      | page duration | total pages | start time | in-bed marker | out-of-bed marker | sleep marker |
| ----------- | ------------- | ----------- | -----------| ---------------- | -------------------- | --------------- |
| [The Center for Sleep & Wake Disorders](#the-center-for-sleep-wake-disorders) | 28 days | 1 | 6pm | ○ | 🌅 | ●―● (asleep) <br/> N〰N (nap) |
| [Dr. Karen M. Baker](#dr-karen-m-baker) | 2 weeks | 1 | Noon | &#x7c; | (none) | ▬ |
| [Raleigh Neurology Associates](#raleigh-neurology-associates) | 2 months | 1 | 6pm | &darr; | &uarr; | ▬ |
| [Sleep Support Project](#sleep-support-project) | 1 week | 2 | 6pm | &darr; | &uarr; | &#x7c;―&#x7c; |

</div>

### The Center for Sleep & Wake Disorders

<ImageFrame link="https://sleepdoc.com/wp-content/uploads/2019/10/sleep_log.pdf" thumb="/create/forms/Center for Sleep and Wake Disorders-thumbnail.jpg">
  Adult sample form used by<br>The Center for Sleep & Wake Disorders
</ImageFrame>

[The Center for Sleep & Wake Disorders](https://sleepdoc.com/) is an accredited full service sleep center based in Maryland, USA.  They provide a range of [forms and resources](https://sleepdoc.com/forms), including both an [adult sleep diary](https://sleepdoc.com/wp-content/uploads/2019/10/sleep_log.pdf) and an [adolescent sleep diary](https://sleepdoc.com/wp-content/uploads/2019/10/Sleep-log-adolescent.pdf).

The sleep diaries ask patients to mark the following:

* <strong>A</strong> - alcohol (adult diary only)
* <strong>F</strong> - food (adolescent diary only)
* <strong>M</strong> - medication
* <strong>C</strong> - caffeine
* <strong>T</strong> - TV

There are no other substantive difference between the adult and adolescent diaries.

<div style="clear:both"></div>

### Dr. Karen M. Baker

<ImageFrame link="http://www.orlandosleep.com/forms/sleepdiary_v2.pdf" thumb="/create/forms/orlandosleep-thumbnail.jpg">
  Sample form used by<br>Dr. Karen M. Baker
</ImageFrame>

[Dr. Karen M. Baker](http://www.orlandosleep.com/) is a medical director of the Center for Sleep Disorders, at four AdventHealth locations in Central Florida.  Her site includes [a diary](http://www.orlandosleep.com/forms/sleepdiary_v2.pdf) in the "Sleep facts & info" section.

The sleep diary asks patients to mark the following:

* <strong>C</strong> - coffee, cola, or tea
* <strong>M</strong> - medicine
* <strong>A</strong> - alcohol
* <strong>E</strong> - exercise

<div style="clear:both"></div>

### Raleigh Neurology Associates

<ImageFrame link="/create/forms/Raleigh_Neurology_Sleep_Chart_blank.pdf" thumb="/create/forms/Raleigh_Neurology_Sleep_Chart_blank-thumbnail.jpg">
  Sample form used by<br>Raleigh Neurology Associates
</ImageFrame>

[Raleigh Neurology Associates](https://www.raleighneurology.com/about-us/who-we-are/) are a respected neurology practice in North Carolina, USA.  They provide a [Sleep Medicine Program](https://www.raleighneurology.com/specialties-services/sleep-medicine/) among many other services.  They have kindly allowed us to publish their sleep form on this site.

<div style="clear:both"></div>

### Sleep Support Project

<ImageFrame link="https://sleepsupportproject.org/wp-content/uploads/2020/11/sleep-diary-BLANK.pdf" thumb="/create/forms/Sleep Support Project-thumbnail.jpg">
  Sample form used by<br>The Sleep Support Project
</ImageFrame>

[The Sleep Support Project](https://sleepsupportproject.org/about/) are qualified BACP Registered counsellors based in Greater Manchester, UK.  They provide a [downloadable sleep diary](https://sleepsupportproject.org/sleep-diary-2/) on their website.

Patients across the UK report their doctors use sleep diaries with only minor differences.  We haven't identified the original source they're all derived from.

The sleep diary asks patients to mark the following:

* <strong>A</strong> - each alcoholic drink
* <strong>C</strong> - each caffeinated drink includes coffee, tea, chocolate, cola
* <strong>P</strong> - every time you take a sleeping pill or medication to aid sleep
* <Strong>M</Strong> - Meals
* <Strong>S</Strong> - Snacks
* <Strong>X</Strong> - Exercise
* <strong>T</strong> - use of toilet during sleep-time
* <strong>N</strong> - noise that disturbs your sleep
* <strong>W</strong> - time of wake-up alarm (if any)

<div style="clear:both"></div>

## Calendar-style reports

Reports are often intended for internal use, and may not be designed for readability by people outside the organisation that created them.  You can probably ignore these unless you're interested in designing new reports.

### Sleep Diary Project

<ImageFrame link="https://sleepdiary.github.io/report/Example%20report.pdf" thumb="/create/forms/Sleep Diary Report-thumbnail.jpg">
  Sample report used by<br>The Sleep Diary Project
</ImageFrame>

This project itself includes [a reporting program](https://sleepdiary.github.io/report/), the layout of which is largely based on the examples on this page.

The linked example is based on simulated data, and does not represent the sleeping pattern of any real person.

<div style="clear:both"></div>

## Other forms

Here is a collection of other forms that don't fit the pattern above.

* [The Consensus Sleep Diary](https://academic.oup.com/sleep/article/35/2/287/2558899) is a questionnaire-style diary based on work by many researchers

<style>
.official-forms td:not(:nth-child(1)) {
  text-align: center;
}
</style>
