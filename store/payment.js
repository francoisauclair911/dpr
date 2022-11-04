import { getField, updateField } from 'vuex-map-fields'
export const state = () => ({
  intent: null,
  donationIntentId: sessionStorage.getItem('donationIntentId'),
  amount: 0,
  donorInfo: {
    ...(sessionStorage.getItem('donor') &&
      JSON.parse(sessionStorage.getItem('donor'))),
    ...(!sessionStorage.getItem('donor') && {
      title: null,
      first_name: null,
      last_name: null,
      email: null,
      birthday: null,
      phone_number: null,
      phone_calling_code: null,
      address_line_1: null,
      address_line_2: null,
      postal_code: null,
      dependent_locality: null,
      locality: null,
      administrative_area: null,
      country: null,
      communication: null,
      gdpr: null,
    }),
  },
})

export const getters = {
  getField,
  intentStatus(state) {
    return state.intent?.attributes?.status || null
  },
}

export const mutations = {
  updateField,
  SET_INTENT(state, intent) {
    state.intent = intent
  },
  updateDonorInfo(state, { field, value }) {
    console.log('mutating donorInfo for ', field)
    state.donorInfo[field] = value
  },

  SET_DONATION_INTENT_ID(state, donationIntentId) {
    sessionStorage.setItem('donationIntentId', donationIntentId)
    state.donationIntentId = donationIntentId
  },
  updateAmount(state, amount) {
    state.amount = Number(parseInt(amount))
  },
}

export const actions = {
  resetState({ commit }) {
    sessionStorage.clear()
    commit('SET_INTENT', null)
    commit('SET_DONATION_INTENT_ID', null)
    commit('updateAmount', 0)
  },
  async getIntent({ commit }, intentId = null) {
    console.log('/store.payment/getIntent')
    if (!intentId) {
      throw new Error('Intent is null')
    }
    const {
      data: { data: paymentIntent },
    } = await this.$api.payment.get(`/intents/${intentId}`)
    commit('SET_INTENT', paymentIntent)
  },
  async confirm({ commit }, payload) {
    console.log('getIntent')
    const { paymentProvider, donationIntentId } = payload
    if (!donationIntentId) {
      throw new Error('No donation intent provided')
    }
    return await this.$api.payment.post(
      `/authorize/confirm/${paymentProvider}`,
      {
        data: {
          donation_intent_id: donationIntentId,
        },
      }
    )
  },

  async preProcess(
    { state, rootState },
    { paymentProvider, paymentProviderReferenceId = null }
  ) {
    console.log('preProcess')
    const currency = rootState.pages.page.attributes.settings.currency
    const amount = convertedAmount(state.amount, currency)
    const payload = {
      amount,
      currency,
      organization_id:
        rootState.pages.page.attributes.internal_ids.organization_id,
      payment_provider: paymentProvider,
      payment_provider_reference_id: paymentProviderReferenceId,
    }
    console.log('\x1b[32;1m%s\x1b[0m  ', '=> payload', payload)
    const {
      data: { data: response },
    } = await this.$api.payment.post(
      `/authorize/pre-process/${paymentProvider}`,
      {
        data: payload,
      }
    )
    console.log('response', response)

    return response
  },
  async process({ state, rootState }, payload) {
    console.log('store process')
    const { paymentProvider: name, referenceId, returnUrl } = payload
    const currency = rootState.pages.page.attributes.settings.currency
    const amount = convertedAmount(state.amount, currency)
    const dataPayload = {
      payment_provider: {
        name,
        reference_id: referenceId,
        return_url: returnUrl,
      },
      donation: {
        amount,
        currency,
        donation_page_id: rootState.pages.page.attributes.id,
        organization_id:
          rootState.pages.page.attributes.internal_ids.organization_id,
        appeal_id: rootState.pages.page.attributes.internal_ids.appeal_id,
        campaign_id: rootState.pages.page.attributes.internal_ids.campaign_id,
      },
      donor: state.donorInfo,
      fingerprint: {},
      page: rootState.pages.page.attributes,
      utms: rootState.url.utms,
      donation_intent_id: sessionStorage.getItem('donationIntentId') || null,
    }
    // lets save donor info in session
    sessionStorage.setItem('donor', JSON.stringify(dataPayload.donor))
    sessionStorage.setItem(
      'donation',
      JSON.stringify({
        ...dataPayload.donation,
        amount: state.amount,
      })
    )
    if (this.$config.FEATURES.LIVE_PAYMENT === false) {
      return {
        data: {
          data: {
            intent_id: null,
          },
        },
      }
    }
    return await this.$api.payment.post(`/authorize/process/${name}`, {
      data: dataPayload,
    })
  },

  validateDonorForm({ commit, state, dispatch }) {
    console.log('validateDonorForm', state.donorInfo)
    dispatch('validation/clearValidationErrors', null, { root: true })

    if (this.$config.FEATURES.LIVE_PAYMENT === false) {
      console.log(
        '\x1b[32;1m%s\x1b[0m  ',
        '=> DonateDonorInfoStep.vue/ Live Payment = OFF'
      )
      return {
        response: true,
      }
    }
    return this.$api.payment.post(`/authorize/validate`, {
      data: state.donorInfo,
    })
  },
}

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
