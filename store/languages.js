import iso from 'iso-639-1'

export const state = () => ({
  selected: null,
  pageLanguages: [],
  i18nLanguages: [],
})
export const mutations = {
  SET_SELECTED(state, language = null) {
    state.selected = language
  },
  SET_PAGE_LANGUAGES(state, languages = []) {
    state.pageLanguages = languages
  },
  SET_I18N_LANGUAGES(state, languages = []) {
    state.i18nLanguages = languages
  },
}
export const getters = {
  i18nLanguagesCodes(state) {
    return state.i18nLanguages.map((l) => l.code)
  },

  languages(state, getters) {
    const mergedAndUnique = [
      // ...new Set([...state.pageLanguages, ...getters.i18nLanguagesCodes]),
      ...new Set([...state.pageLanguages]),
    ]
    return iso.getLanguages(mergedAndUnique)
  },
}
export const actions = {
  switchLanguage({ commit }, languageCode = null) {
    commit('SET_SELECTED', languageCode)

    this.$i18n.setLocale(languageCode)

    const query = { ...this.$router.currentRoute.query, lang: languageCode }

    this.$router.replace({ query })
  },
}
