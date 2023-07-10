<template>
  <v-card flat>
    <v-card-title class="black--text font-weight-bold">
      <ButtonBack @click="$emit('back')"></ButtonBack>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text tag="dl">
      <v-row>
        <v-col>
          <PaymentProviderList @success="next"></PaymentProviderList>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'DonatePaymentDetailsStep',
  mounted() {
    const currency = this.page.attributes.settings.currency.toUpperCase()
    const gtmPayload = {
      event: 'add_shipping_info',
      currency,
      value: this.amount,
      items: [
        {
          item_id: this.page.attributes.id,
          item_name: this.page.attributes.slug,
          affiliation: 'Donation Form',
          currency,
          item_category: 'One-time Donation',
          price: 0,
          quantity: 1,
        },
      ],
    }
    this.$gtm.push(gtmPayload)
  },
  computed: {
    ...mapGetters('pages', ['currencySymbol']),
    ...mapState('pages', ['page']),
    ...mapState('payment', ['amount']),
  },
  methods: {
    next() {
      this.$emit('next')
    },
  },
}
</script>
