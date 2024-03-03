<template>
  <div>
    <v-select v-show="languagesStore.languages.length > 1" color="success" bg-color="transparent"
      prepend-inner-icon="mdi-translate" :items="languagesStore.languages" hide-details item-value="code"
      item-title="nativeName" :placeholder="$t('components.language_selector.placeholder')" :model-value="lang"
      no-data-text="No languages available" @change="languagesStore.switchLanguage"></v-select>
  </div>
</template>

<script setup>

const languagesStore = useLanguageStore()
const lang = languagesStore.selected


</script>