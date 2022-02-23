<template>
  <v-row>
    <v-col cols="10" offset="1">
      <v-row :justify="form_alignment">
        <v-col cols="10" sm="7" md="3">
          <v-card>
            <v-card-title
              class="black--text font-weight-bold"
              v-text="content.title"
            ></v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <AdraMarkdownViewer :value="content.body" />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <PredefinedAmounts @click="formData.amount = $event" />

                  <CustomAmount v-model="formData.amount" class="mt-4" />
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
                  <v-btn
                    class="flex-grow-1"
                    retain-focus-on-click
                    color="primary"
                    large
                    elevation="2"
                  >
                    <span
                      class="white--text text-h6 font-weight-medium"
                      v-text="content.submit_text"
                    />
                  </v-btn>
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
  async asyncData({ store, params }) {
    await store.dispatch('pages/getPage', {
      organizationId: params.organization_id,
      pageSlug: params.page_slug,
    })
  },

  data() {
    return {
      formData: {
        amount: 0,
      },
    }
  },
  computed: {
    ...mapState('pages', ['page']),
    ...mapGetters('pages', [
      'settings',
      'attributes',
      'form_alignment',
      'content',
      'predefined_amounts',
    ]),
  },
  methods: {
    record(event) {
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> event', event)
    },
  },
}
</script>
