import { DomainNotFound } from '~/exceptions'

export default defineNuxtPlugin(async ({ $i18n }) => {

  const route = useRoute()
  const utmsStore = useUtmsStore()
  const languagesStore = useLanguageStore()
  const settingsStore = useSettingsStore()

  utmsStore.parseURL(route)

  languagesStore.i18nLanguages = $i18n.locales
  languagesStore.switchLanguage(route.query.lang)

  try {
    await settingsStore.initialConfig()
  } catch (e) {
    // $sentry.captureException(e)
    // if (e instanceof DomainNotFound) {
    //   window.onNuxtReady(() => {
    //     window.$nuxt.error({
    //       statusCode: 404,
    //       message: $i18n.t('pages.error.domain_not_found'),
    //     })
    //   })
    // }
  }
});