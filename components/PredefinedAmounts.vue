<template>
  <v-row justify="center">
    <v-col
      v-for="(amount, index) in content.predefined_amounts"
      :key="index"
      cols="6"
    >
      <v-btn
        block
        retain-focus-on-click
        color="primary"
        large
        elevation="2"
        @click="updateAmount(amount.value)"
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
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PredefinedAmounts',
  inject: ['content'],
  methods: {
    ...mapMutations('payment', ['updateAmount']),
  },
}
</script>
