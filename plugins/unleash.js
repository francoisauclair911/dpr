import { UnleashClient } from 'unleash-proxy-client'

export default ({ store }, inject) => {
  const unleash = new UnleashClient({
    url: 'https://us.app.unleash-hosted.com/usgg0024/api/frontend',
    clientKey:
      '*:development.c7a08fc852c0e232db2ecaed683d3e146f8628cd55eb2ac99ff4aa4e',
    appName: 'default',
  })
  inject('unleash', unleash)

  unleash.start()

  unleash.on('ready', () => {
    inject('unleash', unleash)
  })
}
