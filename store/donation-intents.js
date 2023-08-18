export const state = () => ({})
export const mutations = {}

export const actions = {
  async getConfirmation({ commit }, id) {
    const response = await this.$api.payment(`/confirmation/${id}`)
    // await new Promise((resolve) => setTimeout(resolve, 1500))
    return response?.data?.data
    return response?.data?.data || null
    console.log('done waiting')
  },
}
