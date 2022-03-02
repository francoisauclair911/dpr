<template>
  <v-skeleton-loader
    :loading="$fetchState.pending"
    type="list-item-two-line@8, actions"
  >
    <v-form class="py-4">
      <v-row>
        <v-col>
          <Subheader>
            {{ $t('components.donorInfoForm.subheaders.your_information') }}
          </Subheader>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TranslationField
            v-slot="{ field }"
            :field="$t('components.donorInfoForm.fields.title')"
          >
            <v-combobox
              v-model="form.title"
              hide-details="auto"
              dense
              :items="field.options"
              :placeholder="field.placeholder"
              item-text="label"
              item-value="value"
              :label="field.label"
              outlined
            >
            </v-combobox>
          </TranslationField>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <TranslationField
            v-slot="{ field }"
            :field="$t('components.donorInfoForm.fields.firstName')"
          >
            <v-text-field
              v-model="form.firstName"
              hide-details="auto"
              dense
              :placeholder="field.placeholder"
              :label="field.label"
              outlined
            >
            </v-text-field>
          </TranslationField>
        </v-col>
        <v-col cols="12" sm="6">
          <TranslationField
            v-slot="{ field }"
            :field="$t('components.donorInfoForm.fields.lastName')"
          >
            <v-text-field
              v-model="form.lastName"
              hide-details="auto"
              dense
              :items="field.options"
              :placeholder="field.placeholder"
              :label="field.label"
              outlined
            >
            </v-text-field>
          </TranslationField>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TranslationField
            v-slot="{ field }"
            :field="$t('components.donorInfoForm.fields.phone')"
          >
            <v-text-field
              v-model="form.phone"
              dense
              hide-details="auto"
              :items="field.options"
              :placeholder="field.placeholder"
              :label="field.label"
              outlined
            >
            </v-text-field>
          </TranslationField>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TranslationField
            v-slot="{ field }"
            :field="$t('components.donorInfoForm.fields.email')"
          >
            <v-text-field
              v-model="form.email"
              hide-details="auto"
              dense
              :items="field.options"
              :placeholder="field.placeholder"
              :label="field.label"
              outlined
            >
            </v-text-field>
          </TranslationField>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Subheader>
            {{ $t('components.donorInfoForm.subheaders.billing_information') }}
          </Subheader>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <TranslationField
            v-slot="{ field }"
            :field="$t('components.donorInfoForm.fields.street_address')"
          >
            <v-text-field
              v-model="form.street_address"
              hide-details="auto"
              dense
              :items="field.options"
              :placeholder="field.placeholder"
              :label="field.label"
              outlined
            >
            </v-text-field>
          </TranslationField>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <TranslationField
            v-slot="{ field }"
            :field="$t('components.donorInfoForm.fields.country')"
          >
            <v-select
              v-if="countryListLoaded"
              v-model="form.country"
              :placeholder="field.placeholder"
              :label="field.label"
              hide-details="auto"
              outlined
              dense
              item-text="name"
              item-value="alpha3Code"
              :items="countryList"
            >
            </v-select>
            <v-input v-else hide-details="auto">
              <v-progress-linear indeterminate />
            </v-input>
          </TranslationField>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <TranslationField
            v-slot="{ field }"
            :field="$t('components.donorInfoForm.fields.city')"
          >
            <v-text-field
              v-model="form.city"
              hide-details="auto"
              dense
              :items="field.options"
              :placeholder="field.placeholder"
              :label="field.label"
              outlined
            >
            </v-text-field>
          </TranslationField>
        </v-col>
      </v-row>
      <v-row v-if="page.attributes.content.gdpr_text">
        <v-col cols="12">
          <TranslationField
            v-slot="{ field }"
            :field="$t('components.donorInfoForm.fields.city')"
          >
            <v-checkbox v-model="form.gdpr" hide-details="auto"
              ><template #label>
                <AdraMarkdownViewer
                  :value="page.attributes.content.gdpr_text" /></template
            ></v-checkbox>
          </TranslationField>
        </v-col>
      </v-row>
      <v-row v-if="page.attributes.content.communication_text">
        <v-col cols="12">
          <TranslationField
            v-slot="{ field }"
            :field="$t('components.donorInfoForm.fields.city')"
          >
            <v-checkbox
              v-model="form.communication"
              hide-details="auto"
              class="mt-0"
              ><template #label>
                <AdraMarkdownViewer
                  :value="
                    page.attributes.content.communication_text
                  " /></template
            ></v-checkbox>
          </TranslationField>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Subheader>
            {{ $t('components.donorInfoForm.subheaders.payment_information') }}
          </Subheader>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <PaymentProviderList />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <ButtonDonate class="mx-auto" @click="$emit('submit')"></ButtonDonate>
        </v-col>
      </v-row>
    </v-form>
  </v-skeleton-loader>
</template>

<script>
import PaymentProviderList from './PaymentProvider/List.vue'
export default {
  name: 'DonorInfoForm',
  inject: ['page'],
  data() {
    return {
      form: {
        title: '',
        firstName: '',
        lastName: '',
        phone: '',
        gdpr: false,
        communication: false,
      },
      countryList: [],
    }
  },
  async fetch() {
    const { data: countryList } = await this.$api.country('/')
    this.countryList = countryList
  },
  computed: {
    countryListLoaded() {
      return this.countryList.length > 0
    },
  },
  components: { PaymentProviderList },
}
</script>
