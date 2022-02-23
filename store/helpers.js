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
  async getStripeSupportedCurrency({ commit, dispatch, rootState, state }) {
    console.log('running')
    const organization = rootState.navigations.organizations.selected
    console.log('\x1b[32;1m%s\x1b[0m  ', '=> fetching for', organization)
    const countryCode = organization.country

    const { alpha2Code } = await dispatch(
      'getOrganizationCountryInfo',
      countryCode
    )

    console.log('\x1b[32;1m%s\x1b[0m  ', '=> alpha2Code', alpha2Code)

    const { data: stripeData } = await axios(
      // `https://api.stripe.com/v1/country_specs/${countryCode}`,
      `https://api.stripe.com/v1/country_specs/${alpha2Code}`,
      {
        headers: {
          Authorization: 'Bearer ' + this.$config.STRIPE_PK_KEY,
        },
      }
    )
    console.log('\x1b[32;1m%s\x1b[0m  ', '=> stripeData', stripeData)
    return {
      currencies: stripeData.supported_payment_currencies,
      defaultCurrency: stripeData.default_currency,
    }
  },
}
