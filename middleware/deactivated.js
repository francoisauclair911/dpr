export default function ({ store, route }) {
  store.dispatch('url/parseURL', route)
}
