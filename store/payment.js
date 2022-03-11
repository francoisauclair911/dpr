export const state = () => ({
  intent: null,
})

export const mutations = {
  SET_INTENT(state, intent) {
    state.intent = intent
  },
}

export const actions = {
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
  upsertIntent({ commit, dispatch, store }, payload) {
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
    if (store.intent) {
      return dispatch(updateIntent, piData)
    }
    return dispatch(createIntent, piData)
  },
  async createIntent({ commit }, payload) {
    console.log('createIntent')
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
    console.log('piData', piData)

    const {
      data: { data: paymentIntent },
    } = await this.$api.payment.post(`/intents`, {
      data: piData,
    })
    commit('SET_INTENT', paymentIntent)
  },
}
