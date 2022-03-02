export const state = () => ({
  selected: null,
})
export const mutations = {
  SET_SELECTED(state, language) {
    state.selected = language
  },
}
