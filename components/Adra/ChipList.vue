<template>
  <div>
    <v-chip-group :model-value="data.selectedIndex" active-class="text-primary" column @update:model-value="change">
      <v-chip v-for="item in items" :key="item" small color="primary">
        {{ item.attributes.name }}</v-chip>
    </v-chip-group>
    <v-dialog v-model="data.show" :max-width="modalWidth">
      <slot :selected="selected" :show="data.show"></slot>
    </v-dialog>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  modalWidth: {
    type: [String, Number],
    default: '60vmax',
  },
})

const data = reactive({
  show: false,
  selectedIndex: null,
})

const selected = computed(() => {
  return props.items[data.selectedIndex]
})

function change(value) {
  data.selectedIndex = value
  data.show = true
}
</script>

<style lang="scss" scoped></style>
