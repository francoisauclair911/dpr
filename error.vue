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
          <ButtonPrimary class="mx-auto" @click="clearAllErrors">
            {{ $t('pages.error.buttons.back') }}
          </ButtonPrimary>
        </v-row>
      </v-col>
    </v-row>
  </v-app>
</template>

<script setup>
const router = useRouter()
const error = useError()
const { $i18n } = useNuxtApp()

const statusCode = computed(() => error.statusCode)
const errorMessage = computed(() => {
  if (error.message && typeof error.message === 'string') {
    return error.message
  }
  const key = `pages.error.${statusCode.value || 500}.message`
  const message = $i18n.t(key)
  if (message === key) {
    return $i18n.t('pages.error.500.message')
  }
  return message
})

const clearAllErrors = () => {
  clearError()
  router.back()
}

</script>

<!-- <script>
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
    },
  },
}
</script>
 -->

<style scoped>
h1 {
  font-size: 20px;
}
</style>
