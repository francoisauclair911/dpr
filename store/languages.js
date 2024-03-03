import iso from 'iso-639-1'
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    selected: null,
    pageLanguages: [],
    i18nLanguages: [],
  }),
  getters: {
    i18nLanguagesCodes(state) {
      return state.i18nLanguages.map((l) => l.code)
    },

    languages(state) {
      const mergedAndUnique = [
        // hello darkness my old friend.... its me again
        // .... yeah we haven found a good solution for that yet....
        // ...new Set([...state.pageLanguages, ...getters.i18nLanguagesCodes]),
        ...new Set([...state.pageLanguages]),
      ]
      return iso.getLanguages(mergedAndUnique)
    },
  },
  actions: {

    switchLanguage(languageCode = null) {
      const { $i18n } = useNuxtApp()
      const router = useRouter()

      if (!languageCode) {
        languageCode = $i18n.locale
      }

      this.selected = languageCode
      $i18n.locale = languageCode
      // $i18n.setLocale(languageCode)
      const query = { ...router.currentRoute.query, lang: languageCode }
      router.replace({ query })
    },
    // SET_SELECTED(state, language = null) {
    //   state.selected = language
    // },
    setPageLanguages(languages = []) {
      this.pageLanguages = languages
    },
    // SET_I18N_LANGUAGES(state, languages = []) {
    //   state.i18nLanguages = languages
    // },
  }
});
