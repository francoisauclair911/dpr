<template>
  <div>
    <slot :copy="copy" :is-copied="data.isCopied">
      <v-btn v-bind="$attrs" icon @click="copy(text)">
        <v-fade-transition>
          <v-icon v-if="!data.isCopied" small>{{ mdiContentCopy }}</v-icon>
          <v-icon v-else color="primary" small>{{ mdiCheck }}</v-icon>
        </v-fade-transition>
      </v-btn>
    </slot>
  </div>
</template>

<script setup>

import { mdiContentCopy, mdiCheck } from '@mdi/js'

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
})

const notificationsStore = useNotificationsStore()

const data = reactive({
  isCopied: false,
})

function copy(target) {
  navigator.clipboard
    .writeText(target)
    .then(() => {
      data.isCopied = true
      setTimeout(() => (data.isCopied = false), 500)
    })
    .catch(() => {
      notificationsStore.danger('Cannot copy the text')
    })
},
</script>

<style lang="scss" scoped></style>
