<template>
  <div>
    <v-skeleton-loader v-show="loading" type="list-item-two-line@8, actions">
    </v-skeleton-loader>
    <v-card v-show="!loading" flat>
      <v-card-title class="black--text font-weight-bold">
        <ButtonBack @click="$emit('back')"></ButtonBack>

        <v-spacer />
        <div class="text-subtitle-1">
          <span class=""
            >{{ $t('components.step_2.header.donation_amount') }}
            &#8226;
          </span>
          <b class="primary--text">
            {{ numberFormat.format(amount) }}
          </b>
        </div>
      </v-card-title>
      <v-card-text>
        <v-divider />

        <DonorInfoForm
          class="mb-2"
          :donor-info="value.donorInfo"
          @ready="loading = false"
          @input="$emit('input', { ...value, donorInfo: $event })"
        />

        <ButtonPrimary block @click="next">Payment Details</ButtonPrimary>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'DonateDonorInfoStep',
  inject: ['page'],
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapState('payment', ['amount', 'donor']),
    ...mapGetters('pages', ['numberFormat']),
  },
  mounted() {
    const currency = this.page.attributes.settings.currency.toUpperCase()
    const gtmPayload = {
      event: 'add_to_cart',
      currency,
      value: this.amount,
      items: [
        {
          item_id: this.page.attributes.id,
          item_name: this.page.attributes.slug,
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

  methods: {
    next() {
      this.$store
        .dispatch('payment/validateDonorForm')
        .then((result) => {
          if (!result.error) {
            sessionStorage.setItem('donor', JSON.stringify(this.donorInfo))
            this.$emit('next')
          }
        })
        .catch((error) => {
          const code = parseInt(error.response && error.response.status)
          if (code === 422) {
            this.$store.dispatch(
              'notifications/danger',
              'Some fields require your attention'
            )
            this.$store.dispatch(
              'validation/handleValidation',
              error.response.data
            )
          }
        })
    },
  },
}
</script>
