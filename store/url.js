export const state = () => ({
  domain: null,
  utms: {
    medium: null,
    source: null,
    campaign: null,
    content: null,
    term: null,
  },
})
export const mutations = {
  SET_UTM(state, [key, value = null]) {
    state.utms[key] = value
  },
  SET_DOMAIN(state, domain) {
    state.domain = domain
  },
}

export const actions = {
  parseURL({ commit }, route) {
    commit('SET_UTM', ['medium', route.query.utm_medium])
    commit('SET_UTM', ['source', route.query.utm_source])
    commit('SET_UTM', ['content', route.query.utm_content])
    commit('SET_UTM', ['campaign', route.query.utm_campaign])
    if (route.query.utm_term) {
      commit('SET_UTM', ['term', route.query.utm_term.split(' ')])
    }
  },
}
