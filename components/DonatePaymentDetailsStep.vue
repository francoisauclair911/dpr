<template>
  <v-card flat>
    <v-card-title class="black--text font-weight-bold">
      <ButtonBack @click="$emit('back')"></ButtonBack>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text tag="dl">
      <v-row>
        <v-col cols="12">
          <Subheader>
            {{
              $t(
                'components.payment_details_step.subheaders.payment_information'
              )
            }}
          </Subheader>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <PaymentProviderList></PaymentProviderList>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DonatePaymentDetailsStep',

  computed: {
    ...mapGetters('pages', ['currencySymbol']),
  },
}
</script>
