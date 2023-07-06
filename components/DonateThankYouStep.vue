<template>
  <v-card flat>
    <v-card
      color="primary"
      tile
      class="py-6 d-flex flex-column justify-center align-center white--text"
    >
      <v-avatar color="white" size="60">
        <v-icon size="32" color="primary"> mdi-heart </v-icon>
      </v-avatar>
      <span class="mt-2 text-subtitle-1"
        >{{ $t('components.thank_you_step.header.thank_you') }}
      </span>
      <span v-if="paymentProcessing" class="text-subtitle-2 text-center"
        >{{ $t('components.thank_you_step.header.payment_processing') }}
      </span>
    </v-card>

    <v-card-text tag="dl" v-if="hasNecessaryCacheData">
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
        :dd="currencySymbol + donation.amount"
      />
      <DonationDetailRowItem
        :dt="$t('components.thank_you_step.fields.name')"
        :dd="`${donor.first_name || '-/-'} ${donor.last_name || ''}`"
      />

      <DonationDetailRowItem
        :dt="$t('components.thank_you_step.fields.email')"
        :dd="donor.email || '-/-'"
      />

      <DonationDetailRowItem
        :dt="$t('components.thank_you_step.fields.date')"
        :dd="new Date().toDateString()"
      />
      <v-divider class="mt-4" />
    </v-card-text>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="auto">
          <ButtonPrimary
            class="text-caption mx-auto"
            @click="
              $router.push(
                '/' +
                  store.state.settings.domain.organization_id +
                  '?utm_medium=constituent'
              )
            "
          >
            {{ $t('components.thank_you_step.buttons.support_other_causes') }}
          </ButtonPrimary>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DonateThankYouStep',
  props: {
    paymentProcessing: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    console.log('mounted thank you')
    console.log('this.donation', this.donation)
    const currency = this.donation.currency.toUpperCase()
    const gtmPayload = {
      event: 'purchase',
      currency,
      value: this.donation.amount,
      affiliation: 'Donation form', //  how the transaction should be affiliated
      transaction_id:
        this.$route.params.donation_intent_id ||
        this.$store.state.payment.donationIntentId,
      items: [
        {
          item_id: this.donation.donation_page_id,
          item_name: this.$route.params.page_slug,
          affiliation: 'Donation Form',
          currency,
          item_category: 'One-time Donation',
          price: 0,
          quantity: 1,
        },
      ],
    }
    this.$gtm.push(gtmPayload)
  },
  computed: {
    ...mapGetters('pages', ['currencySymbol']),
    hasNecessaryCacheData() {
      return (
        sessionStorage.getItem('donor') && sessionStorage.getItem('donation')
      )
    },
    donor() {
      const donor = sessionStorage.getItem('donor')
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> donor', donor)
      return JSON.parse(donor)
    },
    donation() {
      const donation = sessionStorage.getItem('donation')
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> donation', donation)
      return JSON.parse(donation)
    },
  },
}
</script>
