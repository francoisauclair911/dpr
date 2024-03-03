<template>
  <VueTelInputVuetify
    :error="!isValid"
    :value="value.number"
    @input="inputPhone"
    mode="national"
    defaultCountry="CA"
    v-bind="$attrs"
  />
</template>

<script>
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue'

export default {
  name: 'AdraPhoneInput',
  props: {
    value: {
      type: Object,
      default: () => ({
        number: '',
      }),
    },
  },
  components: { VueTelInputVuetify },
  data() {
    return {
      isValid: true,
    }
  },

  methods: {
    inputPhone(formattedNumber, { number, valid, country }) {
      this.isValid = valid
      this.$emit('input:country_code', country.dialCode)
      this.$emit('input:number', number.significant)
    },
  },
}
</script>
