export const state = () => ({
  text: '',
  color: '',
  timeout: '',
})

export const mutations = {
  SHOW_NOTIFICATION(state, payload) {
    state.text = payload.text
    state.color = payload.color
    state.timeout = payload.timeout
  },
}

export const actions = {
  show({ commit }, payload) {
    commit('SHOW_NOTIFICATION', payload)
  },
  info({ commit }, text) {
    commit('SHOW_NOTIFICATION', {
      text,
      color: 'secondary',
    })
  },
  success({ commit }, text) {
    commit('SHOW_NOTIFICATION', {
      text,
      color: 'primary',
    })
  },
  danger({ commit }, text) {
    commit('SHOW_NOTIFICATION', {
      text,
      color: 'red',
    })
  },
}
