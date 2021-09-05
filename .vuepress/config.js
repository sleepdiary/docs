const { description } = require('../package')
const sidebar = {};

const sidebarItems = [
    {
        text: 'Create a diary',
        link: '/create/',
        children: [
            '/create/formats',
            '/create/reconstructing',
        ],
    },
    {
        text: 'Sleeping patterns',
        link: '/patterns/',
        children: [
            '/patterns/day-length',
            '/patterns/late-sleep',
            '/patterns/sunlight',
        ],
    },
    {
        text: 'Contributing',
        link: '/contributing/',
        children: [
            '/contributing/maintainer-environment-recommendations',
            '/contributing/minimising-planned-maintenance',
            '/contributing/pull-request-review-checklist',
        ],
    },
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

module.exports = {
  title: 'Sleep Diary Docs',
  description: description,

  base: '/docs/',

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
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
