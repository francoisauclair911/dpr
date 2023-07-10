import axios from 'axios'
export const state = () => ({
  countries: [],
  titles: [],
})

export const getters = {
  countriesLoaded(state) {
    return state.countries.length > 0
  },
  titlesLoaded(state) {
    return state.titles.length > 0
  },
}
export const mutations = {
  SET_COUNTRIES(state, countries) {
    state.countries = countries
  },
  SET_TITLES(state, titles) {
    state.titles = titles
  },
}
export const actions = {
  async getCountries({ commit, getters }) {
    if (getters.countriesLoaded) {
      return
    }

    const { data: countries } = await this.$api.country()
    commit('SET_COUNTRIES', countries)
  },
  async getTitles({ commit, getters }) {
    if (getters.titlesLoaded) {
      return
    }

    const {
      data: { data: titles = [] },
    } = await this.$api.asset('/titles')
    commit('SET_TITLES', titles)
  },
}
