<template>
    <div ref="toastuiEditorViewer"></div>
</template>

<script setup>
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';

const props = defineProps({
    height: {
        type: String,
    },
    initialValue: {
        type: String,
    },
    options: {
        type: Object,
    },
})

const toastuiEditorViewer = ref(null)
const { editor, computedOptions } = useToastUI(props)

onMounted(() => {
    const options = { ...computedOptions, el: toastuiEditorViewer.value };
    editor.value = new Viewer(options)
})

function getRootElement() {
    return toastuiEditorViewer.value;
}

</script>