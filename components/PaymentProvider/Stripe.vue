<template>
  <div>
    <v-skeleton-loader v-if="data.loading && !data.error" type="card" />
    <div v-show="!data.loading && !data.error" id="checkout"></div>
    <v-card v-if="data.error" class="mt-4">
      <v-alert outlined color="primary" :icon="$vuetify.display.mdAndUp ? 'mdi-alert-circle-outline' : ''" prominent>
        {{ data.error.message }}
        <div class="d-flex" v-if="['amount_too_small', 'amount_too_large'].includes(data.error.code)">
          <CustomAmount class="flex-1 flex-grow-1" autofocus />
          <ButtonPrimary class="my-4 ml-4" small @click="reset">
            {{ $t('update_amount') }}</ButtonPrimary>
        </div>
      </v-alert>
    </v-card>
  </div>
</template>

<script setup>
import { loadStripe } from '@stripe/stripe-js/pure'
loadStripe.setLoadParameters({ advancedFraudSignals: false }) // https://github.com/stripe/stripe-js#disabling-advanced-fraud-detection-signals

const emit = defineEmits([
  'loaded',
])


const { $config, $api, $i18n } = useNuxtApp()
const paymentStore = usePaymentStore()
const pagesStore = usePagesStore()
const utmsStore = useUtmsStore()
const settingsStore = useSettingsStore()
const languageStore = useLanguageStore()

const data = reactive({
  stripe: null,
  checkout: null,
  clientSecret: null,
  loading: true,
  error: null,
  checkoutSessionId: null,
})

const { amount, donationType, currency, donor, phone, address, consents } = paymentStore

const returnUrl = computed(() => {
  const url = new URL(window.location.href)
  return `${url.origin}${url.pathname}/confirm/{{DONATION_INTENT_ID}}`
})
const stripeDonationType = computed(() => {
  return donationType === 'recurring'
    ? 'recurring_setup'
    : donationType
})
const initializePayload = computed(() => {
  return {
    returnUrl: returnUrl.value,
    paymentProvider: {
      referenceId: data.checkoutSessionId,
      accountId: settingsStore.stripeAccountId,
      name: 'stripe',
    },
    internalReferences: {
      organizationId: settingsStore.domain.organization_id,
      donationPageId: pagesStore.page.attributes.id,
    },
    donation: {
      donationType: stripeDonationType.value,
      amount: paymentStore.convertedAmount,
      currency: currency,
    },
    donor: { ...donor, languageCode: languageStore.selected },
    phone: phone,
    address: address,
    consents: consents,
    utms: utmsStore.utms,
  }
})

onMounted(async () => {
  await initialize()
  emit('loaded')
})

onBeforeUnmount(() => {
  destroy()
})

async function reset() {
  data.error = null
  data.loading = true
  destroy()
  await initialize()
}

// function clearVuex() {
//   localStorage.removeItem('vuex')
// }

function validateInitData() {
  if (!settingsStore.stripeAccountId) {
    throw new Error('stripeAccountId is required')
  }
  if (!$config.public.STRIPE_API_VERSION) {
    throw new Error('stripePublishableKey is required')
  }
}

function destroy() {
  if (data.checkout) {
    data.checkout.destroy()
  }
}
async function initialize() {
  try {
    validateInitData()
    const stripe = await loadStripe($config.public.STRIPE_PUBLISHABLE_KEY, {
      apiVersion: $config.public.STRIPE_API_VERSION,
      betas: $config.public.STRIPE_API_BETAS.split(',').map((o) => o.trim()),
      stripeAccount: settingsStore.stripeAccountId,
    })
    const response = await $api.payment(
      '/authorize/stripe/create',
      {
        method: 'POST',
        body: initializePayload.value,
      }
    )
    const {
      clientSecret,
      id: checkoutSessionId,
      donationIntentId = null,
    } = response.data
    const checkout = await stripe.initEmbeddedCheckout({
      clientSecret,
    })
    data.checkoutSessionId = checkoutSessionId
    // Store donationIntentId for reuse on the thank you page
    paymentStore.setDonationIntentId(donationIntentId)
    data.loading = false
    checkout.mount('#checkout')
    data.checkout = checkout
  } catch (error) {
    if (error.response && error.response.data) {
      data.error = {
        code: error.response.data?.internal_code || null,
        message: $i18n.$t(
          `invalid_payment_request_exceptions.${error.response.data?.internal_code || 'generic'
          }`
        ),
      }
    }
  }
}


</script>

<!-- 
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'

import { loadStripe } from '@stripe/stripe-js/pure'
import DonateAmountStep from '../DonateAmountStep.vue'
loadStripe.setLoadParameters({ advancedFraudSignals: false }) // https://github.com/stripe/stripe-js#disabling-advanced-fraud-detection-signals
export default {
  data() {
    return {
      stripe: null,
      checkout: null,
      clientSecret: null,
      loading: true,
      error: null,
    }
  },
  computed: {
    returnUrl() {
    },
    ...mapState('payment', [
      'amount',
      'donationType',
      'currency',
      'donor',
      'phone',
      'address',
      'consents',
    ]),
    ...mapState('pages', ['page']),
    ...mapState('utms', ['utms']),
    ...mapState('languages', {
      languageCode: 'selected',
    }),
    ...mapState('settings', ['domain']),
    ...mapGetters('payment', ['convertedAmount']),
    ...mapGetters('settings', ['stripeAccountId']),
    // if we are using stripe to setup recurring, we need to pass the donation type as recurring_setup
  },
  methods: {
  },
  components: { DonateAmountStep },
}
</script> -->
