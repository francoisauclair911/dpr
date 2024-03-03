<template>
  <div>
    <slot :copy="copy" :is-copied="isCopied">
      <v-btn v-bind="$attrs" icon @click="copy(text)">
        <v-fade-transition>
          <v-icon v-if="!isCopied" small>mdi-content-copy</v-icon>
          <v-icon v-else color="primary" small>mdi-check</v-icon>
        </v-fade-transition>
      </v-btn>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'AdraCopy',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isCopied: false,
    }
  },
  methods: {
    copy(target) {
      navigator.clipboard
        .writeText(target)
        .then(() => {
          this.isCopied = true
          setTimeout(() => (this.isCopied = false), 500)
        })
        .catch(() => {
          this.$store.dispatch('notifications/danger', 'Cannot copy the text')
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
