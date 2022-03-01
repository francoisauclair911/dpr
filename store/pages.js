import getSymbolFromCurrency from 'currency-symbol-map'

export const state = () => ({
  page: null,
  list: [],
})

export const getters = {
  settings(state, getters) {
    return getters?.attributes?.settings
  },
  attributes(state) {
    return state?.page?.attributes
  },
  content(state, getters) {
    return getters?.attributes?.content
  },
  predefined_amounts(state, getters) {
    return getters?.content?.predefined_amounts
  },
  currencySymbol(state, getters) {
    return getSymbolFromCurrency(getters?.settings?.currency) || ''
  },
  form_alignment(state, getters) {
    switch (getters?.settings?.form_alignment) {
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
  SET_LIST(state, pages) {
    state.list = pages
  },
}
export const actions = {
  async getPage({ commit, state }, params) {
    console.log('\x1b[32;1m%s\x1b[0m  ', '=> getPage triggered')

    const { organizationId, pageSlug, languageCode = null } = params
    console.log('\x1b[32;1m%s\x1b[0m  ', '=> getPage params', params)

    const foundPage = state.list.find((p) => {
      const isSlugMatch = p.attributes.slug === pageSlug
      const isLanguageMatch =
        // if no language set we just select the matching slug page
        // if language is set we make sure we have the right translation for it.
        !languageCode || p.attributes.content.language_code === languageCode
      return isSlugMatch && isLanguageMatch
    })
    if (foundPage) {
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> foundPage', foundPage)
      commit('SET_PAGE', foundPage)
      return foundPage
    }
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
  async index({ commit, state }, params) {
    if (state.list.length > 0) {
      commit('SET_PAGE', null)

      return
    }
    console.log('\x1b[32;1m%s\x1b[0m  ', '=> pages/index')

    const { organizationId, languageCode = null } = params

    const {
      data: { data: pages },
    } = await this.$api.campaign.get(
      `/organizations/${organizationId}/frontend-pages`,
      {
        params: {
          languageCode,
        },
      }
    )

    commit('SET_LIST', pages)
    // commit('SET_PAGE', null)

    return pages
  },
}
