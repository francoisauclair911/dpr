<template>
  <v-row justify="center">
    <v-col
      v-for="(amount, index) in page.attributes.content.predefined_amounts"
      :key="index"
      cols="6"
      class="d-flex flex-column flex-md-row"
      style="gap: 12px"
    >
      <v-btn
        class="flex-grow-1"
        :class="{ 'mr-2': index % 2 == 0 }"
        retain-focus-on-click
        color="primary"
        large
        elevation="2"
        @click="$emit('click', amount.value)"
      >
        <span
          class="white--text text-h6 font-weight-medium"
          v-text="amount.label"
        />
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PredefinedAmounts',
  inject: ['page'],
}
</script>
