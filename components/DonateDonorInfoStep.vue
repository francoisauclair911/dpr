<template>
  <div>
    <v-skeleton-loader v-show="loading" type="list-item-two-line@8, actions">
    </v-skeleton-loader>
    <v-card v-show="!loading" flat>
      <!-- <v-card-text> -->

      <v-card-title class="black--text font-weight-bold">
        <DonateTopBar @back="$emit('back')"></DonateTopBar>
      </v-card-title>
      <v-card-text>
        <v-divider />

        <DonorInfoForm class="mb-2" :donor-info="value.donorInfo" @ready="loading = false"
          @input="$emit('input', { ...value, donorInfo: $event })" />

        <v-row>
          <v-col class="d-flex">
            <ButtonDonate @click="next">
              {{ $t('components.donor_info_step.payment_details_button_text') }}
            </ButtonDonate>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>

defineProps({
  value: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'back',
  'input',
  'next',
])

const page = inject('page')
const loading = ref(true)
const paymentStore = usePaymentStore()
const notificationsStore = useNotificationsStore()
const validationStore = useValidationStore()
const { $i18n } = useNuxtApp()

const displayedAmountText = computed(() => {
  return !paymentStore.isRecurring
    ? paymentStore.formattedAmount
    : `${paymentStore.formattedAmount}  ${$i18n.t(
      'components.donor_info_step.monthly'
    )}`
})

onMounted(() => {
  const currency = page.attributes.settings.currency.toUpperCase()
  // const gtmPayload = {
  //   event: 'add_to_cart',
  //   currency,
  //   value: this.amount,
  //   items: [
  //     {
  //       item_id: this.page.attributes.id,
  //       item_name: this.page.attributes.slug,
  //       affiliation: 'Donation Form',
  //       currency,
  //       item_category: 'One-time Donation',
  //       price: 0,
  //       quantity: 1,
  //     },
  //   ],
  // }
  // this.$gtm.push(gtmPayload)
})
function next() {
  paymentStore.validateDonorForm().then((result) => {
    if (!result.error) {
      sessionStorage.setItem('donor', JSON.stringify(this.donorInfo))
      emit('next')
    }
  })
    .catch((error) => {
      const code = parseInt(error.response && error.response.status)
      if (code === 422) {
        notificationsStore.danger('Some fields require your attention')
        // validationStore.handleValidation(error.response.data)
      }
    })
}

</script>
