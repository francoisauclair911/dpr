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
      <v-row>
        <v-col>
          <PredefinedAmounts @click="updateAmount" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <CustomAmount
            autofocus
            :error="missingAmount"
            :outlined="missingAmount"
            :value="amount"
            @input="updateAmount"
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
export default {
  name: 'DonateAmountStep',
  inject: ['content'],
  props: {
    amount: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      missingAmount: false,
    }
  },
  computed: {
    hasSelectedAmount() {
      return this.amount > 0
    },
  },
  methods: {
    updateAmount(newAmount) {
      this.missingAmount = false

      this.$emit('update:amount', Number(newAmount))
    },
    submit() {
      if (this.hasSelectedAmount) {
        return this.$emit('submit')
      }
      this.missingAmount = true
    },
  },
}
</script>
