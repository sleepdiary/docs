const { description } = require('../package')

module.exports = {
  title: 'Sleep Diary Docs',
  description: description,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  theme: __dirname+'/theme/',
  themeConfig: {

    repo: 'https://github.com/sleepdiary/docs',

    lastUpdated: true,

    contributors: false,

    sidebar: [
        {
            text: 'Create a diary',
            link: '/create/',
            children: [
                '/create/formats',
                '/create/reconstructing',
            ]
        },
        {
            text: 'Sleeping patterns',
            link: '/patterns/',
            children: [
                '/patterns/day-length',
                '/patterns/late-sleep',
                '/patterns/sunlight',
            ]
        },
        {
            text: 'Development',
            link: '/development/',
            children: [
                '/development/maintainer-environment-recommendations',
                '/development/minimising-planned-maintenance',
                '/development/pull-request-review-checklist',
            ]
        },
    ],
  },

  plugins: [
    [
      '@vuepress/plugin-search',
    ],
  ],

}
