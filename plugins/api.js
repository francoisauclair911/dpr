import { handleError, handleRequest } from '~/utils/axios-handler'

export default defineNuxtPlugin(({ $config }) => {

  function createAxiosInstance(baseURL) {
    const instance = $fetch.create({
      baseURL,
      timeout: 28000,
      ssr: true,
      onRequest: (_) => {

      },
      onResponseError: (error) => {
        handleError(error)
      }
    })

    return instance
  }

  const repositories = {
    country: createAxiosInstance($config.public.COUNTRY_BASE_URL),
    asset: createAxiosInstance($config.public.ASSET_BASE_URL),
    campaign: createAxiosInstance($config.public.CAMPAIGN_BASE_URL),
    payment: createAxiosInstance($config.public.PAYMENT_BASE_URL),
  }
  return {
    provide: {
      api: repositories,
    }
  }
})
