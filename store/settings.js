import AdraException from '~/utils/error'
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
    console.log('🚀 ~ file: settings.js:17 ~ initialConfig ~ initialConfig:')
    const response = await this.$api.campaign.get(`/domains/lookup`, {
      params: {
        name: window.location.hostname,
      },
    })
    const domain = response?.data?.data
    console.log('🚀 ~ file: settings.js:21 ~ initialConfig ~ domain:')

    if (!domain) {
      throw new AdraException('001', 'Domain not found')
    }
    commit('SET_DOMAIN', domain)

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
