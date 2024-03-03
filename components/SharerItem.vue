<template>
  <v-icon v-if="shareApiSupported" @click="share">mdi-share-variant</v-icon>
</template>

<script>
export default {
  name: 'SharerItem',
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
  },

  computed: {
    shareApiSupported() {
      return navigator.share !== undefined
    },
  },
  methods: {
    async share() {
      try {
        await navigator.share({
          title: this.title,
          text: this.text,
          url: this.url,
        })
      } catch (err) {
        console.log('\x1b[32;1m%s\x1b[0m  ', '=> err', err)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
