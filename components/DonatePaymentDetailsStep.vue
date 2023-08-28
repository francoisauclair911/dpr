<template>
  <v-card flat>
    <v-card-title class="black--text font-weight-bold">
      <DonateTopBar v-show="paymentProviderLoaded" @back="back" />
    </v-card-title>
    <v-card-text tag="dl">
      <v-row>
        <v-col>
          <v-tabs v-model="tab" grow icons-and-text>
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab v-for="provider in paymentProviders" :key="provider">
              {{ $t('components.payment_provider_list.payment_information') }}
              <v-icon>mdi-credit-card-multiple-outline</v-icon>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="provider in paymentProviders" :key="provider">
              <component
                :is="`payment-provider-${provider}`"
                @success="success"
                @loaded="paymentProviderLoaded = true"
              />
            </v-tab-item>
          </v-tabs-items>
          <!-- <v-overlay absolute :value="processing" z-index="4">
            <v-progress-circular indeterminate size="64" color="primary" />
          </v-overlay> -->
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'DonatePaymentDetailsStep',
  data() {
    return {
      tab: 0,
      paymentProviderLoaded: false,
    }
  },
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
          item_category: this.donationType,
          price: 0,
          quantity: 1,
        },
      ],
    }
    this.$gtm.push(gtmPayload)
  },
  computed: {
    // ...mapGetters('pages', ['currencySymbol']),
    ...mapState('pages', ['page']),
    ...mapState('payment', ['amount', 'donationType']),
    ...mapGetters('pages', ['settings']),
    paymentProviders() {
      if (this.$config.FEATURES.LIVE_PAYMENT === false) {
        return ['stripe']
      }
      return this.settings.payment_providers
    },
  },
  methods: {
    back() {
      return this.$emit('back')
    },
    success() {
      this.$emit('next')
    },
  },
}
</script>
