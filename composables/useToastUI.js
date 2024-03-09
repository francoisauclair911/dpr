const editorEvents = [
    'load',
    'change',
    'caretChange',
    'focus',
    'blur',
    'keydown',
    'keyup',
    'beforePreviewRender',
    'beforeConvertWysiwygToMarkdown',
];
const defaultValueMap = {
    initialEditType: 'markdown',
    initialValue: '',
    height: '300px',
    previewStyle: 'vertical',
};


export default function useToastUI({ options, initialEditType, initialValue, height, previewStyle }) {

    const { $emit } = useNuxtApp()

    const editor = ref(null)
    const computedOptions = ref(null)

    const eventOptions = {};

    editorEvents.forEach((event) => {
        eventOptions[event] = (...args) => {
            $emit(event, ...args);
        };
    });

    const options_ = {
        ...options,
        initialEditType: initialEditType,
        initialValue: initialValue,
        height: height,
        previewStyle: previewStyle,
        events: eventOptions,
    };

    Object.keys(defaultValueMap).forEach((key) => {
        if (!options_[key]) {
            options_[key] = defaultValueMap[key];
        }
    });

    computedOptions.value = options_


    function invoke(methodName, ...args) {
        let result = null;

        if (editor[methodName]) {
            result = editor[methodName](...args);
        }

        return result;
    }

    function destroyed() {
        editorEvents.forEach((event) => {
            editor.off(event);
        });
        editor.destroy();
    }

    return {
        editor,
        computedOptions,
        invoke,
        destroyed,
    }

}