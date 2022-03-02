<template>
  <v-card flat>
    <v-card-title class="black--text font-weight-bold">
      <v-btn class="text-subtitle-2" plain icon @click="$emit('back')">
        <v-icon>mdi-chevron-left</v-icon>
        <span class="text-subtitle-2 black--text text-capitalize"> Back</span>
      </v-btn>
      <v-spacer />
      <div class="text-subtitle-1">
        <span class=""
          >{{ $t('components.step_2.header.donation_amount') }}
          &#8226;
        </span>
        <b class="primary--text">
          {{ numberFormat.format(value.amount) }}
        </b>
      </div>
    </v-card-title>
    <v-card-text>
      <v-divider />

      <DonorInfoForm
        :donor-info="value.donorInfo"
        @input="$emit('input', { ...value, donorInfo: $event })"
      />
      <v-row justify="center">
        <v-col cols="auto">
          <ButtonDonate class="mx-auto" @click="$emit('submit')"></ButtonDonate>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DonateSecondStep',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('pages', ['numberFormat']),
  },
}
</script>
