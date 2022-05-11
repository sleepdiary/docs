#!/usr/bin/env node

const fs = require('fs');
const child_process = require('child_process');

const base_dir = __filename.replace(/[^\/]*$/,`..`);

const icons = {
    // make sure to synchronise this list with the one in docs/.../Map.vue
    physician : 'fa-user-doctor',
    researcher: 'fa-user-graduate',
};

function zero_pad(n,len) {
    n = n.toString();
    while ( n.length < (len||2) ) n = '0'+n;
    return n;
}

const edit_warning = `<!--

  DO NOT EDIT THIS FILE DIRECTLY

  See https://github.com/sleepdiary/docs/blob/main/bin/generate-from-resources.js

 -->`;

function nlbr(text) {
    return text.replace(/\n/g,'<br/>');
}

function build_procedure(specialist) {

    let ret = '', index = 1, prefix, postfix,
        process_section = (required,values,other,message) => {
            if ( required ) {
                other = nlbr((other||'').replace(/\s*$/,""));
                postfix = other ? "   <br/>" + other + "\n" : "";
                switch ( values.map( v => !!v ).reduce( (prev,cur) => prev+(cur?1:0), 0 ) ) {
                case 0:
                    ret += `${index++}. ${other}\n`;
                    return false;
                case 1:
                    prefix = `${index++}. `;
                    return true;
                default:
                    ret += `${index++}. ${message}\n`;
                    prefix = "   * ";
                    return true;
                }
            }
        }
        ;

    if ( process_section(
        specialist.registration_required,
        [ specialist.registration_url, specialist.registration_tel, specialist.registration_fax ],
        specialist.registration_other,
        "register as a patient"
    ) ) {
        if ( specialist.registration_url ) {
            ret += `${prefix}[register as a patient online](${specialist.registration_url})\n`;
        }
        if ( specialist.registration_tel ) {
            ret += `${prefix}call <a href="tel:${specialist.registration_tel}">\`${specialist.registration_tel}\`</a> to register as a patient\n`;
        }
        if ( specialist.registration_fax ) {
            ret += `${prefix}fax <a href="tel:${specialist.registration_fax}">\`${specialist.registration_fax}\`</a> to register as a patient\n`;
        }
        ret += postfix;
    }

    if ( process_section(
        specialist.booking_required,
        [ specialist.booking_url, specialist.booking_tel, specialist.booking_fax ],
        specialist.booking_other,
        "book an appointment"
    ) ) {
        if ( specialist.booking_url ) {
            ret += `${prefix}[book an appointment online](${specialist.booking_url})\n`;
        }
        if ( specialist.booking_tel ) {
            ret += `${prefix}call <a href="tel:${specialist.booking_tel}">\`${specialist.booking_tel}\`</a> to book an appointment\n`;
        }
        if ( specialist.booking_fax ) {
            ret += `${prefix}fax <a href="tel:${specialist.booking_fax}">\`${specialist.booking_fax}\`</a> to book an appointment\n`;
        }
        ret += postfix;
    }

    let docs_before_first = [], docs_between_appointments = [];
    [ specialist.forms, specialist.reports ].forEach(
        list => (list||[]).forEach( doc => {
            if ( doc.use_before_first         != "no" ) docs_before_first        .push(doc);
            if ( doc.use_between_appointments != "no" ) docs_between_appointments.push(doc);
        })
    );

    if ( process_section(
        specialist.before_first || docs_before_first.length,
        docs_before_first,
        specialist.before_first,
        "before your first appointment&hellip;"
    ) ) {
        const message = {
            form: {
                maybe: 'you may need to fill out a',
                yes  : 'fill out a',
            },
            report: {
                maybe: 'you may be shown',
                yes  : 'look at',
            },
        };
        docs_before_first.forEach( doc => {
            if ( !message[doc.doc_type][doc.use_before_first] ) {
                throw Error(`Please add message[${doc.doc_type}][${doc.use_before_first}] in ${doc.short_name}`);
            }
            ret += `${prefix}${message[doc.doc_type][doc.use_before_first]} [${doc.short_name}](${doc.url})\n`;
        });
        ret += postfix;
    }

    if ( process_section(
        true,
        specialist.appointment_types.filter( t => t != "other" ),
        specialist.appointment_other,
        "attend one or more appointments"
    ) ) {
        specialist.appointment_types.forEach( type => {
            switch ( type ) {
            case 'in-person':
                ret += `${prefix}go to appointments at ${(specialist.locations.length==1)?'their office':'one of their offices'}\n`;
                break;
            case 'by-phone':
                ret += `${prefix}talk to a specialist over the phone at agreed times\n`;
                break;
            case 'by-voip':
                ret += `${prefix}talk to a specialist online in real-time (e.g. they might use Skype or Zoom)\n`;
                break;
            case 'by-email':
                ret += `${prefix}talk to a specialist online (e.g. they might use e-mail or a web portal)\n`;
                break;
            case 'other':
                // handled by process_section()
                break;
            }
        });
        ret += postfix;
    }

    if ( process_section(
        specialist.between_appointments || docs_between_appointments.length,
        docs_between_appointments,
        specialist.between_appointments,
        "between appointments&hellip;"
    ) ) {
        const message = {
            form: {
                maybe: 'you may need to fill out a',
                yes  : 'fill out a',
            },
            report: {
                maybe: 'you may be shown a',
                yes  : 'look at a',
            },
        };
        docs_between_appointments.forEach( doc => {
            if ( !message[doc.doc_type][doc.use_between_appointments] ) {
                throw Error(`Please add message[${doc.doc_type}][${doc.use_between_appointments}] in ${doc.short_name}`);
            }
            ret += `${prefix}${message[doc.doc_type][doc.use_between_appointments]} [${doc.short_name}](${doc.url})\n`;
        });
        ret += postfix;
    }

    if ( process_section(
        true,
        specialist.outcomes.filter( t => t != "other" ),
        specialist.outcome_other,
        "outcomes include..."
    ) ) {
        specialist.outcomes.forEach( type => {
            switch ( type ) {
            case 'diagnose':
                ret += `${prefix}they will aim to diagnose your condition\n`;
                break;
            case 'treat':
                ret += `${prefix}they will aim to offer treatment\n`;
                break;
            case 'refer':
                ret += `${prefix}they may refer you to a specialist for a rare condition\n`;
                break;
            case 'explain':
                ret += `${prefix}they will explain relevant research outcomes when possible\n`;
                break;
            case 'other':
                // handled by process_section()
                break;
            }
        });
        ret += postfix;
    }

    return ret;
}

