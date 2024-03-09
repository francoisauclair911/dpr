<template>
  <v-row class="my-10 px-1 px-md-10">
    <v-col cols="12" md="10" offset-md="1">
      <v-row :justify="rowJustification">
        <v-col cols="12" sm="9" md="6" lg="5" xl="4" class="">
          <v-card elevation="10" :loading="data.requestState === 'pending'">
            <v-overlay absolute :value="data.requestState === 'pending'" z-index="4">
              <v-progress-circular indeterminate size="50" color="white" />
            </v-overlay>
            <v-slide-x-reverse-transition hide-on-leave>
              <DonateAmountStep v-if="data.step === 1" @submit="goToDonorInfo" />
              <!-- <DonateDonorInfoStep v-if="data.step === 2" v-model="data.formData" @back="data.step--"
                @next="goToPaymentStep" />
              <DonatePaymentDetailsStep v-if="data.step === 3" :form-data="data.formData" @back="data.step--"
                @next="goToConfirmationStep" />
              <DonateConfirmation v-if="data.step === 4" :donation-intent-id="paymentStore.donationIntentId" /> -->
            </v-slide-x-reverse-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import { FundraisingPageNotFound } from '~/exceptions'
import { onBeforeMount, provide } from 'vue';
import { useDisplay } from 'vuetify';

const route = useRoute()
const display = useDisplay()
const { $i18n } = useNuxtApp()

const pagesStore = usePagesStore()
const paymentStore = usePaymentStore()


const data = reactive({
  requestState: 'idle',
  step: route.query.step ? Number(route.query.step) : 1,
  formData: {
    amount: -1,
    donorInfo: {},
  },
})

await useAsyncData('indexGetPage', async () => {
  try {
    await pagesStore.getPage({
      pageSlug: route.params.page_slug,
    })
  } catch (e) {
    if (e instanceof FundraisingPageNotFound) {
      createError({
        message: $i18n.t('pages.error.fundraising_page_not_found'),
      })
    }
  }
})

provide('page', pagesStore.page)
provide('content', pagesStore.content)
provide('formData', data.formData)
provide('amount', data.formData.amount)

onBeforeMount(async () => {
  pagesStore.setBgOverride(null)
})

const rowJustification = computed(() => {
  return display.mobile ? 'center' : data.form_alignment
})

watch(route, async (to, __) => {
  await pagesStore.getPage({
    pageSlug: to.params.page_slug,
  });
})

function goToConfirmationStep() {
  data.step = 4
  history.pushState(
    {},
    null,
    `${route.path}/confirm/${paymentStore.donationIntentId}?formAlignment=${rowJustification}`
  )
}

function goToDonorInfo() {
  data.step = 2
}

function goToPaymentStep() {
  data.step = 3
}

</script>

<!-- <script>
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
  data() {
    return {
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
      },
    },
  },
  methods: {
  },
}
</script> -->
