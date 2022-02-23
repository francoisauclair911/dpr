import { handleError, handleRequest } from '~/utils/axios-handler'
export default function ({ $axios, $config, store }, inject) {
  function createAxiosInstance(baseURL) {
    const instance = $axios.create({
      baseURL,
      timeout: 28000,
      ssr: true,
    })
    instance.onError((error) => handleError(error, store))
    instance.onRequest((config) => handleRequest(config, store))

    return instance
  }
  const repositories = {
    country: createAxiosInstance($config.COUNTRY_BASE_URL),

    campaign: createAxiosInstance($config.CAMPAIGN_BASE_URL),
  }
  inject('api', repositories)
}
