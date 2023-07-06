<template>
  <v-row class="my-10 px-1 px-md-10">
    <v-col cols="12" md="10" offset-md="1">
      <v-row :justify="$vuetify.breakpoint.mobile ? 'center' : form_alignment">
        <v-col cols="12" sm="9" md="6" lg="5" xl="3" class="">
          <v-card elevation="10" :loading="requestState === 'pending'">
            <v-overlay absolute :value="requestState === 'pending'" z-index="4">
              <v-progress-circular indeterminate size="50" color="white" />
            </v-overlay>
            <v-slide-x-transition hide-on-leave>
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
                @next="step++"
              />

              <DonateThankYouStep v-if="step === 4" />
            </v-slide-x-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
  async asyncData({ store, params }) {
    await store.dispatch('pages/getPage', {
      organizationId: store.state.settings.domain?.organization_id,
      pageSlug: params.page_slug,
    })
  },

  data() {
    return {
      requestState: 'idle',
      step: 1,
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
  },

  watch: {
    /*
    / This watches the route and if the languages changes,
    / reloads the page content to get the translated content
    */
    $route: {
      async handler(to, from) {
        await this.$store.dispatch('pages/getPage', {
          organizationId: to.params.organization_id,
          pageSlug: to.params.page_slug,
        })
      },
    },
  },
  mounted() {
    if (this.$route.query.amount) {
      this.$store.commit('payment/updateAmount', this.$route.query.amount)
    }
  },
  methods: {
    goToDonorInfo() {
      // this.$gtm.push({ event: 'start_donation' })
      this.step++
    },
    goToPaymentStep() {
      this.step++
    },
  },
}
</script>
