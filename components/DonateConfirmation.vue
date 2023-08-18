<template>
  <div :elevation="0">
    <AdraDebug>
      <v-btn @click="$fetchState.pending = !$fetchState.pending">{{
        $fetchState.pending ? 'Unload' : 'load'
      }}</v-btn>
      <v-btn @click="triggerError"> error</v-btn>
      <v-btn @click="resetError">reset error</v-btn>
    </AdraDebug>
    <v-card
      tile
      min-height="200px"
      color="primary"
      class="py-6 d-flex flex-column justify-center align-center white--text px-2"
    >
      <v-avatar
        size="60"
        :color="$fetchState.pending ? 'white' : 'white'"
        :class="{ 'adra-heart-container': $fetchState.pending }"
        class="adra-heart"
      >
        <v-icon
          size="32"
          :color="$fetchState.pending ? 'primary' : 'red'"
          :class="{ 'adra-heart-animated': !$fetchState.pending }"
          class="adra-heart"
        >
          {{ isFailed || $fetchState.error ? 'mdi-exclamation' : 'mdi-heart' }}
        </v-icon>
      </v-avatar>

      <v-slide-y-transition hide-on-leave>
        <p
          v-if="$fetchState.pending"
          key="confirmText"
          class="text-center my-2"
        >
          <span class="mt-2 text-h6 font-weight-normal"
            >Awaiting confirmation</span
          ><br />
          <span class="text-subtitle-2 text-center"> </span>
        </p>
        <p
          v-else-if="!$fetchState.pending && !$fetchState.error"
          class="text-center my-2"
        >
          <span class="my-2 text-h6 font-weight-normal">
            {{ confirmationTitle }} </span
          ><br />
          <span class="text-subtitle-2 text-center"
            >{{ confirmationSubtitle }}
          </span>
        </p>
        <p v-else class="text-center my-2">
          <span class="mt-2 text-h6 font-weight-normal">
            {{ $t('pages.confirm.headers.confirmation_error') }} </span
          ><br />
          <span class="text-subtitle-2 text-center">
            {{ $t('pages.confirm.headers.confirmation_error_instructions') }}
          </span>
        </p>
      </v-slide-y-transition>
      <!-- </div> -->
    </v-card>
    <v-expand-transition group>
      <div v-if="!$fetchState.pending" key="contentText">
        <v-divider></v-divider>
        <v-card-text tag="dl">
          <DonateIntentDetails
            v-if="!isFailed && donationIntent"
            :donation-intent="donationIntent"
          >
            <template #append>
              <v-divider class="my-4" />
              <v-row justify="center">
                <v-col cols="auto">
                  <ButtonPrimary
                    class="text-subtitle-2 mx-auto"
                    @click="$router.push('/')"
                  >
                    {{
                      $t(
                        'components.thank_you_step.buttons.support_other_causes'
                      )
                    }}
                  </ButtonPrimary>
                </v-col>
              </v-row>
            </template>
          </DonateIntentDetails>
          <p v-if="$fetchState.error || isFailed">
            <ButtonPrimary
              block
              medium
              class="text-subtitle-2 mx-auto"
              @click="$router.push(`/${$route.params.page_slug}`)"
            >
              {{ $t('pages.confirm.buttons.try_again') }}
            </ButtonPrimary>
          </p>
        </v-card-text>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  name: 'DonationConfirmation',
  props: {
    donationIntentId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      donationIntent: null,
    }
  },

  async fetch() {
    await this.getIntent()
  },
  computed: {
    confirmationTitle() {
      return this.isFailed
        ? this.$t('pages.confirm.headers.unsuccessful')
        : this.$t('components.thank_you_step.header.thank_you')
    },
    confirmationSubtitle() {
      return this.isFailed
        ? this.$t('pages.confirm.headers.please_try_again')
        : this.isProcessing
        ? this.$t('components.thank_you_step.header.payment_processing')
        : ''
    },
    isFailed() {
      return this.donationIntent?.status === 'failed'
    },
    isProcessing() {
      return this.donationIntent?.status === 'processing'
    },
  },
  methods: {
    triggerError() {
      this.$fetchState.error = 'someth'
      this.donationIntent = null
      this.$fetchState.pending = false
    },
    resetError() {
      this.getIntent()
      this.$fetchState.error = null
    },
    async getIntent() {
      const donationIntent = await this.$store.dispatch(
        'donation-intents/getConfirmation',
        this.donationIntentId
      )
      // this is to leave a moment to show animations
      await new Promise((resolve) => setTimeout(resolve, 950))

      this.donationIntent = donationIntent
    },
  },
}
</script>
<style>
@keyframes pulse {
  0% {
    transform: scale(0.95);
  }
  70% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0.95);
    color: blue !important;
  }
}
@keyframes pulseShadow {
  0% {
    /* transform: scale(0.95); */
    /* box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); */
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  70% {
    /* transform: scale(1.1); */
    box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
  }
  100% {
    /* transform: scale(0.95); */
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
}
.adra-heart-animated {
  animation-name: pulse;
  animation-iteration-count: 1;
  animation-duration: 1s;
  animation-timing-function: ease-in;
  animation-delay: 0.3s;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

.adra-heart-container {
  animation-name: pulseShadow;
  animation-iteration-count: infinite;
  animation-duration: 0.65s;
  animation-timing-function: ease-in;
  /* animation-delay: 2s; */
  animation-direction: alternate;
  /* animation-fill-mode: forwards; */
  animation-play-state: running;
}
.adra-heart {
  transition: all 0.5s ease-in !important;
}
</style>
