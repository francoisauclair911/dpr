import { DomainNotFound } from '~/exceptions'
export const state = () => ({
  settings: null,
  domain: null,
})
export const mutations = {
  SET_SETTINGS(state, settings) {
    state.settings = settings
  },
  SET_DOMAIN(state, domain) {
    state.domain = domain
  },
}

export const actions = {
  async initialConfig({ commit, state }) {
    try {
      const response = await this.$api.campaign.get(`/domains/lookup`, {
        params: {
          name: window.location.hostname,
        },
      })
      const domain = response?.data?.data
      commit('SET_DOMAIN', domain)
    } catch (error) {
      if (error?.response?.status === 404) {
        throw new DomainNotFound()
      }
    }

    const {
      data: { data: settings = null },
    } = await this.$api.campaign.get(
      `/organizations/${domain.organization_id}/settings`
    )

    commit(
      'SET_SETTINGS',
      settings.reduce((carry, setting) => {
        return {
          ...carry,
          [setting.name]: setting,
        }
      }, {})
    )
    if (
      state.settings.enable_gtm.value === true &&
      state.settings.gtm_tag_id.value
    ) {
      this.$gtm.init(state.settings.gtm_tag_id.value)
    }
  },
}
