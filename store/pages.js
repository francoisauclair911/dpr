import {
  NoFundraisingPagesException,
  FundraisingPageNotFound,
} from '~/exceptions'

export const state = () => ({
  page: null,
  list: [],
  bgOverride: null,
})

export const getters = {
  backgroundSrc(state, getters) {
    return (
      state?.bgOverride ||
      getters?.settings?.background_src ||
      '/bg-ts-v2-co.png'
    )
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
      roundingMode: 'halfCeil',
      maximumFractionDigits: 0,
      currency: getters?.settings?.currency || 'usd',
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
  SET_BG_OVERRIDE(state, bg = '/tile-bg.png') {
    state.bgOverride = bg
  },
  SET_LIST(state, pages) {
    state.list = pages
  },
  SET_PAGE_CONTENT(state, content) {
    state.page.attributes.content = content
  },
}
export const actions = {
  async getPage({ commit, state, rootState }, params) {
    let page
    const {
      organizationId = rootState.settings.domain.organization_id,
      pageSlug,
      languageCode: lang = null,
    } = params

    const languageCode = lang || rootState.languages.selected

    page = state.list.find((p) => {
      const isSlugMatch = p.attributes.slug === pageSlug
      const isLanguageMatch =
        // if no language set we just select the matching slug page
        // if language is set we make sure we have the right translation for it.
        !languageCode || p.attributes.content.language_code === languageCode
      return isSlugMatch && isLanguageMatch
    })

    if (!page) {
      try {
        const {
          data: { data },
        } = await this.$api.campaign.get(
          `/organizations/${organizationId}/frontend-pages/${pageSlug}`,
          {
            params: {
              language_code: languageCode,
            },
          }
        )
        page = data
      } catch (e) {
        if (e?.response?.status === 404) {
          throw new FundraisingPageNotFound()
        }
        throw e
      }
    }
    commit(
      'languages/SET_PAGE_LANGUAGES',
      page.attributes.available_languages,
      { root: true }
    )
    commit('payment/updateCurrency', page.attributes.settings.currency, {
      root: true,
    })

    if (!state.page || page.attributes.id !== state.page.attributes.id) {
      commit('SET_PAGE', page)

      return page
    }

    commit('SET_PAGE_CONTENT', page.attributes.content)
  },
  async index({ commit, rootState, error }, params = {}) {
    try {
      const {
        organizationId = rootState.settings.domain.organization_id,
        languageCode: lang = null,
      } = params
      const languageCode = lang || rootState.languages.selected
      const response = await this.$api.campaign.get(
        `/organizations/${organizationId}/frontend-pages`,
        {
          params: {
            language_code: languageCode,
          },
        }
      )
      const pages = response?.data?.data || []
      commit('SET_LIST', pages)
      return pages
    } catch (e) {
      if (e.response?.status === 404) {
        throw new NoFundraisingPagesException()
      }
    }
  },
}
