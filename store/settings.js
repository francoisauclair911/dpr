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
    async domainLookup() {
      const { $api } = useNuxtApp()
      return $api.campaign
        (`/domains/lookup`, {
          params: {
            name: window.location.hostname,
          },
        })
        .then((response) => {
          return response?.data
        })
        .catch((error) => {
          if (error?.response?.status === 404) {
            throw new DomainNotFound()
          }
          throw e
        })
    },

    async getOrganizationSettings(organizationId = null) {
      const { $api } = useNuxtApp()

      organizationId = organizationId || this.domain.organization_id
      const response = await $api.campaign(
        `/organizations/${organizationId}/settings`
      )
      const settings = response?.data
      this.setSettings(settings)
    },

    async initialConfig() {
      const domain = await this.domainLookup()
      this.domain = domain

      await this.getOrganizationSettings()

      if (
        this.settings.enable_gtm.value === true &&
        this.settings.gtm_tag_id.value
      ) {
        useGtm().init(this.settings.gtm_tag_id.value)
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