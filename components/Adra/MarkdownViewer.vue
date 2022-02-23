<template>
  <viewer ref="toastuiViewer" :initial-value="formattedValue" height="500px" />
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor-viewer.css'

import { Viewer } from '@toast-ui/vue-editor'

export default {
  name: 'AdraMarkdownViewer',
  components: {
    viewer: Viewer,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      formattedValue: this.value,
    }
  },
  watch: {
    value() {
      this.formattedValue = this.$refs.toastuiViewer.invoke(
        'setMarkdown',
        this.value
      )
    },
  },
}
</script>

<style lang="scss" scoped></style>
