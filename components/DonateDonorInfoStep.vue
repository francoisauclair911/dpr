<template>
  <div>
    <v-skeleton-loader v-show="loading" type="list-item-two-line@8, actions">
    </v-skeleton-loader>
    <v-card v-show="!loading" flat>
      <v-card-title class="black--text font-weight-bold">
        <ButtonBack @click="$emit('back')"></ButtonBack>
        <!-- <v-btn class="text-subtitle-2" plain icon @click="$emit('back')">
          <v-icon>mdi-chevron-left</v-icon>
          <span class="text-subtitle-2 black--text text-capitalize"> Back</span>
        </v-btn> -->
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
          :donor-info="value.donorInfo"
          @ready="loading = false"
          @input="$emit('input', { ...value, donorInfo: $event })"
        />

        <ButtonPrimary @click="next">Payment Details</ButtonPrimary>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'DonateDonorInfoStep',
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
    ...mapState('payment', ['amount']),
    ...mapGetters('pages', ['numberFormat']),
  },
  methods: {
    next() {
      this.$store.dispatch('payment/validateDonorForm').then((result) => {
        if (!result.error) {
          this.$emit('next')
        }
      })
    },
  },
}
</script>
