import { defineStore } from 'pinia'
import { DomainNotFound } from '~/exceptions'

export const useStore = defineStore('myStore', {
    state: () => ({
        settings: null,
        domain: null,
    }),
    actions: {
        async domainLookup() {
            try {
                const response = await this.$api.campaign.get(`/domains/lookup`, {
                    params: {
                        name: window.location.hostname,
                    },
                })
                return response?.data?.data
            } catch (error) {
                if (error?.response?.status === 404) {
                    throw new DomainNotFound()
                }
                throw error
            }
        },
        async getOrganizationSettings(organizationId = null) {
            organizationId = organizationId || this.domain.organization_id
            const response = await this.$api.campaign.get(`/organizations/${organizationId}/settings`)
            const settings = response?.data?.data
            this.SET_SETTINGS(settings)
        },
        async initialConfig() {
            const domain = await this.domainLookup()
            this.SET_DOMAIN(domain)

            await this.getOrganizationSettings()

            if (this.settings.enable_gtm.value === true && this.settings.gtm_tag_id.value) {
                this.$gtm.init(this.settings.gtm_tag_id.value)
            }
        },
        // mutations
        SET_SETTINGS(settings) {
            this.settings = settings.reduce((carry, setting) => {
                return {
                    ...carry,
                    [setting.name]: setting,
                }
            }, {})
        },
        SET_DOMAIN(domain) {
            this.domain = domain
        },
    },
    getters: {
        stripeAccountId() {
            return this.settings?.stripe_account_id.value || null
        },
    },
})
