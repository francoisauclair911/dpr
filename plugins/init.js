export default async function ({
  store,
  route,
  app,
  $api,
  redirect,
  $gtm,
  error,
}) {
  const $i18n = app.i18n
  store.dispatch('url/parseURL', route)

  store.commit('languages/SET_I18N_LANGUAGES', $i18n.locales)
  store.dispatch('languages/switchLanguage', route.query.lang)

  try {
    await store.dispatch('settings/initialConfig')
  } catch (e) {
    if (e?.response?.status === 404) {
      window.onNuxtReady(() => {
        window.$nuxt.error({
          statusCode: 100,
        })
        // window.$nuxt._router.push('/404')
      })
    }
  }
}