function generate(resources) {

    resources = JSON.parse(resources);

    /*
     * specialists/README.md
     */

    let markers = [];

    let specialists_md = `${edit_warning}

<Map style="margin-top:1em" :markers="markers"/>

## Specialists
`;

    resources.specialist.records
        .map( specialist => {

            specialist.locations.forEach( location => {
                const href = '#'+specialist.name.value.toLowerCase().replace(/[^\w]+/g,'-').replace(/^-*|-*$/g,'');
                const type_icon = 'fas '+icons[specialist.specialist_type];
                const type_text = specialist.specialist_type.charAt(0).toUpperCase() + specialist.specialist_type.substr(1);
                const is_direct = location.referral_types.includes('direct');
                const contact_icon = is_direct ? 'fas fa-circle' : 'fas fa-square';
                const contact_text = is_direct ? 'Can be contacted directly' : 'Must be referred by another specialist';
                const location_text =
                      (
                          location.has_name
                          ? '<em>'+nlbr(location.short_name)+'</em><br/>'
                          :''
                      ) + nlbr(location.address)
                ;
                markers.push({
                    z_index_offset: is_direct ? 1000 : 0,
                    location: location.gps,
                    icon: specialist.specialist_type,
                    shape: is_direct ? 'circle' : 'square',
                    tooltip: location.short_name,
                    popup:
                    `<div class="specialist-popup">` +
                      `<div class="specialist-popup-header">${specialist.name.value}</div>` +
                      `<div class="specialist-popup-key fas fa-location-dot"></div>` +
                      `<div class="specialist-popup-value">${location_text}</div>` +
                      `<div class="specialist-popup-key ${contact_icon}"></div>` +
                      `<div class="specialist-popup-value">${contact_text}</div>` +
                      `<div class="specialist-popup-key ${type_icon}"></div>` +
                      `<div class="specialist-popup-value">${type_text}</div>` +
                      `<a class="specialist-popup-footer" href="${href}">Learn more</a>` +
                    `</div>`
                })
            });

            const locations
                  = specialist.locations
                  .map(
                      location =>
                      `<div class="specialist-location">` +
                        `<div class="specialist-location-key fas fa-location-dot"></div>` +
                        `<div>` +
                          (location.has_name?'<em>'+location.short_name+'</em><br/>':'') +
                          nlbr(location.address) +
                        `</div>\n` +
                        (
                            location.tel
                            ? `<div class="specialist-location-key fas fa-phone"></div>` +
                              `<a class="specialist-location-value" href="tel:${location.tel}">${location.tel}</a>\n`
                            : ''
                        ) +
                        (
                            location.fax
                            ? `<div class="specialist-location-key fas fa-fax"></div>` +
                              `<a class="specialist-location-value" href="tel:${location.fax}">${location.fax}</a>\n`
                            : ''
                        ) +
                        (
                          location.url
                          ?
                            `<div class="specialist-location-key fas fa-link"></div>` +
                            `<a class="specialist-location-value" href="${location.url}" target="_blank" rel="noopener noreferrer">visit website<span><ExternalLinkIcon/><span class="external-link-icon-sr-only">open in new window</span></span></a>\n`
                          : ''
                        ) +
                        `<div class="specialist-location-key fas fa-map"></div>` +
                        `<a class="specialist-location-value" href="https://maps.google.com/maps/@${location.gps.join()},19z" target="_blank" rel="noopener noreferrer">view map<span><ExternalLinkIcon/><span class="external-link-icon-sr-only">open in new window</span></span></a>\n`
                        +
                      `</div>\n`
                  );

            specialists_md += [

                `
### ${specialist.name.value}\n\n`,

                (specialist.forms||[])
                    .map( item =>
                        `<ImageFrame :classes="['reactive']" link="${item.url}" base="" thumb="/..${item.thumb}">
  ${nlbr(item.has_name?item.short_name:'You may be asked<br>to fill out this form')}
</ImageFrame>

`).join(''),
                (specialist.reports||[])
                    .map( item =>
                        `<ImageFrame :classes="['reactive']" link="${item.url}" base="" thumb="/..${item.thumb}">
  ${nlbr(item.has_name?item.short_name:'You may be shown this report')}
</ImageFrame>

`).join(''),

                specialist.description,

                specialist.url
                ? `

<div><span class="software-key fas fa-link"></span>&nbsp;<a href="${specialist.url}">Front page</a></div>`
                : ''
                ,

                `

<ShowOnClick>

<template v-slot:header>

#### Location${ ( locations.length == 1 ) ? '' : 's' }

</template>

${locations.join('\n')}

</ShowOnClick>

<ShowOnClick>

<template v-slot:header>

#### Procedure

</template>
`,

                ( specialist.procedure_type == 'researched' )
                    ? `
::: tip
This is a summary of the procedure on their site.  [Let us know](https://github.com/sleepdiary/resources/issues/new?template=procedure-feedback.md&title=Feedback+about+the+procedure+for+${encodeURIComponent(specialist.name.value)}) how things work in reality!
:::
` : '',

                `
${build_procedure(specialist)}
</ShowOnClick>
`
            ].join('');

            specialists_md += `
<div class="page-meta" style="clear:both;padding: 0 1em">

[Provide&nbsp;feedback&nbsp;about&nbsp;this&nbsp;specialist](https://github.com/sleepdiary/resources/issues/new?template=entity-feedback.md&title=Feedback+for+${encodeURIComponent(specialist.name.value)}) <EntryUpdated date="${specialist.last_updated}"/>

</div>
`;

        });

    specialists_md += `

## Add a new specialist

<ImageFrame :classes="['reactive']" link="/../resources/new-specialist.html" thumb="/specialists/add.png">
  You will need<br>to fill out this form
</ImageFrame>

If you're a sleep specialist, or have visited one, please [tell us about it](/resources/new-specialist.html)!

<ShowOnClick>

<template v-slot:header>

#### Procedure

</template>

1. [fill out the &ldquo;new specialist&rdquo; form](/resources/new-specialist.html)
2. send the form to us
   * [create a GitHub account](https://github.com/signup) and create an issue
   * download the form data (if you're already in touch with a developer)
3. discuss the issue and review proposed updates before publishing
4. we will aim to add a new section to this page

</ShowOnClick>

<style>
.specialist-popup,
.specialist-location {
  display: grid;
  grid-template-columns: 2em 1fr;
  grid-template-rows: repeat(3, min-content);
}
.specialist-popup {
  width:300px;
  max-width:50vw;
}
.specialist-location {
  margin-bottom: 2em;
}
.specialist-popup-header {
  grid-column-start: 1;
  grid-column-end: 3;
  padding: 1em 0;
  font-weight: bold;
  text-align: center;
}
.specialist-popup-key,
.specialist-location-key {
  grid-column: 1;
  margin-top: 1px;
  font-size: 1em;
  text-align: center;
}
.specialist-location-key {
  margin-top: 4px;
}
.specialist-popup-value,
.specialist-location-value {
  grid-column: 2;
}
.specialist-popup-footer {
  grid-column-start: 1;
  grid-column-end: 3;
  display: block;
  text-align: center;
  padding-top: 1em
}

</style>

<script>
export default {
  data() {
    return {
      markers: ${JSON.stringify(markers)},
    };
  },
}
</script>
`;

    /*
     * specialists/software.md
     */

        let software_md = `# Software

${edit_warning}

Here are some programs to help you track your sleep.  The galleries below all represent the same data, taken from [our common sleep diaries](https://sleepdiary.github.io/resources/common_sleep_diaries/).

`;

    resources.software.records
        .forEach( source => {
            software_md += `## ${source.name.value}

<ImageFrame :classes="['reactive']" link="${source.url}" base="" thumb="/..${source.thumb}">
  ${source.name.value}
</ImageFrame>

${source.description}
`;
            if ( source.url ) {
                software_md += `<div><span class="software-key fas fa-link"></span><a href="${source.url}">Home page</a></div>\n`;
            }
            if ( source.dev_url ) {
                software_md += `<div><span class="software-key fas fa-code"></span><a href="${source.dev_url}">Developer site</a></div>\n`;
            }
            if ( source.file_format ) {
                software_md += `<div><span class="software-key fas fa-file-code"></span><a href="${source.file_format}">File format</a></div>\n`;
            }
            if ( source.business_model ) {
                software_md += `<div><span class="software-key fas fa-money-check-dollar"></span>${source.business_model}</div>\n`;
            }
            if ( source.platforms ) {
                const custom_platforms = {
                    website: 'fa-globe',
                    watch: 'fa-clock',
                    ios: 'fa-brands fa-apple',
                };
                software_md += (
                    `<div><span class="software-key fas fa-computer"></span>` +
                    source.platforms.map(
                        platform => `<span class="software-value fas ${custom_platforms[platform]||'fa-brands fa-'+platform}" title="${platform.charAt(0).toUpperCase()+platform.substr(1)}"></span>`
                    ).join('') +
                    `</div>\n`
                );
            }

            software_md += `
<ShowOnClick>

<template v-slot:header>

#### Procedure

</template>

${source.procedure}
</ShowOnClick>
`;

            if ( source.forms || source.reports ) {

                let images = [];
                ['forms','reports'].forEach( fr_key =>
                    (source[fr_key]||[]).forEach( fr =>
                        images = images.concat(fr.gallery||[])
                    )
                );

                software_md += `
<div style="clear:both"></div>

<ShowOnClick>

<template v-slot:header>

#### Gallery

</template>

<ImageGallery :images='${JSON.stringify(images)}'/>

</ShowOnClick>
`;

            }

            software_md += `
<div class="page-meta" style="clear:both;padding: 0 1em">

[Provide&nbsp;feedback&nbsp;about&nbsp;this&nbsp;software](https://github.com/sleepdiary/resources/issues/new?template=entity-feedback.md&title=Feedback+for+${encodeURIComponent(source.name.value)}) <EntryUpdated date="${source.last_updated}"/>

</div>

`;

        });

    software_md += `
## Add new software

<ImageFrame :classes="['reactive']" link="/../resources/new-software.html" thumb="/create/add-software.png">
  You may be asked<br>to fill out this form
</ImageFrame>

If you know about another piece of software, please [tell us about it](/resources/new-software.html)!

<ShowOnClick>

<template v-slot:header>

#### Procedure

</template>

1. [fill out the &ldquo;new software&rdquo; form](/resources/new-software.html)
2. send the form to us
   * [create a GitHub account](https://github.com/signup) and create an issue
   * download the form data (if you're already in touch with a developer)
3. discuss the issue and review proposed updates before publishing
4. we will aim to add a new section to this page

</ShowOnClick>

<style>
.software-key,
.software-value {
  display: inline-block;
  margin-top: 1px;
  font-size: 1em;
  text-align: center;
  width: 2em;
}
.software-value {
  width: 1.25em;
}
</style>
`


    /*
     * specialists/forms.md
     */

    let rows = {
        forms: [],
        reports: [],
        events: []
    };

    [].concat(resources.specialist.records,resources.software.records)
        .forEach( source => {
            ['forms','reports'].forEach( fr_key =>
                (source[fr_key]||[]).forEach( fr => {
                    if ( fr.layout == "calendar" ) {
                        fr.Source = {
                            key: source.name.key,
                            value: `<a href="${fr.url}">${fr.display_name}</a>`
                        };
                        rows[fr_key].push(fr);
                        (fr.events||[]).forEach( event =>
                            rows.events.push({
                                Source: {
                                    key: source.name.key,
                                    value: `<a href="${fr.url}">${fr.display_name}</a>`
                                },
                                Event: event.key,
                                Description: event.value,
                            })
                        );
                    }
                })
            );
        });

    const forms_md = `# Forms and reports

${edit_warning}

Before you make a new form, you might like to take some inspiration from some that already exist.  Or see [the list of specialists](./) to see what your doctor is likely to ask for.

## Forms

A &ldquo;form&rdquo; is a document you fill out.  This section compares the durations and layouts for different forms.

<SortableTable :columns="forms_reports_columns" :rows="forms_rows" />

## Reports

A &ldquo;report&rdquo; is a document generated based on the information in a form.  This section compares the durations and layouts for different reports.

<SortableTable :columns="forms_reports_columns" :rows="reports_rows" />

## Events

An &ldquo;event&rdquo; is anything that happens during a day, which someone might think is relevant to your sleep.  Diaries can ask people to fill out different events, and can use different symbols to represent them.  The table below summarises all known events.

<SortableTable :columns="events_columns" :rows="events_rows" />

<script>
export default {
  data() {
    return {
      forms_reports_columns: [
        { key: 'Source'         , value: 'Source' },
        { key: 'page_duration'  , value: 'page duration' },
        { key: 'total_pages'    , value: 'total pages' },
        { key: 'start_time'     , value: 'start time' },
        { key: 'inbed_marker'   , value: 'in-bed marker' },
        { key: 'outofbed_marker', value: 'out-of-bed marker' },
        { key: 'sleep_marker'   , value: 'sleep marker' },
      ],
      events_columns: [
        { key: 'Source'     , value: 'Source' },
        { key: 'Event'      , value: 'Event' },
        { key: 'Description', value: 'Description' },
      ],
      forms_rows: ${JSON.stringify(rows.forms)},
      reports_rows: ${JSON.stringify(rows.reports)},
      events_rows: ${JSON.stringify(rows.events)},
    };
  },
};
</script>
`;

    /*
     * Write files once everything else has succeeded
     */

    fs.writeFileSync('specialists/README.md', specialists_md);
    fs.writeFileSync('create/software.md', software_md);
    fs.writeFileSync('create/forms.md', forms_md);

}

if ( fs.existsSync(`${base_dir}/../resources/Makefile`) ) {
    child_process.execFileSync(`make`,[`-C`,`${base_dir}/../resources/`]);
    generate(fs.readFileSync(`${base_dir}/../resources/entities.json`));
} else {
    const https = require('https');
    https.get(
        'https://raw.githubusercontent.com/sleepdiary/resources/built/entities.json',
        res => {
            let json = '';
            res.on('data', data => json += data);
            res.on('end' , () => generate(json));
        }
    );
}
