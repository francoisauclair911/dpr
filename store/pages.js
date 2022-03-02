export const state = () => ({
  page: null,
  list: [],
})

export const getters = {
  backgroundSrc(state, getters) {
    return getters?.settings?.background_src || null
  },
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
  numberFormat(state, getters) {
    return new Intl.NumberFormat(getters?.content?.languageCode || 'en', {
      style: 'currency',
      currency: getters?.settings?.currency,
    })
  },
  currencySymbol(state, getters) {
    return (
      getters.numberFormat
        .formatToParts()
        .find((part) => part.type === 'currency').value || ''
    )
  },
  form_alignment(state, getters) {
    switch (getters?.settings?.form_alignment) {
      case 'left':
        return 'start'
      case 'center':
        return 'center'
      case 'right':
        return 'end'
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
  SET_PAGE_CONTENT(state, content) {
    console.log('\x1b[32;1m%s\x1b[0m  ', '=> SET_PAGE_CONTENT')
    state.page.attributes.content = content
  },
}
export const actions = {
  async getPage({ commit, state }, params) {
    const { organizationId, pageSlug, languageCode = null } = params

    console.log('\x1b[32;1m%s\x1b[0m  ', '=> languageCode', languageCode)

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
          language_code: languageCode,
        },
      }
    )
    console.log(
      '\x1b[32;1m%s\x1b[0m  ',
      '=> page language',
      page.attributes.content.language_code
    )
    if (!state.page || page.attributes.id !== state.page.attributes.id) {
      commit('SET_PAGE', page)
      return page
    }

    commit('SET_PAGE_CONTENT', page.attributes.content)
  },
  async index({ commit, state }, params) {
    if (state.list.length > 0) {
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
