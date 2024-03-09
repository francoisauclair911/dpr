<template>
  <v-card key="step1" height="auto" flat class="d-flex flex-column align-content-space-between">
    <v-card-title class="black--text font-weight-bold" v-text="pagesStore.content.title"></v-card-title>
    <v-card-text class="flex-grow-1 d-flex flex-column align-content-space-around">
      <v-row>
        <v-col>
          <AdraMarkdownViewer :value="pagesStore.content.body" />
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col>
          <DonationTypeSelector />
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col>
          <PredefinedAmounts />
        </v-col>
      </v-row>
      <v-row v-if="isCustomAmountEnabled">
        <v-col>
          <CustomAmount autofocus :error="missingAmount" :outlined="missingAmount" @keyup.enter="submit" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <AdraMarkdownViewer class="small" :value="pagesStore.content.before_button_text" />
        </v-col>
      </v-row>
      <v-slide-x-transition>
        <v-row v-if="showMultiplier">
          <v-col class="d-flex">
            <p class="text-subtitle-1">
              {{
      pagesStore.content.multiplier_text ||
      $t('components.donate_amount_step.multiplier_text')
    }}
              <b>{{ multipliedAmount }}</b>
            </p>
          </v-col>
        </v-row>
      </v-slide-x-transition>
      <v-row>
        <v-col class="d-flex">
          <ButtonDonate @click="submit"> {{ buttonText }} </ButtonDonate>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <AdraMarkdownViewer class="small" :value="pagesStore.content.after_button_text" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>

import { inject } from 'vue'

const { $i18n } = useNuxtApp()
const route = useRoute()
const emit = defineEmits(['submit'])

const pagesStore = usePagesStore()
const paymentStore = usePaymentStore()

const page = inject('page')
const missingAmount = ref(false)

const buttonText = computed(() => {
  return (
    pagesStore.content.submit_text || $i18n.t('components.button_donate.donate')
  )
})

const isCustomAmountEnabled = computed(() => {
  return pagesStore.settings.allow_custom_amount
})

const hasSelectedAmount = computed(() => {
  return paymentStore.amount > 0
})

const hasMultiplier = computed(() => {
  return page.attributes.settings.multiplier > 1
})

const showMultiplier = computed(() => {
  return !paymentStore.isRecurring && hasMultiplier.value && hasSelectedAmount.value
})

const multipliedAmount = computed(() => {
  return pagesStore.numberFormat.format(
    paymentStore.amount * page.attributes.settings.multiplier
  )
})

function submit() {
  console.log('🚀 ~ file: DonateAmountStep.vue:140 ~ submit ~ submit:')
  if (hasSelectedAmount.value) {
    return emit('submit')
  }
  missingAmount.value = true
}

watch(() => paymentStore.amount, (_, __) => {
  missingAmount.value = false
})


onMounted(() => {
  if (route.query.amount) {
    paymentStore.updateAmount(route.query.amount)
  }
})

</script>

<!-- <script>
// import { mapState, mapGetters } from 'vuex'

export default {
  name: 'DonateAmountStep',
  inject: ['page'],
  data() {
    return {
      missingAmount: false,
    }
  },
  mounted() {
    if (this.$route.query.amount) {
      this.$store.commit('payment/updateAmount', this.$route.query.amount)
    }
    this.$gtm.push({ event: 'start_donation' })

    const gtmPayload = {
      event: 'view_item',
      items: [
        {
          item_id: this.page.attributes.id,
          item_name: this.page.attributes.slug,
          affiliation: 'Donation Form',
          currency: this.page.attributes.settings.currency.toUpperCase(),
          item_category: 'One-time Donation',
          price: this.amount,
          quantity: 1,
        },
      ],
    }
    this.$gtm.push(gtmPayload)
  },
  computed: {
    ...mapState('payment', ['amount']),
    ...mapGetters('payment', ['isRecurring']),
    ...mapGetters('pages', ['content', 'numberFormat', 'settings']),
  },
  watch: {
  },
  methods: {
  },
}
</script> -->
