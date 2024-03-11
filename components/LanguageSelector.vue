<template>
  <div>
    <v-select v-show="languagesStore.languages.length > 1" color="success" bg-color="transparent"
      :prepend-inner-icon="mdiTranslate" :items="languagesStore.languages" hide-details item-value="code"
      item-title="nativeName" :placeholder="$t('components.language_selector.placeholder')" :model-value="lang"
      no-data-text="No languages available" @update:model-value="languagesStore.switchLanguage"></v-select>
  </div>
</template>

<script setup>

import { mdiTranslate } from '@mdi/js';

const languagesStore = useLanguageStore()

const lang = computed(() => languagesStore.selected)

</script>