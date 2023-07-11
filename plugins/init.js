import { DomainNotFound } from '~/exceptions'
export default async function ({
  store,
  route,
  app,
  $api,
  $sentry,
  redirect,
  $gtm,
  error,
}) {
  console.log('🚀  init')

  const $i18n = app.i18n
  store.dispatch('url/parseURL', route)

  store.commit('languages/SET_I18N_LANGUAGES', $i18n.locales)
  store.dispatch('languages/switchLanguage', route.query.lang)

  try {
    await await store.dispatch('settings/initialConfig')
  } catch (e) {
    $sentry.captureException(e)
    if (e instanceof DomainNotFound) {
      window.onNuxtReady(() => {
        window.$nuxt.error({
          statusCode: 404,
          message: $i18n.t('pages.error.domain_not_found'),
        })
      })
    }
  }
}
