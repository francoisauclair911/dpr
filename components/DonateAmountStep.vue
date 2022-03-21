<template>
  <v-card
    key="step1"
    height="auto"
    flat
    class="d-flex flex-column align-content-space-between"
  >
    <v-card-title
      class="black--text font-weight-bold"
      v-text="content.title"
    ></v-card-title>
    <v-card-text
      class="flex-grow-1 d-flex flex-column align-content-space-around"
    >
      <v-row>
        <v-col>
          <AdraMarkdownViewer :value="content.body" />
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col>
          <PredefinedAmounts />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <CustomAmount
            autofocus
            :error="missingAmount"
            :outlined="missingAmount"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <AdraMarkdownViewer
            class="small"
            :value="content.before_button_text"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex">
          <ButtonDonate @click="submit"> </ButtonDonate>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <AdraMarkdownViewer
            class="small"
            :value="content.after_button_text"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'DonateAmountStep',

  data() {
    return {
      missingAmount: false,
    }
  },
  computed: {
    ...mapState('payment', ['amount']),
    ...mapGetters('pages', ['content']),
    hasSelectedAmount() {
      return this.amount > 0
    },
  },
  watch: {
    amount() {
      this.missingAmount = false
    },
  },
  methods: {
    submit() {
      if (this.hasSelectedAmount) {
        return this.$emit('submit')
      }
      this.missingAmount = true
    },
  },
}
</script>
