<template>
  <VueTelInputVuetify :error="!data.isValid" :value="value.number" @input="inputPhone" mode="national"
    defaultCountry="CA" v-bind="$attrs" />
</template>

<script setup>
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue'

const props = defineProps({
  value: {
    type: Object,
    default: () => ({
      number: '',
    }),
  }
})

const emit = defineEmits([
  'input:country_code',
  'input:number',
])

const data = reactive({
  isValid: true,
})

function inputPhone(formattedNumber, { number, valid, country }) {
  data.isValid = valid
  emit('input:country_code', country.dialCode)
  emit('input:number', number.significant)
}
</script>
