<template>
  <div>
    <v-select v-show="languagesStore.languages.length > 1" prepend-inner-icon="mdi-translate"
      :items="languagesStore.languages" hide-details item-value="code" item-text="nativeName"
      :placeholder="'placeholder to be replaced'" :value="lang" no-data-text="No languages available"
      @change="languagesStore.switchLanguage"></v-select>
  </div>
</template>
      <!-- :placeholder="$t('components.language_selector.placeholder')" :value="lang" no-data-text="No languages available" -->

<script setup>

const languagesStore = useLanguageStore()
const lang = languagesStore.selected

</script>