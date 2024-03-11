<template>
  <v-autocomplete v-bind="$attrs" :value="selectedLanguageCode" :items="languageNames"
    @change="changed"></v-autocomplete>
</template>

<script setup>
import ISO6391 from 'iso-639-1'

const props = defineProps({
  value: {
    type: [Array, String],
    default: '',
  },
})

const emit = defineEmits([
  'input',
])

const selectedLanguageCode = computed(() => {
  if (!Array.isArray(props.value)) {
    return ISO6391.getName(props.value)
  }
  return props.value.map((code) => {
    return ISO6391.getName(code)
  })
})

const languageNames = computed(() => {
  return ISO6391.getAllNames()
})

function changed(languages) {
  if (!languages) {
    return emit('input', '')
  }
  if (Array.isArray(languages)) {
    const data = languages.map((lang) => {
      return ISO6391.getCode(lang)
    })
    return emit('input', data)
  }
  return emit('input', ISO6391.getCode(languages))
}
</script>

<style lang="scss" scoped></style>
