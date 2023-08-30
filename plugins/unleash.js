import { UnleashClient } from 'unleash-proxy-client'

export default ({ $config }, inject) => {
  const unleash = new UnleashClient({
    url: $config.UNLEASH_URL,
    clientKey: $config.UNLEASH_CLIENT_KEY,
    appName: 'default',
  })
  inject('unleash', unleash)

  unleash.start()

  unleash.on('ready', () => {
    inject('unleash', unleash)
  })
}
