<template>
  <div>
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
          @success="$emit('success')"
          @processing="processing = $event"
        />
      </v-tab-item>
    </v-tabs-items>
    <v-overlay absolute :value="processing" z-index="4">
      <v-progress-circular indeterminate size="64" color="primary" />
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PaymentProviderList',

  data() {
    return {
      tab: 0,
      processing: false,
    }
  },
  computed: {
    ...mapGetters('pages', ['settings']),
    paymentProviders() {
      if (this.$config.FEATURES.LIVE_PAYMENT === false) {
        return ['stripe']
      }
      return this.settings.payment_providers
    },
  },
}
</script>
