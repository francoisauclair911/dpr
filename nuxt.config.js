import colors from 'vuetify/es5/util/colors'
import { defineNuxtConfig } from '@nuxt/bridge'

const baseCognitoURL = process.env.AWS_COGNITO_BASE_URL
const isProduction = process.env.NODE_ENV === 'production'
console.log('\x1b[32;1m%s\x1b[0m  ', '=> isProduction', isProduction)

// If production or secure localhost then we resort to https, else http
const httpProtocol = isProduction
  ? 'https://'
  : process.env.APP_URL === 'localhost'
  ? 'https://'
  : 'http://'

export default defineNuxtConfig({
  // Fix for using sentry and nuxt bridge
  alias: {
    tslib: 'tslib/tslib.es6.js',
  },
  bridge: {
    nitro: false,
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // nitro: {
  //   preset: 'lambda',
  // },
  ssr: false,
  generate: {
    crawler: false,
    // https://nuxtjs.org/deployments/netlify/#for-client-side-rendering-only
    fallback: true,
  },
  router: {
    routeNameSplitter: '/',
    middleware: 'organization-switch',
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - aws-frontend-donation-campaign-manager',
    title: 'aws-frontend-donation-campaign-manager',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/adra',
    { src: '~/plugins/axios', ssr: true },
    '~/plugins/iso',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@adra-network/nuxt-design-module',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
  ],
  sentry: {
    dsn: 'https://0cc2c7d4a878494d8b25ee46b7b12fe6@sentry.adra.cloud/19',
    // https://sentry.nuxtjs.org/sentry/options
    config: {
      environment: process.env.ENVIRONMENT_NAME || 'local',
      release:
        'aws-frontend-donation-campaign-manager@' +
        process.env.CI_COMMIT_SHORT_SHA,
      // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
    },
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.js',
      },
      {
        code: 'es',
        file: 'es-ES.js',
      },
      {
        code: 'fr',
        file: 'fr-FR.js',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: process.env.API_URL,
    proxyHeaders: true,
    // proxy: true,
  },

  auth: {
    plugins: [
      { src: '~/plugins/axios', ssr: true },
      { src: '~/plugins/api.js', ssr: true },
      { src: '~/plugins/auth.js', ssr: true },
    ],
    strategies: {
      awsCognito: {
        scheme: 'oauth2',
        endpoints: {
          authorization: `${baseCognitoURL}/login`,
          token: `${baseCognitoURL}/oauth2/token`,
          userInfo: `${baseCognitoURL}/oauth2/userInfo`,
          logout: `${baseCognitoURL}/logout`,
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 3600,
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        responseType: 'code',
        grantType: 'authorization_code',
        redirectUri: httpProtocol + process.env.APP_URL + '/login/',
        // This needs to be the exact same as the one setup in cognito console
        logoutRedirectUri: httpProtocol + process.env.APP_URL + '/',
        clientId: process.env.AWS_COGNITO_CLIENT_ID,
        scope: ['email', 'openid', 'profile', 'phone'],
        codeChallengeMethod: 'S256',
      },
    },
  },
  adra: {
    fonts: {
      montserrat: true,
      zillaSlab: true,
      kaushanScript: false,
      authenia: false,
    },
    icons: {
      mdi: true,
      fa: false,
    },
    vuetify: {
      treeShake: true,
      customVariables: ['~/assets/variables.scss'],
    },
  },
  vuetify: {},
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [],
  },
  publicRuntimeConfig: {
    DONATION_PAGE_BASE_URL: 'https://donations.adra.cloud',
    STRIPE_PK_KEY: 'pk_live_kFHoGrq13mbo0CCf5nptfLZQ',
    APP_VERSION_V2: process.env.CI_COMMIT_REF_NAME,
    GIT_COMMIT_SHA: process.env.CI_COMMIT_SHORT_SHA,
    AWS_COGNITO_USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID,
    AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID,
    AWS_COGNITO_BASE_URL: process.env.AWS_COGNITO_BASE_URL,
    USO_BASE_URL: process.env.USO_BASE_URL,
    COUNTRY_BASE_URL: process.env.COUNTRY_BASE_URL,
    CAMPAIGN_BASE_URL: process.env.CAMPAIGN_BASE_URL,
    SENTRY_SAMPLE_RATE:
      process.env.SENTRY_SAMPLE_RATE || isProduction ? 0.2 : 0,
    features: {
      notification: false,
    },
  },
  privateRuntimeConfig: {},
})
