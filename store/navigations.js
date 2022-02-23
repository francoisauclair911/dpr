export const state = () => ({
  primaryDrawer: true,
  secondaryDrawer: true,
  userRoles: null,
  superadmin: false,
  organizations: {
    selected: null,
    list: [],
  },
})

export const mutations = {
  TOGGLE_PRIMARY_DRAWER(state) {
    state.primaryDrawer = !state.primaryDrawer
  },
  TOGGLE_SECONDARY_DRAWER(state) {
    state.secondaryDrawer = !state.secondaryDrawer
  },
  SET_PRIMARY_DRAWER(state, boolean) {
    state.primaryDrawer = boolean
  },
  SET_SECONDARY_DRAWER(state, boolean) {
    state.secondaryDrawer = boolean
  },
  SET_SELECTED_ORGANIZATION(state, organization) {
    state.organizations.selected = organization
  },
  SET_ORGANIZATION_LIST(state, organizations) {
    state.organizations.list = organizations
  },
  SET_USER_ROLES(state, roles) {
    state.userRoles = roles
  },
  SET_SUPERADMIN(state, superadmin) {
    state.superadmin = superadmin
  },
}
export const actions = {
  async getUserRoles({ commit, rootState }) {
    const {
      data: {
        data: { roles, superadmin },
      },
    } = await this.$api.uso(`/users/${this.$auth.user.sub}/roles`)
    commit('SET_USER_ROLES', roles)
    commit('SET_SUPERADMIN', superadmin)
  },
  async setUserOrganizations({ commit, state, dispatch }) {
    if (!state.userRoles) {
      await dispatch('getUserRoles')
    }
    if (state.userRoles.length < 1) {
      throw new Error(
        'No organizations/roles found, you should contact your organization administrator'
      )
    }
    const organizationList = state.userRoles.map((o) => ({
      name: o.organization_name ?? null,
      id: o.organization,
      isDefault: o.default ?? false,
    }))
    commit('SET_ORGANIZATION_LIST', organizationList)
    let selectedOrganization = organizationList[0]

    const defaultOrganization = organizationList.find((o) => o.isDefault)

    if (defaultOrganization) {
      selectedOrganization = defaultOrganization
    }
    const {
      data: { data: organizationInfo },
    } = await this.$api.uso(`/organizations/${selectedOrganization.id}`)
    selectedOrganization = organizationInfo.attributes
    console.log(
      '\x1b[32;1m%s\x1b[0m  ',
      '=> selectedOrganization',
      selectedOrganization
    )
    return commit('SET_SELECTED_ORGANIZATION', selectedOrganization)
  },
}
