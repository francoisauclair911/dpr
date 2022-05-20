<template>
  <div>
    <v-skeleton-loader type="card" :loading="loading">
      <v-skeleton-loader v-show="!showStripe" type="card"></v-skeleton-loader>
      <div v-show="showStripe">
        <!-- <p>3d 4000002500003155</p> -->
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
          {{ content.submit_text || $t('components.button_donate.donate') }}
        </ButtonPrimary>
      </div>

      <!-- </div> -->
    </v-skeleton-loader>
  </div>
</template>

<script>
import { StripeElementPayment } from '@vue-stripe/vue-stripe'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'PaymentProviderStripe',
  components: {
    StripeElementPayment,
  },
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
    ...mapGetters('pages', ['content']),

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
    if (this.$config.FEATURES.LIVE_PAYMENT === false) {
      this.setPk(this.$config.ADRA_DEMO_STRIPE_PK_KEY)
      this.setPaymentIntentSecret(this.$config.ADRA_DEMO_STRIPE_INTENT_SECRET)
      let intentId = this.$config.ADRA_DEMO_STRIPE_INTENT_SECRET.split('_')
      intentId = [intentId[0], intentId[1]].join('_')
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> intentId', intentId)
      this.setStripePaymentIntentId(intentId)
      return (this.loading = false)
    }
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
          paymentProvider: 'stripe',
          paymentProviderReferenceId: this.stripePaymentIntentId,
        })
        this.setPk(pk)
        this.setPaymentIntentSecret(clientSecret)
        this.setStripePaymentIntentId(stripePaymentIntentId)

        this.loading = false
      } catch (error) {
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
          paymentProvider: 'stripe',
          referenceId: this.stripePaymentIntentId,
          returnUrl: null,
        })
        if (this.$config.FEATURES.LIVE_PAYMENT === false) {
          return this.success()
        }
        this.$store.commit('payment/SET_DONATION_INTENT_ID', intentId)
        this.confirmParams.return_url =
          this.baseReturnUrl + `/${intentId}?payment_provider=stripe`

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
      // this.$emit('success')
      // sessionStorage.clear()
      this.$router.push(
        `${this.$route.path}/confirm/${this.$store.state.payment.donationIntentId}?payment_provider=stripe`
      )
    },
  },
}
</script>
