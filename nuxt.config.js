import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    // "@adra-network/i18n-module",
    "@nuxtjs/i18n",
    // '@nuxtjs/sentry',
  ],
  // adraI18n: {
  //   enabled: true, // Enable or disable the i18n features
  //   langDir: "lang", // Directory of language JSON files
  //   apiKey: "adskglkasd", // Your API key for the translation service
  // },
  pinia: {
    storesDirs: ['./store/**'],
  },
  // sentry: {
  //   dsn: process.env.NUXT_SENTRY_DSN || '',
  //   // https://sentry.nuxtjs.org/sentry/options
  //   config: {
  //     environment: process.env.NUXT_ENV || 'local',
  //     release:
  //       'aws-frontend-donation-receiver@' + process.env.NUXT_CI_COMMIT_SHORT_SHA,
  //   },
  // },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  runtimeConfig: {
    public: {
      isDev: process.env.NUXT_IS_DEVELOPMENT == 'true' || false,
      ADRA_DEBUG: process.env.NUXT_ADRA_DEBUG || false,
      STRIPE_PUBLISHABLE_KEY: process.env.NUXT_STRIPE_PUBLISHABLE_KEY,
      STRIPE_API_VERSION: process.env.NUXT_STRIPE_API_VERSION,
      STRIPE_API_BETAS: process.env.NUXT_STRIPE_API_BETAS,
      DONATION_PAGE_BASE_URL: process.env.NUXT_APP_URL,
      FINGERPRINT_JS_PK: process.env.NUXT_FINGERPRINT_JS_PK,
      UNLEASH_CLIENT_KEY: process.env.NUXT_UNLEASH_CLIENT_KEY,
      UNLEASH_URL:
        process.env.NUXT_UNLEASH_URL ||
        'https://us.app.unleash-hosted.com/usgg0024/api/frontend',
      COUNTRY_BASE_URL: process.env.NUXT_COUNTRY_BASE_URL,
      CAMPAIGN_BASE_URL: process.env.NUXT_CAMPAIGN_BASE_URL,
      PAYMENT_BASE_URL: process.env.NUXT_PAYMENT_BASE_URL,
      ASSET_BASE_URL: process.env.NUXT_ASSET_URL,
      IS_PRODUCTION: process.env.NUXT_NODE_ENV === 'production',
      SENTRY_SAMPLE_RATE: process.env.NUXT_SENTRY_SAMPLE_RATE || 0.1,
      FEATURES: {
        LIVE_PAYMENT: process.env.NUXT_FEATURES_LIVE_PAYMENT || true,
      },
    },
  }
})
