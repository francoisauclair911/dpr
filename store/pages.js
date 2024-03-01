import {
  NoFundraisingPagesException,
  FundraisingPageNotFound,
} from '~/exceptions'

import { defineStore } from 'pinia'
import { useSettingsStore } from './settings';
import { useLanguageStore } from './languages';
import { usePaymentStore } from './payment';


export const usePagesStore = defineStore('pages', {
  state: {
    page: null,
    list: [],
    bgOverride: null,
  },
  getters: {
    backgroundSrc(state) {
      return (
        state?.bgOverride ||
        settings?.background_src ||
        '/bg-ts-v2-co.png'
      )
    },
    settings() {
      return this.attributes?.settings
    },
    attributes(state) {
      return state?.page?.attributes
    },
    content() {
      return this.attributes?.content
    },
    predefined_amounts() {
      return this.content?.predefined_amounts
    },
    numberFormat() {
      return new Intl.NumberFormat(this.content?.languageCode || 'en', {
        style: 'currency',
        roundingMode: 'halfCeil',
        maximumFractionDigits: 0,
        currency: this.settings?.currency || 'usd',
      })
    },
    currencySymbol() {
      return (
        numberFormat
          .formatToParts()
          .find((part) => part.type === 'currency').value || ''
      )
    },
    form_alignment() {
      switch (this.settings?.form_alignment) {
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
  },
  actions: {
    async getPage(params) {

      const settingsStore = useSettingsStore()
      const languagesStore = useLanguageStore()
      const paymentStore = usePaymentStore()

      let page
      const {
        organizationId = settingsStore.domain.organization_id,
        pageSlug,
        languageCode: lang = null,
      } = params

      const languageCode = lang || languagesStore.selected

      page = this.list.find((p) => {
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
      languagesStore.setPageLanguages(
        page.attributes.available_languages,
        { root: true }
      )
      paymentStore.updateCurrency(page.attributes.settings.currency, {
        root: true,
      })

      if (!this.page || page.attributes.id !== this.page.attributes.id) {
        this.page = page

        return page
      }

      setPageContent(page.attributes.content)
    },

    async index(params = {}) {
      const settingsStore = useSettingsStore()
      const languagesStore = useLanguageStore()

      try {
        const {
          organizationId = settingsStore.domain.organization_id,
          languageCode: lang = null,
        } = params
        const languageCode = lang || languagesStore.selected
        const response = await this.$api.campaign.get(
          `/organizations/${organizationId}/frontend-pages`,
          {
            params: {
              language_code: languageCode,
            },
          }
        )
        const pages = response?.data?.data || []
        this.list = pages
        return pages
      } catch (e) {
        if (e.response?.status === 404) {
          throw new NoFundraisingPagesException()
        }
      }
    },

    setPageContent(content) {
      this.page.attributes.content = content
    },
    // SET_PAGE(state, page) {
    //   state.page = page
    // },
    // SET_BG_OVERRIDE(state, bg = '/tile-bg.png') {
    //   state.bgOverride = bg
    // },
    // SET_LIST(state, pages) {
    //   state.list = pages
    // },
  }

});
