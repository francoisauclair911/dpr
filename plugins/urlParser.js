export default function ({ store, route, app }) {
  const $i18n = app.i18n
  store.dispatch('url/parseURL', route)
  store.commit('languages/SET_I18N_LANGUAGES', $i18n.locales)
  store.dispatch('languages/switchLanguage', route.query.lang)
}
