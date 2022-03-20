const { description } = require('../package')
const sidebar = {};

const sidebarItems = [
    {
        text: 'Create a diary',
        link: '/create/',
        children: [
            '/create/forms',
            '/create/reconstruct',
            '/create/formats',
        ],
    },
    {
        text: 'Sleeping patterns',
        link: '/patterns/',
        children: [
            '/patterns/late-sleep',
            '/patterns/day-length',
            '/patterns/sunlight',
            '/patterns/simulate',
            '/patterns/simulation-reference',
        ],
    },
    {
        text: 'Contribute',
        link: '/contribute/',
        children: [
            '/contribute/dev-environment',
            '/contribute/optimise-your-environment',
            '/contribute/security',
            '/contribute/minimise-planned-maintenance',
            '/contribute/pull-request-review-checklist',
            '/contribute/add-docs',
        ],
    },
    /* Copy/paste this to create a new directory:
    {
        text: 'Directory Title',
        link: '/path/',
        children: [
            // probably empty at first - do not explicitly include README.md
        ],
    },
    */
];

sidebarItems.forEach(
    item => sidebar[item.link] = sidebarItems.map(
        i => (
            ( i == item )
            ? i
            : {
                text: i.text,
                link: i.link,
            }
        )
    )
);

sidebar['/'] = sidebarItems.map(
    i => ({
        text: i.text,
        link: i.link,
    })
);


module.exports = {
  title: 'Sleep Diary Docs',
  description: description,

  base: '/docs/',

  head: [

    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],

    // Load part of the Leaflet library here - see Map.vue for the rest:
    [ 'link', {rel:"stylesheet", href:"https://unpkg.com/leaflet@1.7.1/dist/leaflet.css", integrity:"sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==", crossorigin:""}],
    [ 'link', {rel:"stylesheet", href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css", integrity:"sha512-10/jx2EXwxxWqCLX/hHth/vu2KY3jCF70dCQB8TSgNjbCVAC/8vai53GfMDrO2Emgwccf2pJqxct9ehpzG+MTw==", crossorigin:"anonymous", referrerpolicy:"no-referrer" }],
    [ 'link', {rel:"stylesheet", href:"https://unpkg.com/leaflet-extra-markers@1.2.1/dist/css/leaflet.extra-markers.min.css"}],

  ],

  theme: __dirname+'/theme/',
  themeConfig: {

    logo: '/../favicon.svg',
    logoDark: '/../favicon-dark.svg',

    repo: 'https://github.com/sleepdiary/docs',

    lastUpdated: true,

    contributors: false,

    sidebar,
  },

  plugins: [
    [
      '@vuepress/plugin-search',
    ],
  ],

}
