<template>
  <div>
    <v-row justify="space-between">
      <v-col>
        <Subheader>
          <div class="d-flex justify-space-between">
            {{ $t('components.thank_you_step.subheader.donation_detail') }}
            <SharerItem />
          </div>
        </Subheader>
      </v-col>
    </v-row>

    <DonationDetailRowItem :dt="$t('components.thank_you_step.fields.donation_amount')" :dd="formattedAmount" />
    <DonationDetailRowItem :dt="$t('components.thank_you_step.fields.name')"
      :dd="`${donor.firstName || '-/-'} ${donor.lastName || ''}`" />

    <DonationDetailRowItem :dt="$t('components.thank_you_step.fields.email')" :dd="donor.email || '-/-'" />

    <DonationDetailRowItem :dt="$t('components.thank_you_step.fields.date')" :dd="createdAt" />
    <slot name="append" />
  </div>
</template>

<script setup>

const props = defineProps({
  donationIntent: {
    type: Object,
    required: true,
  },
})

const isSuccessful = computed(() => {
  return props.donationIntent?.status === 'succeeded'
})
const isProcessing = computed(() => {
  return (
    props.donationIntent?.status === 'processing' ||
    props.donationIntent?.status === 'unknown'
  )
})
const createdAt = computed(() => {
  const date = new Date(props.donationIntent.createdAt)
  return new Intl.DateTimeFormat(window.navigator.language, {
    dateStyle: 'full',
  }).format(date)
})
const formattedAmount = computed(() => {
  const options = {
    style: 'currency',
    currency: donation.value.currency.toUpperCase(),
    maximumFractionDigits: 0,
  }
  const formattedAmount = new Intl.NumberFormat(
    window.navigator.language,
    options
  ).format(donation.value.formattedAmount)
  return formattedAmount
})
const donor = computed(() => {
  return props.donationIntent.donor
})
const donation = computed(() => {
  return props.donationIntent.donation
})

onMounted(() => {
  // NEED TO BE UNCOMMENTED FOR PROD
  const currency = props.donationIntent.donation.currency.toUpperCase()
  // const gtmPayload = {
  //   event: 'purchase',
  //   currency,
  //   value: this.donationIntent.donation.amount,
  //   affiliation: 'Donation form', //  how the transaction should be affiliated
  //   transaction_id: this.donationIntent.id,
  //   items: [
  //     {
  //       item_id: this.donationIntent.internalReferences.donationPageId,
  //       item_name: this.$route.params.page_slug,
  //       affiliation: 'Donation Form',
  //       currency,
  //       item_category: this.donationIntent.donation.donationType,
  //       price: 0,
  //       quantity: 1,
  //     },
  //   ],
  // }
  // this.$gtm.push(gtmPayload)
})

</script>