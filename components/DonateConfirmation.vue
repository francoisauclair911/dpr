<template>
  <div :elevation="0">
    <AdraDebug>
      <v-btn @click="pending = !pending">{{
    pending ? 'Unload' : 'load'
  }}</v-btn>
      <v-btn @click="triggerError"> error</v-btn>
      <v-btn @click="resetError">reset error</v-btn>
    </AdraDebug>
    <v-card tile min-height="200px" color="primary"
      class="py-6 d-flex flex-column justify-center align-center white--text px-2">
      <v-avatar size="60" :color="pending ? 'white' : 'white'" :class="{ 'adra-heart-container': pending }"
        class="adra-heart">
        <v-icon size="32" :color="pending ? 'primary' : 'red'" :class="{ 'adra-heart-animated': !pending }"
          class="adra-heart">
          {{ isFailed || error ? mdiExclamation : mdiHeart }}
        </v-icon>
      </v-avatar>

      <v-slide-y-transition hide-on-leave>
        <p v-if="pending" key="confirmText" class="text-center my-2">
          <span class="mt-2 text-h6 font-weight-normal">Awaiting confirmation</span><br />
          <span class="text-subtitle-2 text-center"> </span>
        </p>
        <p v-else-if="!pending && !error" class="text-center my-2">
          <span class="my-2 text-h6 font-weight-normal">
            {{ confirmationTitle }} </span><br />
          <span class="text-subtitle-2 text-center">{{ confirmationSubtitle }}
          </span>
        </p>
        <p v-else class="text-center my-2">
          <span class="mt-2 text-h6 font-weight-normal">
            {{ $t('pages.confirm.headers.confirmation_error') }} </span><br />
          <span class="text-subtitle-2 text-center">
            {{ $t('pages.confirm.headers.confirmation_error_instructions') }}
          </span>
        </p>
      </v-slide-y-transition>
      <!-- </div> -->
    </v-card>
    <v-expand-transition group>
      <div v-if="!pending" key="contentText">
        <v-divider></v-divider>
        <v-card-text tag="dl">
          <DonateIntentDetails v-if="!isFailed && data.donationIntent" :donation-intent="data.donationIntent">
            <template #append>
              <v-divider class="my-4" />
              <v-row>
                <v-col class="d-flex">
                  <ButtonDonate @click="$router.push('/')">
                    <template #icon>
                      <v-icon left>{{ mdiHandHeart }}</v-icon>
                    </template>
                    <template #default>
                      {{
    $t(
      'components.thank_you_step.buttons.support_other_causes'
    )
  }}
                    </template>
                  </ButtonDonate>
                </v-col>
              </v-row>
            </template>
          </DonateIntentDetails>
          <p v-if="error || isFailed">
            <ButtonPrimary block medium class="text-subtitle-2 mx-auto"
              @click="$router.push(`/${$route.params.page_slug}`)">
              {{ $t('pages.confirm.buttons.try_again') }}
            </ButtonPrimary>
          </p>
        </v-card-text>
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup>
import { mdiHandHeart, mdiHeart, mdiExclamation } from '@mdi/js';

const props = defineProps({
  donationIntentId: {
    type: String,
    required: true,
  },
})

const { $i18n } = useNuxtApp()
const donationIntentStore = useDonationIntentsStore()

const data = reactive({
  donationIntent: null,
})

const { data: _, pending, error, refresh } = useAsyncData("getIntentDonationConfirmation", () => getIntent())

const confirmationTitle = computed(() => {
  return isFailed.value
    ? $i18n.t('pages.confirm.headers.unsuccessful')
    : $i18n.t('components.thank_you_step.header.thank_you')
})

const confirmationSubtitle = computed(() => {
  return isFailed.value
    ? $i18n.t('pages.confirm.headers.please_try_again')
    : isProcessing.value
      ? $i18n.t('components.thank_you_step.header.payment_processing')
      : ''
})

const isFailed = computed(() => {
  return data.donationIntent?.status === 'failed'
})

const isProcessing = computed(() => {
  return data.donationIntent?.status === 'processing'
})

function triggerError() {
  error.value = 'someth'
  data.donationIntent = null
  pending.value = false
}
function resetError() {
  getIntent()
  error.value = null
}
async function getIntent() {
  const donationIntent = await donationIntentStore.getConfirmation(props.donationIntentId)
  // this is to leave a moment to show animations
  await new Promise((resolve) => setTimeout(resolve, 950))

  data.donationIntent = donationIntent
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
