<template>
  <v-select
    prepend-inner-icon="mdi-translate"
    :items="languages"
    hide-details
    item-value="code"
    item-text="nativeName"
    :placeholder="$t('components.language_selector.placeholder')"
    :value="lang"
    @change="switchLanguage"
  ></v-select>
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

    // languages() {
    //   const pageLanguages = this.attributes.available_languages
    //   const i18nLanguages = this.$i18n.locales.map((l) => l.code)
    //   const mergedAndUnique = [...new Set([...pageLanguages, ...i18nLanguages])]
    //   return this.$iso.getLanguages(mergedAndUnique)
    // },
  },
  methods: {
    ...mapActions('languages', ['switchLanguage']),
  },
}
</script>
