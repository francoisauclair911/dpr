export default function ({ $axios, $config, store }, inject) {
  inject('clone', (item) => JSON.parse(JSON.stringify(item)))
  inject('success', (text) => store.dispatch('notifications/success', text))
  inject('error', (text) => store.dispatch('notifications/danger', text))
  store.dispatch('helpers/getCountries')
  store.dispatch('helpers/getTitles')
}
