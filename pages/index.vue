<template>
  <v-row class="mt-10 px-1 px-md-10">
    <v-col>
      <v-row>
        <v-col
          v-for="page in list"
          :key="page.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <!-- <DonationPageBox class="flex" :page="page"></DonationPageBox> -->
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'pinia'
import NoFundraisingPagesException from '~/exceptions/NoFundraisingPagesException'
export default {
  name: 'PageList',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit('pages/SET_PAGE', null)
      vm.$store.commit('pages/SET_BG_OVERRIDE')
    })
  },
  async asyncData({ store, params, error, $api, app }) {
    try {
      await await store.dispatch('pages/index', {
        organizationId: store.state.settings.domain?.organization_id,
      })
    } catch (e) {
      if (e instanceof NoFundraisingPagesException) {
        throw error({
          message: app.i18n.t('pages.error.no_fundraising_pages'),
        })
      }
      throw e
    }
  },

  computed: {
    hasPages() {
      return this.list.length > 0
    },
    ...mapState('pages', ['list']),
    ...mapState('settings', ['settings']),
  },
  watch: {
    /*
    / This watches the route and if the languages changes,
    / reloads the page content to get the translated content
    */
    $route: {
      async handler(to, from) {
        await this.$store.dispatch('pages/index')
      },
    },
  },
  methods: {},
}
</script>
