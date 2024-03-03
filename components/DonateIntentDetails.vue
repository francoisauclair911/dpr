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

    <DonationDetailRowItem
      :dt="$t('components.thank_you_step.fields.donation_amount')"
      :dd="formattedAmount"
    />
    <DonationDetailRowItem
      :dt="$t('components.thank_you_step.fields.name')"
      :dd="`${donor.firstName || '-/-'} ${donor.lastName || ''}`"
    />

    <DonationDetailRowItem
      :dt="$t('components.thank_you_step.fields.email')"
      :dd="donor.email || '-/-'"
    />

    <DonationDetailRowItem
      :dt="$t('components.thank_you_step.fields.date')"
      :dd="createdAt"
    />
    <slot name="append" />
  </div>
</template>

<script>
export default {
  name: 'DonateThankYouStep',
  props: {
    donationIntent: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isSuccessful() {
      return this.donationIntent?.status === 'succeeded'
    },
    isProcessing() {
      return (
        this.donationIntent?.status === 'processing' ||
        this.donationIntent?.status === 'unknown'
      )
    },
    createdAt() {
      const date = new Date(this.donationIntent.createdAt)
      return new Intl.DateTimeFormat(window.navigator.language, {
        dateStyle: 'full',
      }).format(date)
    },
    formattedAmount() {
      const options = {
        style: 'currency',
        currency: this.donation.currency.toUpperCase(),
        maximumFractionDigits: 0,
      }
      const formattedAmount = new Intl.NumberFormat(
        window.navigator.language,
        options
      ).format(this.donation.formattedAmount)
      return formattedAmount
    },
    donor() {
      return this.donationIntent.donor
    },
    donation() {
      return this.donationIntent.donation
    },
  },
  mounted() {
    // NEED TO BE UNCOMMENTED FOR PROD
    const currency = this.donationIntent.donation.currency.toUpperCase()
    const gtmPayload = {
      event: 'purchase',
      currency,
      value: this.donationIntent.donation.amount,
      affiliation: 'Donation form', //  how the transaction should be affiliated
      transaction_id: this.donationIntent.id,
      items: [
        {
          item_id: this.donationIntent.internalReferences.donationPageId,
          item_name: this.$route.params.page_slug,
          affiliation: 'Donation Form',
          currency,
          item_category: this.donationIntent.donation.donationType,
          price: 0,
          quantity: 1,
        },
      ],
    }
    this.$gtm.push(gtmPayload)
  },
}
</script>
