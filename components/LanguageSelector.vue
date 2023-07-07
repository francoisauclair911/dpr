<template>
  <div>
    <v-select
      v-show="languages.length > 1"
      prepend-inner-icon="mdi-translate"
      :items="languages"
      hide-details
      item-value="code"
      item-text="nativeName"
      :placeholder="$t('components.language_selector.placeholder')"
      :value="lang"
      no-data-text="No languages available"
      @change="switchLanguage"
    ></v-select>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'LanguageSelector',

  computed: {
    ...mapState('languages', {
      lang: 'selected',
    }),
    ...mapGetters('languages', {
      languages: 'languages',
    }),
    ...mapGetters('pages', ['attributes']),
  },
  methods: {
    ...mapActions('languages', ['switchLanguage']),
  },
}
</script>
