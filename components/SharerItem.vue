<template>
  <ButtonPrimary @click="share">Share</ButtonPrimary>
</template>

<script>
export default {
  name: 'SharerItem',
  data() {
    return {}
  },
  methods: {
    async share() {
      try {
        await navigator.share({
          title: 'MDN',
          text: 'Learn web development on MDN!',
          url: 'https://developer.mozilla.org',
        })
      } catch (err) {
        console.log('\x1b[32;1m%s\x1b[0m  ', '=> err', err)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
