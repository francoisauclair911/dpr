export const state = () => ({
  errors: [],
})

export const mutations = {
  SET_ERRORS(state, errors) {
    state.errors = errors
  },
  CLEAR_ERRORS(state) {
    state.errors = []
  },
}
export const actions = {
  handleValidation({ commit }, payload) {
    const { errors } = payload
    const formattedError = Object.keys(errors).reduce((carry, error) => {
      const key = error
      const value = [errors[error].join(' ')]
      return { ...carry, [key]: value }
    }, {})
    commit('SET_ERRORS', formattedError)
  },
  clearValidationErrors({ commit, state }) {
    console.log('clearing validation errors')

    if (Object.keys(state.errors).length) {
      console.log('clearing validation errors')
      commit('CLEAR_ERRORS')
    }
  },
}
