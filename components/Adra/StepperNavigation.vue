<template>
  <v-row>
    <v-col>
      <slot name="previous">
        <ButtonPrimary v-if="step !== 1" :disabled="disablePrevious" @click="$emit('previous')">Previous
        </ButtonPrimary>
        <v-btn v-else plain color="red" @click="$emit('cancel')">Cancel </v-btn>
      </slot>

      <slot name="next">
        <ButtonPrimary :disabled="disableNext" @click="$emit('next')">Next</ButtonPrimary>
      </slot>
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
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
})

const disablePrevious = computed(() => props.step === 1 || props.disabled)
const disableNext = computed(() => props.step === props.max || props.disabled)
</script>
