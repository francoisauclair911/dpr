import { DomainNotFound } from '~/exceptions'

export default defineNuxtPlugin(async (nuxtApp) => {

  const route = useRoute()
  const utmsStore = useUtmsStore()
  const languagesStore = useLanguageStore()
  const settingsStore = useSettingsStore()

  const $i18n = nuxtApp.$i18n

  utmsStore.parseURL(route)

  languagesStore.i18nLanguages = $i18n.locales
  languagesStore.switchLanguage(route.query.lang)

  try {
    await settingsStore.initialConfig()
  } catch (e) {
    // $sentry.captureException(e)
    if (e instanceof DomainNotFound) {
      createError({
        statusCode: 404,
        message: $i18n.t('pages.error.domain_not_found'),
      })
    }
  }
});