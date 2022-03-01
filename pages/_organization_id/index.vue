<template>
  <v-row>
    <v-col cols="10" offset="1" class="pt-10">
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

  async asyncData({ store, params }) {
    await store.dispatch('pages/index', {
      organizationId: params.organization_id,
    })
  },

  computed: {
    ...mapState('pages', ['list']),
    // ...mapGetters('pages', [
    //   'attributes',
    //   'content',
    //   'currencySymbol',
    //   'form_alignment',
    //   'predefined_amounts',
    //   'settings',
    // ]),
  },
  methods: {},
}
</script>
