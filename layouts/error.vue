<template>
  <v-app dark>
    <v-row justify="center" align="start">
      <v-col cols="10" sm="8" md="4">
        <pre>
           {{ error }}
        </pre>
        <h2 class="text-h3 text-center font-weight-bold">Oops...</h2>
        <svg-404 class="my-4" />
        <h2 class="text-h3 text-center">
          {{ errorMessage }}
        </h2>
      </v-col>
    </v-row>
    <NuxtLink to="/"> Home page </NuxtLink>
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
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  computed: {
    errorMessage() {
      let message = 'An error occurred'
      switch (this.error.statusCode) {
        case 404:
          message = 'Page not found!'
          break

        default:
          break
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
