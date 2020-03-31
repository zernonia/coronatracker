import whitelister from 'purgecss-whitelister'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins&display=swap' }
    ]
  },
  purgeCSS: {
		whitelist: () => whitelister([
			'./assets/css/*.css',
			'./node_modules/*.css'
		])
	},
  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/loading.vue',
    // loading: false,
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/vue-autocomplete.js', ssr: false },
    { src: '~plugins/vue-table.js', ssr: false },
    { src: '~plugins/lottie-vuejs.js', ssr: false },
    { src: '~plugins/vue-leaflet.js', ssr: false },
    {
      src: '~/plugins/vue-apexcharts',
      ssr: false
    },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-leaflet',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
     
    }
  },
  
}
