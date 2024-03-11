<template>
  <v-input v-bind="$attrs" hide-details="auto">
    <v-row dense>
      <v-col :cols="callingCodeCols" class="animate-grow">
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.phone_calling_code')">
          <v-text-field @focus="focusElement('callingCode')" @blur="focusElement(null)" :variant="$attrs.variant"
            :dense="$attrs.dense" :placeholder="field.placeholder" :density="$attrs.density" :label="field.label"
            prefix="+" @input="updateCallingCode" :value="data.callingCode" hide-details="auto">
          </v-text-field>
        </TranslationField>
      </v-col>

      <v-col :cols="numberCols" class="animate-grow">
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.phone_number')">
          <v-text-field @focus="focusElement('number')" @blur="focusElement(null)" :variant="$attrs.variant"
            :density="$attrs.density" :placeholder="field.placeholder" :label="field.label" @input="updateNumber"
            :value="data.number" hide-details="auto" />
        </TranslationField>
      </v-col>
    </v-row>
  </v-input>
</template>

<script setup>
const props = defineProps({
  value: {
    type: Object,
  },
})
const emit = defineEmits([
  'input:callingCode',
  'input:number',
])

const data = reactive({
  focusedElement: null,
  callingCode: null,
  number: null,
})

const numberCols = computed(() => {
  if (isNumberFocused.value) {
    return 8
  }
  return isCallingCodeFocused.value ? 4 : 6
})

const callingCodeCols = computed(() => {
  if (isCallingCodeFocused.value) {
    return 8
  }
  return isNumberFocused.value ? 4 : 6
})

const isNumberFocused = computed(() => {
  return data.focusedElement === 'number'
})
const isCallingCodeFocused = computed(() => {
  return data.focusedElement === 'callingCode'
})

function focusElement(element) {
  data.focusedElement = element
}
function keepNumericOnly(unsanitized) {
  return unsanitized.replace(/\D/g, '')
}
function updateCallingCode(callingCode) {
  data.callingCode = keepNumericOnly(callingCode)
  emit('input:callingCode', data.callingCode)
}
function updateNumber(number) {
  data.number = keepNumericOnly(number)
  emit('input:number', data.number)
}
</script>
<style scoped>
.animate-grow {
  transition: all 0.5s;
}
</style>
