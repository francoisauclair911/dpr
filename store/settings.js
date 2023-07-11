import { DomainNotFound } from '~/exceptions'
export const state = () => ({
  settings: null,
  domain: null,
})
export const mutations = {
  SET_SETTINGS(state, settings) {
    state.settings = settings.reduce((carry, setting) => {
      return {
        ...carry,
        [setting.name]: setting,
      }
    }, {})
  },
  SET_DOMAIN(state, domain) {
    state.domain = domain
  },
}

export const actions = {
  domainLookup({ commit, state }) {
    return this.$api.campaign
      .get(`/domains/lookup`, {
        params: {
          name: window.location.hostname,
        },
      })
      .then((response) => {
        return response?.data?.data
      })
      .catch((error) => {
        if (error?.response?.status === 404) {
          throw new DomainNotFound()
        }
        throw e
      })
  },
  async getOrganizationSettings({ commit, state }, organizationId = null) {
    organizationId = organizationId || state.domain.organization_id
    const response = await this.$api.campaign.get(
      `/organizations/${organizationId}/settings`
    )
    const settings = response?.data?.data
    commit('SET_SETTINGS', settings)
  },
  async initialConfig({ commit, state, dispatch }) {
    const domain = await dispatch('domainLookup')
    commit('SET_DOMAIN', domain)

    await dispatch('getOrganizationSettings')

    console.log('🚀  3', state.settings.enable_gtm.value)

    if (
      state.settings.enable_gtm.value === true &&
      state.settings.gtm_tag_id.value
    ) {
      this.$gtm.init(state.settings.gtm_tag_id.value)
    }
  },
}
