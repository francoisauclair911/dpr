export const state = () => ({
  page: null,
})

export const getters = {
  settings(state, getters) {
    return getters.attributes.settings
  },
  attributes(state) {
    return state.page.attributes
  },
  content(state, getters) {
    return getters.attributes.content
  },
  predefined_amounts(state, getters) {
    return getters.content.predefined_amounts
  },
  form_alignment(state, getters) {
    switch (getters.settings.form_alignment) {
      case 'left':
        return 'start'
        break
      case 'center':
        return 'center'
        break
      case 'right':
        return 'end'
        break
      default:
        return 'left'
    }
  },
}
export const mutations = {
  SET_PAGE(state, page) {
    state.page = page
  },
}
export const actions = {
  async getPage({ commit }, params) {
    const { organizationId, pageSlug, languageCode = null } = params

    const {
      data: { data: page },
    } = await this.$api.campaign.get(
      `/organizations/${organizationId}/frontend-pages/${pageSlug}`,
      {
        params: {
          languageCode,
        },
      }
    )
    commit('SET_PAGE', page)
    return page
  },
}
