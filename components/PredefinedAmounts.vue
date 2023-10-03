<template>
  <v-row justify="center">
    <v-col
      v-for="(predefinedAmount, index) in content.predefined_amounts"
      :key="index"
      cols="6"
    >
      <v-hover v-slot="{ hover }">
        <ButtonBase
          block
          large
          style="transition: all 0.2s ease-in-out"
          :color="clickedAmount === index || hover ? '#C09337' : 'primary'"
          elevation="2"
          @click="selectAmount(index)"
        >
          <span
            class="white--text text-h6 font-weight-medium"
            v-text="predefinedAmount.label"
          />
        </ButtonBase>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PredefinedAmounts',
  data() {
    return {
      clickedAmount: null,
    }
  },
  computed: {
    ...mapGetters('pages', ['content']),
    ...mapGetters('payment', ['amount']),
  },
  methods: {
    selectAmount(index) {
      this.clickedAmount = index
      this.updateAmount(this.content.predefined_amounts[index].value)
    },
    ...mapMutations('payment', ['updateAmount']),
  },
}
</script>
