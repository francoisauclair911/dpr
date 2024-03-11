<template>
  <v-icon v-if="shareApiSupported" @click="share">mdi-share-variant</v-icon>
</template>

<script setup>

const props = defineProps({
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
})
const shareApiSupported = computed(() => {
  return navigator.share !== undefined
})
async function share() {
  try {
    await navigator.share({
      title: props.title,
      text: props.text,
      url: props.url,
    })
  } catch (err) {
    console.log('\x1b[32;1m%s\x1b[0m  ', '=> err', err)
  }
}

</script>
