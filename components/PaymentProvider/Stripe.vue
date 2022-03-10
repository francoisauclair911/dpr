<template>
  <div>
    <pre>
      {{ formData }}
    </pre>
    <stripe-element-payment
      v-if="!loading"
      ref="paymentRef"
      :pk="pk"
      :elements-options="elementsOptions"
      :confirm-params="confirmParams"
    />
    <v-btn @click="pay">Pay stripw</v-btn>
  </div>
</template>

<script>
import { StripeElementPayment } from '@vue-stripe/vue-stripe'
import { mapActions } from 'vuex'
export default {
  name: 'PaymentProviderStripe',
  components: {
    StripeElementPayment,
  },
  inject: ['page', 'formData'],
  data() {
    return {
      loading: true,
      pk: null,
      elementsOptions: {
        appearance: {}, // appearance options
      },
      confirmParams: {
        return_url: 'https://localhost/success', // success url
      },
    }
  },
  fetch() {
    this.generatePaymentIntent()
  },
  methods: {
    ...mapActions('payment', ['authorize']),
    async generatePaymentIntent() {
      console.log('generatePaymentIntent')
      const {
        payment_intent_client_secret: clientSecret,
        publishable_key: pk,
      } = await this.authorize({
        paymentProvider: 'stripe',
        amount: this.formData.amount,
        page: this.page,
      })
      this.pk = pk
      this.elementsOptions.clientSecret = clientSecret
      this.loading = false
    },

    pay() {
      this.$refs.paymentRef.submit()
    },
  },
}
</script>
