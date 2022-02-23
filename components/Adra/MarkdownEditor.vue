<template>
  <v-input v-bind="$attrs">
    <v-row>
      <v-col>
        <editor
          ref="toastuiEditor"
          class="markdown-editor"
          :initial-value="value"
          :options="options"
          height="200px"
          initial-edit-type="wysiwyg"
          preview-style="vertical"
          @change="changed"
        />
      </v-col>
    </v-row>
  </v-input>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor } from '@toast-ui/vue-editor'

export default {
  name: 'AdraMarkdownEditor',
  components: {
    editor: Editor,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    toolbarItems: {
      type: Array,
      default: () => [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'link'],
        ['scrollSync'],
      ],
    },
    hideModeSwitch: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    options() {
      return {
        toolbarItems: this.toolbarItems,
        hideModeSwitch: this.hideModeSwitch,
      }
    },
  },
  methods: {
    changed() {
      this.$emit('input', this.$refs.toastuiEditor.invoke('getMarkdown'))
    },
  },
}
</script>

<style lang="css">
.markdown-editor .toastui-editor-defaultUI {
  z-index: 0;
}
</style>
