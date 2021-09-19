const { description } = require('../package')
const sidebar = {};

const sidebarItems = [
    {
        text: 'Create a diary',
        link: '/create/',
        children: [
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
