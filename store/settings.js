import { DomainNotFound } from '~/exceptions'

import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: null,
    domain: null,
  }),
  getters: {

    stripeAccountId(state) {
      return state.settings?.stripe_account_id.value || null
    },
  },
  actions: {
    domainLookup() {
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

    async getOrganizationSettings(organizationId = null) {
      organizationId = organizationId || this.domain.organization_id
      const response = await this.$api.campaign.get(
        `/organizations/${organizationId}/settings`
      )
      const settings = response?.data?.data
      this.setSettings(settings)
    },

    async initialConfig() {
      const domain = await this.domainLookup()
      this.domain = domain

      this.getOrganizationSettings()

      if (
        this.settings.enable_gtm.value === true &&
        this.settings.gtm_tag_id.value
      ) {
        this.$gtm.init(this.settings.gtm_tag_id.value)
      }
    },


    setSettings(settings) {
      this.settings = settings.reduce((carry, setting) => {
        return {
          ...carry,
          [setting.name]: setting,
        }
      }, {})
    },
  },
});