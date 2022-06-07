# Supported formats

<!-- This page was created automatically by bin/build_formats.js - see that file for details -->

We support the following formats:

<table><tr>
 <td><div style="height:40px;width:40px"></div></td>
 <td><a href="https://sleepdiary.github.io/core/src/Standard">Standardised diary format</a></td>
</tr>
<tr>
 <td><img style="height:40px;min-width:40px" src="http://www.squalllinesoftware.com/sites/squalllinesoftware.com/files/sleepmeter_logo_128x128.png"></td>
 <td><a href="https://sleepdiary.github.io/core/src/Sleepmeter">Sleepmeter</a></td>
</tr>
<tr>
 <td><img style="height:40px;min-width:40px" src="https://docs.sleep.urbandroid.org/assets/images/logo.png"></td>
 <td><a href="https://sleepdiary.github.io/core/src/SleepAsAndroid">Sleep as Android</a></td>
</tr>
<tr>
 <td><img style="height:40px;min-width:40px" src="https://raw.githubusercontent.com/vmiklos/plees-tracker/master/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png"></td>
 <td><a href="https://sleepdiary.github.io/core/src/PleesTracker">Plees Tracker</a></td>
</tr>
<tr>
 <td><img style="height:40px;min-width:40px" src="https://www.supermemo.com/assets/images/frontpage2/intro/icon4.svg"></td>
 <td><a href="https://sleepdiary.github.io/core/src/SleepChart1">SleepChart 1.0</a></td>
</tr>
<tr>
 <td><div style="height:40px;width:40px"></div></td>
 <td><a href="https://sleepdiary.github.io/core/src/ActivityLog">Activity Log</a></td>
</tr>
<tr>
 <td><img style="height:40px;min-width:40px" src="https://community.fitbit.com/html/assets/fitbit_logo_1200.png"></td>
 <td><a href="https://sleepdiary.github.io/core/src/Fitbit">fitbit</a></td>
</tr>
<tr>
 <td><div style="height:40px;width:40px"></div></td>
 <td><a href="https://sleepdiary.github.io/core/src/SpreadsheetTable">Spreadsheet Table</a></td>
</tr>
<tr>
 <td><div style="height:40px;width:40px"></div></td>
 <td><a href="https://sleepdiary.github.io/core/src/SpreadsheetGraph">Spreadsheet Graph</a></td>
</tr>
</table>

* if your format is in the list above but [the dashboard](/dashboard) can't load it, [let us know](https://github.com/sleepdiary/sleepdiary.github.io/issues/new?assignees=&labels=bug&template=bug_report.md&title=)
  * but see the tips below first if it's a hand-made spreadsheet
* if your format isn't in the list above, [contact us](https://github.com/sleepdiary/sleepdiary.github.io/issues/new?assignees=&labels=&template=feature_request.md&title=)

## Hand-made spreadsheets

<ImageFrame link="/create/SleepTable.xlsx" thumb="/create/SleepTable.png">
  A sleep table in<br/> an Excel spreadsheet
</ImageFrame>

<ImageFrame link="/create/SleepGraph.xlsx" thumb="/create/SleepGraph.png">
  A sleep graph in<br/>an Excel spreadsheet
</ImageFrame>

We try to support spreadsheets created as both _tables_ (lists of dates) and _graphs_ (coloured blocks).  Here are some tips to make sure we can read your diary:

* upload files in `.xlsx` format where possible
  * `.csv` tables are supported, but you may need to change your dates to [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601)
  * `.ods` files are not currently supported, but LibreOffice can save a copy in _Excel 2007-365_ format
* if your original file doesn't work, try copying the relevant bits into [the example table](SleepTable.xlsx) or [the example graph](SleepGraph.xlsx) and uploading that
* make sure your spreadsheet isn't storing dates as text
  * text is left-aligned by default, dates are right-aligned
