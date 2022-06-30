import { handleError, handleRequest } from '~/utils/axios-handler'
export default function (
  { $axios, $config, store, error: nuxtErrorThrower },
  inject
) {
  function createAxiosInstance(baseURL) {
    const instance = $axios.create({
      baseURL,
      timeout: 28000,
      ssr: true,
    })
    instance.onError((error) => handleError(error, store, nuxtErrorThrower))
    // instance.onRequest((config) =>
    //   handleRequest(config, store, nuxtErrorThrower)
    // )

    return instance
  }
  const repositories = {
    country: createAxiosInstance($config.COUNTRY_BASE_URL),
    asset: createAxiosInstance($config.ASSET_BASE_URL),
    campaign: createAxiosInstance($config.CAMPAIGN_BASE_URL),
    payment: createAxiosInstance($config.PAYMENT_BASE_URL),
  }
  inject('api', repositories)
}
