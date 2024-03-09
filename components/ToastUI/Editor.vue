<template>
    <div ref="toastuiEditor"></div>
</template>

<script setup>

import Editor from '@toast-ui/editor';

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
    initialEditType: {
        type: String,
    },
    previewStyle: {
        type: String,
    },
})

const toastuiEditor = ref(null)
const { editor, computedOptions } = useToastUI(props)

onMounted(() => {
    const options = { ...this.computedOptions, el: toastuiEditor.value };
    editor.value = new Editor(options);
})

watch(props.previewStyle, (newVal, _) => {
    editor.changePreviewStyle(newVal)
})
watch(props.height, (newVal, _) => {
    editor.height(newVal)
})

function getRootElement() {
    return toastuiEditor.value;
},

</script>

<!-- <script>
import { optionsMixin } from './mixin/option';

export default {
    name: 'ToastuiEditor',
    mixins: [optionsMixin],
    props: {
        previewStyle: {
            type: String,
        },
        height: {
            type: String,
        },
        initialEditType: {
            type: String,
        },
        initialValue: {
            type: String,
        },
        options: {
            type: Object,
        },
    },
    watch: {
        previewStyle(newValue) {
            this.editor.changePreviewStyle(newValue);
        },
        height(newValue) {
            this.editor.height(newValue);
        },
    },
    mounted() {
    },
    methods: {
        getRootElement() {
            return this.$refs.toastuiEditor;
        },
    },
};
</script> -->