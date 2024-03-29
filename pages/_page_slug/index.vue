<template>
  <v-row class="my-10 px-1 px-md-10">
    <v-col cols="12" md="10" offset-md="1">
      <v-row :justify="rowJustification">
        <v-col cols="12" sm="9" md="6" lg="5" xl="4" class="">
          <v-card elevation="10" :loading="requestState === 'pending'">
            <v-overlay absolute :value="requestState === 'pending'" z-index="4">
              <v-progress-circular indeterminate size="50" color="white" />
            </v-overlay>
            <v-slide-x-reverse-transition hide-on-leave>
              <DonateAmountStep v-if="step === 1" @submit="goToDonorInfo" />
              <DonateDonorInfoStep
                v-if="step === 2"
                v-model="formData"
                @back="step--"
                @next="goToPaymentStep"
              />
              <DonatePaymentDetailsStep
                v-if="step === 3"
                :form-data="formData"
                @back="step--"
                @next="goToConfirmationStep"
              />
              <DonateConfirmation
                v-if="step === 4"
                :donation-intent-id="$store.state.payment.donationIntentId"
              />
            </v-slide-x-reverse-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { FundraisingPageNotFound } from '~/exceptions'
export default {
  name: 'PageIndex',
  provide() {
    return {
      page: this.page,
      content: this.content,
      formData: this.formData,
      amount: this.formData.amount,
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit('pages/SET_BG_OVERRIDE', null)
    })
  },
  async asyncData({ store, params, error, app }) {
    try {
      await store.dispatch('pages/getPage', {
        pageSlug: params.page_slug,
      })
    } catch (e) {
      if (e instanceof FundraisingPageNotFound) {
        error({
          message: app.i18n.t('pages.error.fundraising_page_not_found'),
        })
      }
    }
  },
  data() {
    return {
      requestState: 'idle',
      step: this.$route.query.step ? Number(this.$route.query.step) : 1,
      formData: {
        amount: 0,
        donorInfo: {},
      },
    }
  },
  head() {
    return {
      title: this?.content?.title || 'Donate',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description',
        },
      ],
    }
  },
  computed: {
    ...mapState('pages', ['page']),
    ...mapState('payment', ['donorInfo']),
    ...mapGetters('pages', ['content', 'form_alignment']),
    rowJustification() {
      return this.$vuetify.breakpoint.mobile ? 'center' : this.form_alignment
    },
  },
  watch: {
    /*
        / This watches the route and if the languages changes,
        / reloads the page content to get the translated content
        */
    $route: {
      async handler(to, from) {
        await this.$store.dispatch('pages/getPage', {
          pageSlug: to.params.page_slug,
        })
      },
    },
  },
  methods: {
    goToConfirmationStep() {
      this.step = 4
      history.pushState(
        {},
        null,
        `${this.$route.path}/confirm/${this.$store.state.payment.donationIntentId}?formAlignment=${this.rowJustification}`
      )
    },
    goToDonorInfo() {
      this.step = 2
    },
    goToPaymentStep() {
      this.step = 3
    },
  },
}
</script>
