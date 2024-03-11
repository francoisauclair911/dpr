<template>
  <v-input v-bind="$attrs">
    <v-row>
      <v-col>
        <ToastUIEditor ref="toastuiEditor" class="markdown-editor" :initial-value="value" :options="options"
          height="200px" initial-edit-type="wysiwyg" preview-style="vertical" @change="changed" />
      </v-col>
    </v-row>
  </v-input>
</template>

<script setup>
const props = defineProps({
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
})

const emit = defineEmits([
  'input'
])

const options = computed(() => {
  return {
    toolbarItems: props.toolbarItems,
    hideModeSwitch: props.hideModeSwitch,
  }
})
function changed() {
  emit('input', this.$refs.toastuiEditor.invoke('getMarkdown'))
}
</script>

<style lang="css">
.markdown-editor .toastui-editor-defaultUI {
  z-index: 0;
}
</style>
