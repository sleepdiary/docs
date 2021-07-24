# Reconstructing a diary from sources

A lot of software records the moment or time period where an event happens.  For example, your calendar has start and end times for events; and your browser cache stores the time you visited each page.  You may be able to reconstruct a sleep diary by looking for gaps in these records.

Every program that logs your activity has its own bespoke format, designed around the requirements of that program.  And for privacy and security reasons, access to the data is often limited.  That means reconstructing a diary is quite technical and often inaccurate, but it can be a quick way to see your past sleeping pattern.  See [the diary creation page](creating) for information about creating a proper diary for future events.

# General overview

To reconstruct a diary, you need to create an _activity log_ that will then be converted to a normal diary.  This is a simple text file that looks something like:

    maximum_day_length_ms=129600000
    ActivityStart,ActivityEnd
    2016-08-04T02:01:00Z,2016-08-04T04:08:16Z
    12345678,23456789
    ... etc ...

The first line is optional, and tells the analysis program how many milliseconds there are in the longest possible day.  A 24-hour day is `86400000` milliseconds, and you should only need to set this explicitly if your average day length is more than about 32 hours.

The rest of the file uses [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) - a type of simple spreadsheet with commas between each column.

The second line is the _CSV header_.  It says this file has two columns, indicating the start and end times for an activity.

Lines after the second are the _CSV body_.  They indicate the times for specific activities.  Each line should have a start time in the first column and an end in the second column.  If your data source only specifies one time, use that time in both columns.  The example above shows dates in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format and in [Unix time](https://en.wikipedia.org/wiki/Unix_time), but analysis programs should support a wide variety of date formats.

The way to generate this data depends on your data source.  The examples below will discuss some possible solutions, but you may need to do some programming to make your particular source work.

The examples on this page will recommend using [the dashboard](https://sleepdiary.github.io/dashboard) to analyse your data.  See [the ActivityLog documentation](https://github.com/sleepdiary/library/tree/main/src/ActivityLog) if you're interested in creating your own analysis software.

# Sources

A collection of example sources are presented below, but your best source of logs depends on your personal behaviour.  For example, [Google Takeout](https://support.google.com/accounts/answer/3024190?hl=en) allows you to download a lot of data about your Google account, which is more useful if you have an Android phone than an iPhone.

# Calendars

Calendars store the dates and times when events occur.  If you normally have events throughout your day, you can use them as an activity log.  The general process looks like this:

1. export your data to iCalendar format
2. analyse your data

Most calendar software can export to [iCalendar format](https://en.wikipedia.org/wiki/ICalendar) - a standard format designed to be read by other calendaring programs.  You will need to search online to find the relevant steps for your program.

Once you have an iCalendar file, you can add it directly to [the dashboard](https://sleepdiary.github.io/dashboard).  It will convert the file to an activity log automatically.

## Desktop browsers

Browsers store the date and time whenever you go to a new page, so they can decide when to remove that page from the browser cache.  Depending on your settings, this information might be deleted after a month or so.  Most browsers store this in a standard format that can be extracted with a little work.  The general process looks like this:

1. find your history database
2. (optionally) extract the cache activity
3. analyse your data

The first step is to find your history database.  Type `chrome:version` or `about:support` in the address bar - depending on your browser, one or other of them should take you to a page full of technical information.  The line that says `Profile Path` or `Profile Directory` tells you the folder where your profile is saved.  Depending on your browser, your history database will be called `History`, `History.db` or `places.sqlite` in that folder.  If you are using MacOS and can't see your profile folder, press <tt>Cmd</tt> + <tt>Shift</tt> + <tt>G</tt> in the Finder and type your folder name.

[The dashboard](https://sleepdiary.github.io/dashboard) can create an activity log directly from your history database.  You can skip the next stage if you're comfortable with that.

If you prefer, you can extract your activity log by hand with a command-line program called [SQLite](https://www.sqlite.org/download.html).  This is installed by default in MacOS and available for all Linux distributions, but you will have to install it manually if you use Windows.  Once you have installed SQLite, run one of these commands on a command-line (remember to replace `...` with the folder from the first step):

    sqlite3 -csv C:\\...\\History       '.output activity-log.chrome.csv'  '.header on' 'SELECT visit_time/1000-11644473600000 AS ActivityStart, visit_time/1000-11644473600000 AS ActivityEnd FROM visits'
    sqlite3 -csv C:\\...\\places.sqlite '.output activity-log.firefox.csv' '.header on' 'SELECT visit_date/1000                AS ActivityStart, visit_date/1000                AS ActivityEnd FROM moz_historyvisits'
    sqlite3 -csv C:\\...\\History.db    '.output activity-log.safari.csv'  '.header on' 'SELECT (visit_time+978307200)*1000    AS ActivityStart, (visit_time+978307200)*1000    AS ActivityEnd FROM history_visits'

If you see a message like `Error: database is locked`, you will need to close your browser before you run the command.

Depending on your browser, your file will be called `activity-log.chrome.csv`, `activity-log.firefox.csv` or `activity-log.safari.csv`.  You can confirm its contents by opening it like a normal spreadsheet.

Finally, add your activity log or history database to [the dashboard](https://sleepdiary.github.io/dashboard).  You might like to convert the result to a spreadsheet, so you can fix anything it got wrong.


## Desktop operating systems

Your operating system logs a lot of system information, like when it boots up and shuts down.  If you turn your computer on in the morning and off at night, you can use that information as an activity log.  The general process looks like this:

1. run a command-line program to create an activity log
2. analyse your data

If you use Windows, you can create an activity log with PowerShell.  Click `Start`, type `PowerShell` and press enter.  Copy the following block of text, then right-click on the PowerShell window and click `paste`:

    if ( $out_path = [System.Environment]::GetFolderPath([System.Environment+SpecialFolder]::Desktop)+"\\activity-log.windows.csv" ) {
      write "Saving to $out_path..."
      write "ActivityStart,ActivityEnd" | Out-File -encoding ASCII -FilePath $out_path
      ForEach ( $log in Get-EventLog System ) {
        if ( $log.EventId -eq 12 ) { # powered on
           $start_time = Get-Date -Format u $log.TimeGenerated
        } elseif ( $log.EventId -eq 13 ) { # powered off
           $end_time = Get-Date -Format u $log.TimeGenerated
           write "$start_time,$end_time" | Out-File -encoding ASCII -append -FilePath $out_path
        }
      }
      write "You can close PowerShell now."
    }
    # Now press enter twice
    
Press enter twice to run the command.  After a few seconds, a file called `activity-log.windows.csv` will appear on your desktop.  You can close PowerShell once that happens.

If you use Linux, run the following command on a command-line:

    echo 'ActivityStart,ActivityEnd' > ~/activity-log.linux.csv
    sudo zcat -f /var/log/syslog* \\
      | cut -c 1-15 \\
      | uniq \\
      | while read REPLY ; do DATE="$( date -Iseconds -d "$REPLY" )"; echo "$DATE,$DATE" ; done \\
      >> ~/activity-log.linux.csv

A file called `activity-log.linux.csv` will slowly be populated in your home directory.  The program might take a minute or two to run.

# Other sources

The examples above show how to extract an activity log from some sources.  It generally involves _extracting_ the data you want from the source, _converting_ it to an activity log, then _analysing_ it with the diary.

If you work out how to extract data from another source, please add it to this page so other people can use it!
