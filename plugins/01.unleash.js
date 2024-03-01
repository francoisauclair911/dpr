import { UnleashClient } from 'unleash-proxy-client'

export default defineNuxtPlugin(({ $config }) => {

  const nuxtApp = useNuxtApp()

  const unleash = new UnleashClient({
    url: $config.public.UNLEASH_URL,
    clientKey: $config.public.UNLEASH_CLIENT_KEY,
    appName: 'default',
  })

  unleash.start()
  unleash.on('ready', () => {
    inject('unleash', unleash)
  })

  return {
    provide: {
      unleash: unleash,
    }
  }

})
