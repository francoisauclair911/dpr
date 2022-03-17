<template>
  <div>
    <v-skeleton-loader type="card" :loading="loading">
      <!-- <div class="d-flex flex-column justify-center"> -->

      <v-skeleton-loader v-show="!showStripe" type="card"></v-skeleton-loader>
      <div v-show="showStripe">
        <p>3d 4000002500003155</p>
        <stripe-element-payment
          @element-ready="showStripe = true"
          class="mt-4"
          ref="paymentRef"
          :pk="pk"
          :test-mode="!$config.IS_PRODUCTION"
          :elements-options="elementsOptions"
          :confirm-params="confirmParams"
        />
        <ButtonPrimary class="mt-4" block @click="pay">
          {{
            page.attributes.content.submit_text ||
            $t('components.button_donate.donate')
          }}
        </ButtonPrimary>
      </div>

      <!-- </div> -->
    </v-skeleton-loader>
  </div>
</template>

<script>
import { StripeElementPayment } from '@vue-stripe/vue-stripe'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'PaymentProviderStripe',
  components: {
    StripeElementPayment,
  },
  inject: ['page', 'formData'],
  data() {
    return {
      loading: true,

      showStripe: false,
      pk: sessionStorage.getItem('stripePk'),
      stripePaymentIntentId: sessionStorage.getItem('stripePaymentIntentId'),
      elementsOptions: {
        appearance: {},
        clientSecret: sessionStorage.getItem('stripePaymentIntentSecret'),
      },
      confirmParams: {
        return_url: `${this.$config.DONATION_PAGE_BASE_URL}${this.$route.path}/confirm`,
      },
    }
  },
  computed: {
    ...mapState('payment', ['amount']),
    sessionActive() {
      return !!(
        this.pk &&
        this.stripePaymentIntentId &&
        this.elementsOptions.clientSecret
      )
    },
    baseReturnUrl() {
      return `${this.$config.DONATION_PAGE_BASE_URL}${this.$route.path}/confirm`
    },
    paymentServiceIntentId() {
      return this.$store.state.payment.intent?.id || ''
    },
  },
  mounted() {
    console.log('mounted')
    console.log('this.sessionActive', this.sessionActive)
    this.initSession()
  },
  methods: {
    async initSession() {
      console.log('initSession')
      try {
        const {
          client_secret: clientSecret,
          publishable_key: pk,
          payment_provider_reference_id: stripePaymentIntentId,
        } = await this.preProcess({
          organizationId: this.page.attributes.internal_ids.organization_id,
          paymentProvider: 'stripe',
          paymentProviderReferenceId: this.stripePaymentIntentId,
          amount: this.amount,
          // currency: this.page.attributes.settings.currency,
          currency: 'eur',
        })
        this.setPk(pk)
        this.setPaymentIntentSecret(clientSecret)
        this.setStripePaymentIntentId(stripePaymentIntentId)

        this.loading = false
      } catch (error) {
        console.log(error)
        this.$error(
          'An error occurred with this payment provider, try again later, or select a different payment option'
        )
      }
    },
    setPaymentIntentSecret(paymentIntentSecret) {
      this.elementsOptions.clientSecret = paymentIntentSecret
      sessionStorage.setItem('stripePaymentIntentSecret', paymentIntentSecret)
    },
    setStripePaymentIntentId(paymentIntentId) {
      console.log(
        'New stripe intent? ',
        this.stripePaymentIntentId !== paymentIntentId
      )

      this.stripePaymentIntentId = paymentIntentId
      sessionStorage.setItem('stripePaymentIntentId', paymentIntentId)
    },
    setPk(pk) {
      this.pk = pk
      sessionStorage.setItem('stripePk', pk)
    },

    ...mapActions('payment', ['preProcess', 'process']),
    async pay() {
      this.$emit('processing', true)
      try {
        const {
          data: {
            data: { intent_id: intentId = null },
          },
        } = await this.process({
          name: 'stripe',
          referenceId: this.stripePaymentIntentId,
          returnUrl: null,
        })
        this.$store.commit('payment/SET_DONATION_INTENT_ID', intentId)
        this.confirmParams.return_url = this.baseReturnUrl + `/${intentId}`
        // this.$refs.paymentRef.submit()
        this.confirmPayment()
      } catch (error) {
        this.$error('Ooops ')
        console.log(error)
        this.$emit('processing', false)
      }
    },
    confirmPayment() {
      this.$refs.paymentRef.stripe
        .confirmPayment({
          elements: this.$refs.paymentRef.elements,
          confirmParams: this.confirmParams,
          redirect: 'if_required',
        })
        .then((result) => {
          console.log('\x1b[32;1m%s\x1b[0m  ', '=> result', result)

          if (result.error) {
            this.$error(result.error.message)
            this.$emit('processing', false)
          }
          if (result.paymentIntent) {
            this.success()
          }
        })
    },
    success() {
      this.$emit('success')
      sessionStorage.clear()
    },
  },
}
</script>
