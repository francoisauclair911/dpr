<template>
  <v-row class="my-10 px-1 px-md-10">
    <v-col cols="12" md="10" offset-md="1">
      <v-row :justify="$vuetify.breakpoint.mobile ? 'center' : form_alignment">
        <!-- <v-col cols="3">
          <v-card
            ><v-card-text>
              {{ requestState }}
            </v-card-text></v-card
          >
        </v-col> -->
        <v-col cols="12" sm="9" md="6" lg="3" class="px-10 px-md-0">
          <v-card elevation="10" :loading="requestState === 'pending'">
            <v-overlay absolute :value="requestState === 'pending'" z-index="4">
              <v-progress-circular indeterminate size="50" color="white" />
            </v-overlay>
            <v-slide-x-transition hide-on-leave>
              <DonateFirstStep
                v-if="step === 1"
                :amount="formData.amount"
                @update:amount="formData.amount = $event"
                @submit="goToDonorInfo"
              />
              <DonateSecondStep
                v-if="step === 2"
                v-model="formData"
                @back="step--"
                @submit="submitDonation"
              />
              <DonateThirdStep v-if="step === 3" :form-data="formData" />
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
    }
  },
  async asyncData({ store, params }) {
    await store.dispatch('pages/getPage', {
      organizationId: params.organization_id,
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
  methods: {
    submitDonation() {
      let visitorId = null
      let confidenceScore = null
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> submitDonation')

      this.$fingerprint
        .then((fp) => fp.get())
        .then((res) => {
          visitorId = res?.visitorId || null
          confidenceScore = res?.confidence?.score || null
        })
        .catch((e) => console.log('oops fingerprint crashed'))

      this.requestState = 'pending'
      const payload = {
        ...this.formData.donorInfo,
        fingerprint: {
          visitorId,
          confidenceScore,
        },
        amount: this.formData.amount,
      }
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> payload', payload)
      setTimeout(() => {
        this.requestState = 'success'
        this.step = 3
        this.requestState = 'idle'
      }, 1500)
    },
    goToDonorInfo() {
      this.step++
    },
  },
}
</script>
