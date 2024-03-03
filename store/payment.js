import { defineStore } from "pinia"
import { usePagesStore } from "./pages"
import { useUtmsStore } from "./utms"
import { useValidationStore } from "./validation"

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    intent: null,
    donationIntentId: sessionStorage.getItem('donationIntentId'),
    amount: 0,
    currency: null,
    donationType: 'one_time',
    phone: {
      number: null,
      countryCallingCode: null,
      extension: null,
    },
    address: {
      address_line_1: null,
      address_line_2: null,
      postal_code: null,
      dependent_locality: null,
      locality: null,
      administrative_area: null,
      country: null,
    },
    consents: {
      gdpr: null,
      communication: null,
    },
    donor: {
      title: null,
      first_name: null,
      last_name: null,
      email: null,
      birthday: null,
      ...(sessionStorage.getItem('adra.donor') !== null &&
        JSON.parse(sessionStorage.getItem('adra.donor'))),
    },

  }),
  getters: {
    intentStatus(state) {
      return state.intent?.attributes?.status || null
    },
    isRecurring(state) {
      return state.donationType === 'recurring'
    },
    convertedAmount(state) {
      return convertedAmount(state.amount, state.currency)
    },

    numberFormat(state, getters) {
      return new Intl.NumberFormat(window.navigator.language || 'en', {
        style: 'currency',
        roundingMode: 'halfCeil',
        maximumFractionDigits: 0,
        currency: state.currency || 'usd',
      })
    },
    formattedAmount(state, getters) {
      return getters.numberFormat.format(state.amount)
    },

  },
  actions: {
    resetState() {
      sessionStorage.clear()
      this.intent = null
      this.setDonationIntentId(null)
      this.updateAmount(0)
    },

    async getIntent(intentId = null) {

      const { $api } = useNuxtApp()

      if (!intentId) {
        throw new Error('Intent is null')
      }
      const {
        data: { data: paymentIntent },
      } = await $api.payment(`/intents/${intentId}`)
      this.intent = paymentIntent
    },

    async confirm(payload) {
      const { $api } = useNuxtApp()
      const { paymentProvider, donationIntentId } = payload
      if (!donationIntentId) {
        throw new Error('No donation intent provided')
      }
      return await $api.payment.post(
        `/authorize/confirm/${paymentProvider}`,
        {
          data: {
            donation_intent_id: donationIntentId,
          },
        }
      )
    },

    async preProcess(
      { paymentProvider, paymentProviderReferenceId = null }
    ) {
      const { $api } = useNuxtApp()
      const pagesStore = usePagesStore()


      const currency = pagesStore.page.attributes.settings.currency
      const amount = convertedAmount(this.amount, currency)
      const payload = {
        amount,
        currency,
        organization_id:
          pagesStore.page.attributes.internal_ids.organization_id,
        payment_provider: paymentProvider,
        payment_provider_reference_id: paymentProviderReferenceId,
      }
      const {
        data: { data: response },
      } = await $api.payment.post(
        `/authorize/pre-process/${paymentProvider}`,
        {
          data: payload,
        }
      )

      return response
    },
    async process(payload) {
      const { $api } = useNuxtApp()

      const pagesStore = usePagesStore()
      const utmsStore = useUtmsStore()

      const { paymentProvider: name, referenceId, returnUrl } = payload
      const currency = pagesStore.page.attributes.settings.currency
      const amount = convertedAmount(this.amount, currency)
      const dataPayload = {
        payment_provider: {
          name,
          reference_id: referenceId,
          return_url: returnUrl,
        },
        donation: {
          amount,
          currency,
          donation_page_id: pagesStore.page.attributes.id,
          organization_id:
            pagesStore.page.attributes.internal_ids.organization_id,
          appeal_id: pagesStore.page.attributes.internal_ids.appeal_id,
          campaign_id: pagesStore.page.attributes.internal_ids.campaign_id,
        },
        donor: this.donor,
        fingerprint: {},
        page: pagesStore.page.attributes,
        utms: utmsStore.utms,
        donation_intent_id: sessionStorage.getItem('donationIntentId') || null,
      }
      // lets save donor info in session
      sessionStorage.setItem('donor', JSON.stringify(dataPayload.donor))
      sessionStorage.setItem(
        'donation',
        JSON.stringify({
          ...dataPayload.donation,
          amount: this.amount,
        })
      )
      if (this.$config.public.FEATURES.LIVE_PAYMENT === false) {
        return {
          data: {
            data: {
              intent_id: null,
            },
          },
        }
      }
      return await $api.payment.post(`/authorize/process/${name}`, {
        data: dataPayload,
      })
    },

    validateDonorForm() {
      const validationStore = useValidationStore()
      validationStore.clearValidationErrors()

      return $api.payment.post(`/authorize/validate`, {
        ...this.donor,
        ...this.consents,
      })
    },

    updateAmount(amount) {
      this.amount = Number(parseInt(amount))
    },


    setDonationIntentId(donationIntentId) {
      sessionStorage.setItem('donationIntentId', donationIntentId)
      this.donationIntentId = donationIntentId
    },

    updateCurrency(currency) {
      this.currency = currency
    },
    // SET_INTENT(state, intent) {
    //   state.intent = intent
    // },
    // updateDonor(state, { field, value }) {
    //   state.donor[field] = value
    // },

    // updateDonationType(state, type) {
    //   state.donationType = type
    // },
  },

})

function convertedAmount(amount, currency) {
  const nonDecimalCurrencies = [
    'BIF',
    'CLP',
    'DJF',
    'GNF',
    'JPY',
    'KMF',
    'KRW',
    'MGA',
    'PYG',
    'RWF',
    'UGX',
    'VND',
    'VUV',
    'XAF',
    'XOF',
    'XPF',
  ]
  return nonDecimalCurrencies.includes(currency.toUpperCase())
    ? amount
    : amount * 100
}
