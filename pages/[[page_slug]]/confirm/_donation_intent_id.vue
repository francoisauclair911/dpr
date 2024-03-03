<template>
  <v-row class="my-10 px-1 px-md-10">
    <v-col cols="12" md="10" offset-md="1">
      <v-row :justify="rowJustification">
        <v-col cols="12" sm="9" md="6" lg="5" xl="4" class="">
          <DonateCard>
            <DonateConfirmation
              :donation-intent-id="$route.params.donation_intent_id"
            />
          </DonateCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageConfirmation',
  computed: {
    ...mapGetters('pages', ['form_alignment']),
    rowJustification() {
      return this.$vuetify.breakpoint.mobile
        ? 'center'
        : this.$route.query.formAlignment || this.form_alignment
    },
  },
}
</script>
