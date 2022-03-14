<template>
  <v-skeleton-loader type="card" :loading="loading">
    <pre>
      {{ $config.DONATION_PAGE_BASE_URL }}

      paymentServiceIntentId
      {{ paymentServiceIntentId }}
  </pre
    >
    {{ confirmParams.return_url }}
    <stripe-element-payment
      ref="paymentRef"
      :pk="pk"
      :test-mode="!$config.IS_PRODUCTION"
      :elements-options="elementsOptions"
      :confirm-params="confirmParams"
    />

    <ButtonPrimary class="mt-4" @click="pay">Pay stripw</ButtonPrimary>
  </v-skeleton-loader>
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
    }
  },
  computed: {
    confirmParams() {
      return {
        return_url: `${this.$config.DONATION_PAGE_BASE_URL}${this.$route.path}/confirm?ps_intent_id=${this.paymentServiceIntentId}`, // success url
      }
    },
    paymentServiceIntentId() {
      return this.$store.state.payment.intent?.id || ''
    },
  },
  mounted() {
    console.log('loaded')
  },
  async fetch() {
    try {
      const { client_secret: clientSecret, publishable_key: pk } =
        await this.preProcess({
          organizationId: this.page.attributes.internal_ids.organization_id,
          paymentProvider: 'stripe',
          amount: this.formData.amount,
          currency: this.page.attributes.settings.currency,
        })
      this.elementsOptions.clientSecret = clientSecret
      this.pk = pk
      this.loading = false
    } catch (error) {
      console.log(error)
      this.$error(
        'An error occurred with this payment provider, try again later, or select a different payment option'
      )
    }
  },
  methods: {
    ...mapActions('payment', ['preProcess', 'upsertIntent']),
    async pay() {
      try {
        await this.upsertIntent({
          amount: this.formData.amount,
          page: this.page,
          donorInfo: this.formData.donorInfo,
        })
        this.$refs.paymentRef.submit()
      } catch (error) {
        this.$error('Ooops ')
        console.log(error)
      }
    },
  },
}
</script>
