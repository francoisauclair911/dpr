<template>
  <div>
    <v-tabs v-model="tab">
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab v-for="provider in paymentProviders" :key="provider">
        {{ provider === 'stripe' ? 'Card' : provider }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="provider in ['stripe', 'paypal']" :key="provider">
        <component :is="`payment-provider-${provider}`" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'PaymentProviderList',

  inject: ['page', 'formData'],

  data() {
    return {
      tab: 0,
    }
  },
  computed: {
    paymentProviders() {
      return this.page.attributes.settings.payment_providers
    },
  },
}
</script>
