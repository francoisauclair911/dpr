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
    if (e.constructor.name === 'AdraException' && e.code === '001') {
      window.onNuxtReady(() => {
        console.log('errrrr')
        // window.$nuxt.$router.push('/404')
        return window.$nuxt.error({
          statusCode: 404,
          message: 'Your error message',
        })
      })
    }
  }
}
