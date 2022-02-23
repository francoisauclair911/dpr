<template>
  <v-autocomplete
    v-bind="$attrs"
    :value="selectedLanguageCode"
    :items="languageNames"
    @change="changed"
  ></v-autocomplete>
</template>

<script>
import ISO6391 from 'iso-639-1'

export default {
  name: 'AdraLanguageSelector',
  props: {
    value: {
      type: [Array, String],
      default: '',
    },
  },
  computed: {
    selectedLanguageCode() {
      if (!Array.isArray(this.value)) {
        return ISO6391.getName(this.value)
      }
      return this.value.map((code) => {
        return ISO6391.getName(code)
      })
    },
    languageNames() {
      return ISO6391.getAllNames()
    },
  },
  methods: {
    changed(languages) {
      if (!languages) {
        return this.$emit('input', '')
      }
      if (Array.isArray(languages)) {
        const data = languages.map((lang) => {
          return ISO6391.getCode(lang)
        })
        return this.$emit('input', data)
      }
      return this.$emit('input', ISO6391.getCode(languages))
    },
  },
}
</script>

<style lang="scss" scoped></style>
