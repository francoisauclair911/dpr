<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="290"
    @click:outside="close"
    @keydown.esc="close"
  >
    <template #activator="{ on, attrs }">
      <slot name="activator" :open="open" :on="on" :attrs="attrs">
        <v-btn color="primary" dark @click="open"> Open Dialog </v-btn>
      </slot>
    </template>
    <template #default>
      <slot :close="close" :toggle="toggle">
        <v-card> lorem ipsum dolor sit</v-card>
      </slot>
    </template>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    close() {
      this.dialog = false
    },
    open() {
      this.dialog = true
    },
    toggle() {
      this.dialog = !this.dialog
    },
  },
}
</script>
