export const state = () => ({
  intent: null,
})

export const getters = {
  intentStatus(state) {
    return state.intent?.attributes?.status || null
  },
}

export const mutations = {
  SET_INTENT(state, intent) {
    state.intent = intent
  },
}

export const actions = {
  async getIntent({ commit }, intentId) {
    const {
      data: { data: paymentIntent },
    } = await this.$api.payment.get(`/intents/${intentId}`)
    commit('SET_INTENT', paymentIntent)
  },
  async preProcess({ commit }, payload) {
    console.log('preProcess')
    console.log('payload', payload)
    const {
      organizationId,
      paymentProvider,
      amount = null,
      currency = null,
    } = payload
    const {
      data: { data: response },
    } = await this.$api.payment.post(`/api/authorize/pre-process`, {
      data: {
        amount,
        currency,
        organization_id: organizationId,
        payment_provider: paymentProvider,
      },
    })
    console.log('response', response)

    return response
  },
  async authorize({ commit }, payload) {
    console.log('authorize')
    console.log('payload', payload)
    const { amount, page, paymentProvider } = payload
    const {
      data: { data: response },
    } = await this.$api.payment.post(`/authorize`, {
      data: {
        donationInfo: {
          amount,
          currency: page.attributes.settings.currency,
          payment_provider: paymentProvider,
        },
        donorInfo: {},
        pageInfo: {
          donation_page_id: page.attributes.id,
          organization_id: page.attributes.internal_ids.organization_id,
        },
      },
    })
    console.log('response', response)

    return response
  },
  upsertIntent({ commit, dispatch, state }, payload) {
    const { amount, page, donorInfo: donor } = payload
    const piData = {
      donation: {
        amount,
        currency: page.attributes.settings.currency,
      },
      donor,
      page: {
        donation_page_id: page.attributes.id,
        ...page.attributes.internal_ids,
      },
    }
    if (state.intent) {
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> dispatch updateIntent', piData)

      return dispatch('updateIntent', piData)
    }
    console.log('\x1b[32;1m%s\x1b[0m  ', '=> dispatch createIntent', piData)

    return dispatch('createIntent', piData)
  },
  async createIntent({ commit }, payload) {
    console.log('createIntent')

    console.log('payload', payload)

    const {
      data: { data: paymentIntent },
    } = await this.$api.payment.post(`/intents`, {
      data: payload,
    })
    commit('SET_INTENT', paymentIntent)
  },
  async updateIntent({ commit, state }, payload) {
    console.log('updateIntent')

    console.log('payload', payload)

    const {
      data: { data: paymentIntent },
    } = await this.$api.payment.patch(`/intents/${state.intent.id}`, {
      data: payload,
    })
    console.log('\x1b[32;1m%s\x1b[0m  ', '=> paymentIntent', paymentIntent)
    commit('SET_INTENT', paymentIntent)
  },
}
