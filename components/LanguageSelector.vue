<template>
  <div>
    <v-select
      :items="languages"
      hide-details
      item-value="code"
      item-text="nativeName"
      :placeholder="$t('components.language_selector.placeholder')"
      :value="$i18n.locale"
      @change="switchLanguage"
    ></v-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LanguageSelector',
  data() {
    return {
      lang: this.$route.query.lang,
    }
  },
  computed: {
    ...mapGetters('pages', ['attributes']),

    languages() {
      const pageLanguages = this.attributes.available_languages
      const i18nLanguages = this.$i18n.locales.map((l) => l.code)
      const mergedAndUnique = [...new Set([...pageLanguages, ...i18nLanguages])]
      return this.$iso.getLanguages(mergedAndUnique)
    },
  },
  methods: {
    async switchLanguage(languageCode) {
      await this.$store.dispatch('pages/getPage', {
        organizationId: this.attributes.internal_ids.organization_id,
        pageSlug: this.attributes.slug,
        languageCode,
      })
      this.$i18n.setLocale(languageCode)
      this.lang = languageCode
    },
  },
}
</script>
