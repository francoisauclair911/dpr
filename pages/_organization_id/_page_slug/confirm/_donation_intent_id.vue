<template>
  <v-row class="my-10 px-1 px-md-10">
    <v-col cols="12" md="10" offset-md="1">
      <v-row>
        <v-col cols="12" sm="9" md="6" lg="5" xl="3" class="">
          <DonateCard>
            <DonateThankYouStep
              v-if="showThankYou"
              :payment-processing="isProcessing"
            />
            <v-card v-else>
              <DonateCardHeaderIcon>
                <template #icon>
                  <v-icon size="32" color="red"> mdi-exclamation </v-icon>
                </template>
                <template #title>
                  {{ $t('pages.confirm.headers.unsuccessful') }}
                </template>
                <template #subtitle>
                  {{ $t('pages.confirm.headers.please_try_again') }}
                </template>
              </DonateCardHeaderIcon>

              <v-card-text>
                <ButtonPrimary
                  block
                  class="text-caption mx-auto"
                  @click="
                    $router.push(
                      `/${$route.params.organization_id}/${$route.params.page_slug}`
                    )
                  "
                >
                  {{ $t('pages.confirm.buttons.try_again') }}
                </ButtonPrimary>
              </v-card-text>
            </v-card>
          </DonateCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageConfirmation',
  async asyncData({ params, query, store }) {
    let response = null
    let error = null
    await store.dispatch('pages/getPage', {
      organizationId: params.organization_id,
      pageSlug: params.page_slug,
    })
    console.log('\x1b[32;1m%s\x1b[0m  ', '=> query', params.donation_intent_id)
    try {
      const {
        data: { data },
      } = await store.dispatch(
        'payment/confirm',
        params.donation_intent_id || store.state.payment.donationIntentId
      )
      response = data
    } catch (e) {
      error = true
    }
    return {
      response,
      error,
    }
  },
  mounted() {
    console.log('\x1b[32;1m%s\x1b[0m  ', '=> mounted')
    console.log('clearing session')
    sessionStorage.clear()
  },
  computed: {
    ...mapGetters('payment', ['intentStatus']),
    isSuccessful() {
      return !this.error && this.response.status === 'succeeded'
    },
    isProcessing() {
      return !this.error && this.response.status === 'processing'
    },
    showThankYou() {
      return this.isSuccessful || this.isProcessing
    },
  },
  beforeDestroy() {
    console.log('clearing session')
    sessionStorage.clear()
  },
}
</script>
