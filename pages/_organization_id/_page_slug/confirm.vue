<template>
  <v-row class="my-10 px-1 px-md-10">
    <v-col cols="12" md="10" offset-md="1">
      <v-row>
        <v-col cols="4"
          ><v-card
            ><v-card-text>
              <pre>{{ $store.state.payment.intent }}</pre>
            </v-card-text></v-card
          ></v-col
        >
        <v-col cols="12" sm="9" md="6" lg="5" xl="3" class="">
          <v-card elevation="10">
            <v-card-title>Confirmation</v-card-title>
            <v-card-text>
              {{ intentStatus }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageConfirmation',
  async asyncData({ params, query, store }) {
    console.log('\x1b[32;1m%s\x1b[0m  ', '=> query', query.ps_intent_id)
    const intentId = query.ps_intent_id
    if (!intentId) {
      return store.dispatch('notifications/danger', 'Something went wrong')
    }
    await store.dispatch('payment/getIntent', intentId)
  },
  computed: {
    ...mapGetters('payment', ['intentStatus']),
  },
}
</script>
