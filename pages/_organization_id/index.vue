<template>
  <v-row class="mt-10 px-1 px-md-10">
    <v-col>
      <v-row>
        <v-col
          v-for="page in list"
          :key="page.id"
          cols="12"
          sm="6"
          md="3"
          lg="4"
        >
          <DonationPageBox :page="page"></DonationPageBox>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PageList',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit('pages/SET_PAGE', null)
    })
  },
  async asyncData({ store, params, error }) {
    await store.dispatch('pages/index', {
      organizationId: params.organization_id,
    })
  },

  computed: {
    ...mapState('pages', ['list']),
  },
  watch: {
    /*
    / This watches the route and if the languages changes,
    / reloads the page content to get the translated content
    */
    $route: {
      async handler(to, from) {
        await this.$store.dispatch('pages/index', {
          organizationId: to.params.organization_id,
        })
      },
    },
  },
  methods: {},
}
</script>
