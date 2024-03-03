<template>
  <v-row>
    <v-col>
      <slot name="previous">
        <ButtonPrimary
          v-if="step !== 1"
          :disabled="disablePrevious"
          @click="$emit('previous')"
          >Previous
        </ButtonPrimary>
        <v-btn v-else plain color="red" @click="$emit('cancel')">Cancel </v-btn>
      </slot>

      <slot name="next">
        <ButtonPrimary :disabled="disableNext" @click="$emit('next')"
          >Next</ButtonPrimary
        >
      </slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AdraStepperNavigation',
  props: {
    step: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    disablePrevious() {
      return this.step === 1 || this.disabled
    },
    disableNext() {
      return this.step === this.max || this.disabled
    },
  },
}
</script>
