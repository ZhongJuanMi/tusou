module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: '兔砸的窝',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['element-ui', 'axios', 'vue-cookie']
  },
  plugins: [{
      src: '~plugins/ElementUI',
      ssr: true
    }, {
      src: '~plugins/tkAxios',
      ssr: false
    },
    {
      src: '~plugins/VueCookie',
      ssr: false
    }
  ],
  css: [
    // 项目中的 CSS 文件
    '~assets/css/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    '~assets/css/my_element.scss'
  ],
  modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],
  proxy: {
    '/api/': {
      target: 'http://localhost:8000/api',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/'
      }
    }
  },
  router: {
    base: '/',
    fallback: true,
    middleware: 'auth'
  }
}
