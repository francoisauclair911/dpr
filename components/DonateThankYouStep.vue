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
    <v-skeleton-loader v-if="$fetchState.pending" type="sentences@5" />

    <v-card-text
      v-else-if="!$fetchState.pending && !errorFetchingIntent"
      tag="dl"
    >
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
        :dd="currencySymbol + intent.attributes.donation.amount"
      />
      <DonationDetailRowItem
        :dt="$t('components.thank_you_step.fields.name')"
        :dd="`${intent.attributes.donor.first_name || '-/-'} ${
          intent.attributes.donor.last_name || ''
        }`"
      />

      <DonationDetailRowItem
        :dt="$t('components.thank_you_step.fields.email')"
        :dd="intent.attributes.donor.email || '-/-'"
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
                '/' + $route.params.organization_id + '?utm_medium=constituent'
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
import { mapGetters, mapState } from 'vuex'
import DonateCardHeaderIcon from './DonateCardHeaderIcon.vue'

export default {
  name: 'DonateThankYouStep',
  props: {
    paymentProcessing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      errorFetchingIntent: false,
    }
  },
  async fetch() {
    try {
      await this.$store.dispatch(
        'payment/getIntent',
        this.$store.state.payment.donationIntentId
      )
    } catch (error) {
      return (this.errorFetchingIntent = true)
    }
  },
  beforeDestroy() {
    sessionStorage.clear()
  },
  computed: {
    ...mapState('payment', ['intent']),
    ...mapGetters('pages', ['currencySymbol']),
  },
  components: { DonateCardHeaderIcon },
}
</script>
