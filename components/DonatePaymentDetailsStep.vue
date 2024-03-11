<template>
  <v-card flat>
    <v-card-title class="text-black font-weight-bold">
      <DonateTopBar v-show="data.paymentProviderLoaded" @back="back" />
    </v-card-title>
    <v-card-text tag="dl">
      <v-row>
        <v-col>
          <v-tabs v-model="data.tab" grow icons-and-text>
            <!-- <v-tabs-slider color="primary"></v-tabs-slider> -->
            <v-tab v-for="provider in paymentProviders" :key="provider">
              {{ $t('components.payment_provider_list.payment_information') }}
              <v-icon>mdi-credit-card-multiple-outline</v-icon>
            </v-tab>
          </v-tabs>
          <v-window v-model="data.tab">
            <v-window-item v-for="provider in paymentProviders" :key="provider">
              <component :is="getPaymentProviderComponent(provider)" @success="success"
                @loaded="data.paymentProviderLoaded = true" />
            </v-window-item>
          </v-window>
          <!-- <v-overlay absolute :value="processing" z-index="4">
            <v-progress-circular indeterminate size="64" color="primary" />
          </v-overlay> -->
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
const emit = defineEmits([
  'next',
  'back',
])

const paymentProviderStripe = resolveComponent('PaymentProviderStripe')

const { $config } = useNuxtApp()

const pagesStore = usePagesStore()
const paymentStore = usePaymentStore()

const data = reactive({
  tab: 0,
  paymentProviderLoaded: false,
})

const paymentProviders = computed(() => {
  if ($config.public.FEATURES.LIVE_PAYMENT === false) {
    return ['stripe']
  }
  return pagesStore.settings.payment_providers
})

function getPaymentProviderComponent(providerName) {
  switch (providerName) {
    case "stripe":
      return paymentProviderStripe
  }
}

onMounted(() => {
  const currency = pagesStore.page.attributes.settings.currency.toUpperCase()
  // const gtmPayload = {
  //   event: 'add_shipping_info',
  //   currency,
  //   value: this.amount,
  //   items: [
  //     {
  //       item_id: this.page.attributes.id,
  //       item_name: this.page.attributes.slug,
  //       affiliation: 'Donation Form',
  //       currency,
  //       item_category: this.donationType,
  //       price: 0,
  //       quantity: 1,
  //     },
  //   ],
  // }
  // this.$gtm.push(gtmPayload)
})

function back() {
  emit('back')
}

function success() {
  emit('next')
}

</script>