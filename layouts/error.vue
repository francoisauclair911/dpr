<template>
  <v-app>
    <v-row justify="center" align="center">
      <v-col cols="10" sm="8" md="4">
        <h2 class="text-h3 text-center">
          {{ $t('pages.error.title') }}
        </h2>
        <svg-404 class="my-4" />
        <h2 class="text-h4 text-center">
          {{ errorMessage }}
        </h2>
        <v-row class="mt-4" justify="center">
          <ButtonPrimary class="mx-auto" @click="$router.back()">
            {{ $t('pages.error.buttons.back') }}
          </ButtonPrimary>
        </v-row>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    return {
      title: this.errorMessage,
    }
  },

  computed: {
    statusCode() {
      return this.error.statusCode
    },
    errorMessage() {
      if (this.error.message && typeof this.error.message === 'string') {
        return this.error.message
      }
      const key = `pages.error.${this.error.statusCode}.message`
      const message = this.$t(key)
      if (message === key) {
        return this.$t('pages.error.500.message')
      }
      return message
    },
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
