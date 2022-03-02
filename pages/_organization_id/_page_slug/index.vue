<template>
  <v-row class="my-10 px-1 px-md-10">
    <v-col cols="12" md="10" offset-md="1">
      <v-row :justify="$vuetify.breakpoint.mobile ? 'center' : form_alignment">
        <v-col cols="12" sm="9" md="6" lg="3" class="px-10 px-md-0">
          <v-card elevation="10">
            <v-slide-x-transition hide-on-leave>
              <v-card
                v-if="step === 1"
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
                      <PredefinedAmounts @click="formData.amount = $event" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <CustomAmount v-model="formData.amount" class="" />
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
                      <ButtonDonate @click="goToDonorInfo"> </ButtonDonate>
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
              <v-card v-if="step === 2" key="step2" flat>
                <v-card-title class="black--text font-weight-bold">
                  <v-btn class="text-subtitle-2" plain icon @click="step--">
                    <v-icon>mdi-chevron-left</v-icon>
                    <span class="text-subtitle-2 black--text text-capitalize">
                      Back</span
                    >
                  </v-btn>
                  <v-spacer />
                  <div class="text-subtitle-1">
                    <span class=""
                      >{{ $t('components.step_2.header.donation_amount') }}
                      &#8226;
                    </span>
                    <b class="primary--text">
                      {{ numberFormat.format(formData.amount) }}
                    </b>
                  </div>

                  <!-- <span class="text-subtitle-1"
                    >{{ $t('components.step_2.header.donation_amount') }}
                    <b class="primary--text">{{
                      currencySymbol + formData.amount
                    }}</b></span
                  > -->
                </v-card-title>
                <v-card-text>
                  <v-divider />

                  <DonorInfoForm @submit="step = 3" />
                </v-card-text>
              </v-card>

              <v-card v-if="step === 3" key="step3" flat>
                <v-card
                  color="primary"
                  tile
                  class="py-6 d-flex flex-column justify-center align-center white--text"
                >
                  <v-avatar color="white" size="60">
                    <v-icon size="32" color="primary"> mdi-heart </v-icon>
                  </v-avatar>
                  <span class="mt-2 text-subtitle-1"
                    >{{ $t('components.step_3.header.thank_you') }}
                  </span>
                </v-card>

                <v-card-text tag="dl">
                  <v-row>
                    <v-col>
                      <Subheader>{{
                        $t('components.step_3.subheader.donation_detail')
                      }}</Subheader>
                    </v-col>
                  </v-row>
                  <DonationDetailRowItem
                    :dt="$t('components.step_3.fields.donation_amount')"
                    :dd="currencySymbol + formData.amount"
                  />
                  <DonationDetailRowItem
                    :dt="$t('components.step_3.fields.name')"
                    :dd="`${formData.donorInfo.firstName} ${formData.donorInfo.lastName}`"
                  />
                  <DonationDetailRowItem
                    :dt="$t('components.step_3.fields.email')"
                    :dd="formData.donorInfo.email"
                  />
                  <DonationDetailRowItem
                    :dt="$t('components.step_3.fields.date')"
                    :dd="new Date().toDateString()"
                  />
                  <v-divider class="my-4" />
                  <v-row>
                    <v-col>
                      <SharerItem />
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-col cols="auto">
                      <ButtonPrimary class="text-caption mx-auto">
                        {{
                          $t('components.step_3.buttons.support_other_causes')
                        }}
                      </ButtonPrimary>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
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
    }
  },
  async asyncData({ store, params, query }) {
    await store.dispatch('pages/getPage', {
      organizationId: params.organization_id,
      pageSlug: params.page_slug,
      languageCode: query.lang,
    })
  },

  data() {
    return {
      step: 1,
      formData: {
        amount: 0,
        donorInfo: {
          title: '',
          firstName: '',
          lastName: '',
          phone: '',
        },
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
    ...mapGetters('pages', [
      'numberFormat',
      'attributes',
      'content',
      'currencySymbol',
      'form_alignment',
      'predefined_amounts',
      'settings',
    ]),
    hasSelectedAmount() {
      return this.formData.amount > 0
    },
  },
  methods: {
    goToDonorInfo() {
      if (!this.hasSelectedAmount) {
        return this.$success('Missing donation amount')
      }
      this.step++
    },
    record(event) {
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> event', event)
    },
  },
}
</script>
