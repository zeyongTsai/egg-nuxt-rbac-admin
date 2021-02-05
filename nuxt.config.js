/*
 * @Author: caizeyong
 * @Date: 2021-01-15 13:08:43
 * @Description: nuxt 配置
 */
const resolve = require('path').resolve;
module.exports = {
  alias: {
    '@': resolve(__dirname, './nuxt'),
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'egg-vue-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'normalize.css/normalize.css',
    'element-ui/lib/theme-chalk/index.css',
    '@/styles/element-variables.scss',
    '@/styles/index.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    { src: '@/plugins/svg-icon', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/router-extras',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: '/api'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
    extend (config, { isClient, loaders }) {
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.exclude = [resolve(__dirname, './nuxt/plugins/svg')]

        config.module.rules.push({
          test: /\.svg$/,
          include: [resolve(__dirname, './nuxt/plugins/svg')],
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                symbolId: 'icon-[name]'
              }
            }
          ]
        })
      return config
    }
  },
  telemetry: false,
  srcDir: './nuxt/',
  router: {
    middleware: ['auth']
  }
}
