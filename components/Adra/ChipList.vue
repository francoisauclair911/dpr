<template>
  <div>
    <v-chip-group
      :value="selectedIndex"
      active-class="primary--text"
      column
      @change="change"
    >
      <v-chip v-for="item in items" :key="item" small color="primary">
        {{ item.attributes.name }}</v-chip
      >
    </v-chip-group>
    <v-dialog v-model="show" :max-width="modalWidth">
      <slot :selected="selected" :show="show"></slot>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AdraChipList',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    modalWidth: {
      type: [String, Number],
      default: '60vmax',
    },
  },
  data() {
    return {
      show: false,
      selectedIndex: null,
    }
  },
  computed: {
    selected() {
      return this.items[this.selectedIndex]
    },
  },
  methods: {
    change(value) {
      this.selectedIndex = value
      this.show = true
    },
  },
}
</script>

<style lang="scss" scoped></style>
