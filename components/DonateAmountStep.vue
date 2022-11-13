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
      <v-fade-transition>
        <v-row v-if="showMultiplier">
          <v-col class="d-flex">
            <p class="text-subtitle-1">
              {{
                content.multiplier_text ||
                $t('components.donate_amount_step.multiplier_text')
              }}
              <b>{{ multipliedAmount }}</b>
            </p>
          </v-col>
        </v-row>
      </v-fade-transition>
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
  inject: ['page'],
  data() {
    return {
      missingAmount: false,
    }
  },
  mounted() {
    this.$gtm.push({ event: 'start_donation' })

    const gtmPayload = {
      event: 'view_item',
      items: [
        {
          item_id: this.page.attributes.id,
          item_name: this.page.attributes.slug,
          affiliation: 'Donation Form',
          currency: this.page.attributes.settings.currency.toUpperCase(),
          item_category: 'One-time Donation',
          price: this.amount,
          quantity: 1,
        },
      ],
    }
    this.$gtm.push(gtmPayload)
  },
  computed: {
    ...mapState('payment', ['amount']),
    ...mapGetters('pages', ['content', 'numberFormat']),
    hasSelectedAmount() {
      return this.amount > 0
    },
    hasMultiplier() {
      return this.page.attributes.settings.multiplier > 1
    },
    showMultiplier() {
      return this.hasMultiplier && this.hasSelectedAmount
    },
    multipliedAmount() {
      return this.numberFormat.format(
        this.amount * this.page.attributes.settings.multiplier
      )
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
