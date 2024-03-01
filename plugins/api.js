import { handleError, handleRequest } from '~/utils/axios-handler'

export default defineNuxtPlugin(({ $config }) => {

  function createAxiosInstance(baseURL) {
    const instance = $fetch.create({
      baseURL,
      timeout: 28000,
      ssr: true,
      onRequest: (_) => {

      },
      onResponseError: (_, __, error) => {
        handleError(error, store, nuxtErrorThrower)
      }
    })

    return instance
  }

  const repositories = {
    country: createAxiosInstance($config.NUXT_COUNTRY_BASE_URL),
    asset: createAxiosInstance($config.NUXT_ASSET_BASE_URL),
    campaign: createAxiosInstance($config.NUXT_CAMPAIGN_BASE_URL),
    payment: createAxiosInstance($config.NUXT_PAYMENT_BASE_URL),
  }
  return {
    provide: {
      api: repositories,
    }
  }
})
