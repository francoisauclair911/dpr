import createPersistedState from 'vuex-persistedstate'
export default ({ $unleash }) => {
  if ($unleash.isEnabled('stripe_embedded_checkout_refresh_fix')) {
    createPersistedState()(store)
  }
}
