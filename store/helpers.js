import axios from 'axios'
export const state = () => ({
  countries: {},
})

export const mutations = {
  UPSERT_COUNTRY(state, country) {
    state.countries[country.alpha3code] = country
  },
}
export const actions = {
  async getOrganizationCountryInfo({ commit }, alpha3code) {
    const { data: country } = await this.$api.country.get(
      `/alpha/${alpha3code}`
    )
    return country
  },
}
