<template>
  <v-input v-bind="$attrs" hide-details="auto">
    <v-row dense>
      <v-col :cols="callingCodeCols" class="animate-grow">
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.phone_calling_code')">
          <v-text-field @focus="focusElement('callingCode')" @blur="focusElement(null)" :variant="$attrs.variant"
            :dense="$attrs.dense" :placeholder="field.placeholder" :density="$attrs.density" :label="field.label"
            prefix="+" @input="updateCallingCode" :value="callingCode" hide-details="auto">
          </v-text-field>
        </TranslationField>
      </v-col>

      <v-col :cols="numberCols" class="animate-grow">
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.phone_number')">
          <v-text-field @focus="focusElement('number')" @blur="focusElement(null)" :variant="$attrs.variant"
            :density="$attrs.density" :placeholder="field.placeholder" :label="field.label" @input="updateNumber"
            :value="number" hide-details="auto" />
        </TranslationField>
      </v-col>
    </v-row>
  </v-input>
</template>

<script>
export default {
  name: 'AdraPhoneField',
  props: {
    value: {
      type: Object,
    },
  },

  data() {
    return {
      focusedElement: null,
      callingCode: null,
      number: null,
    }
  },
  computed: {
    numberCols() {
      if (this.isNumberFocused) {
        return 8
      }
      return this.isCallingCodeFocused ? 4 : 6
    },

    callingCodeCols() {
      if (this.isCallingCodeFocused) {
        return 8
      }
      return this.isNumberFocused ? 4 : 6
    },

    isNumberFocused() {
      return this.focusedElement === 'number'
    },
    isCallingCodeFocused() {
      return this.focusedElement === 'callingCode'
    },
  },
  methods: {
    focusElement(element) {
      this.focusedElement = element
    },
    keepNumericOnly(unsanitized) {
      return unsanitized.replace(/\D/g, '')
    },
    updateCallingCode(callingCode) {
      this.callingCode = this.keepNumericOnly(callingCode)
      this.$emit('input:callingCode', this.callingCode)
    },
    updateNumber(number) {
      this.number = this.keepNumericOnly(number)
      this.$emit('input:number', this.number)
    },
  },
}
</script>
<style scoped>
.animate-grow {
  transition: all 0.5s;
}
</style>
