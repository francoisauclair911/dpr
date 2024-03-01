import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {

  state: {
    primaryDrawer: true,
    secondaryDrawer: true,
  },
  actions: {
    // TOGGLE_PRIMARY_DRAWER(state) {
    //   state.primaryDrawer = !state.primaryDrawer
    // },
    // TOGGLE_SECONDARY_DRAWER(state) {
    //   state.secondaryDrawer = !state.secondaryDrawer
    // },
    // SET_PRIMARY_DRAWER(state, boolean) {
    //   state.primaryDrawer = boolean
    // },
    // SET_SECONDARY_DRAWER(state, boolean) {
    //   state.secondaryDrawer = boolean
    // },

  },

});
