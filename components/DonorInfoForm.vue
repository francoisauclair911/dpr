<template>
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
          <ValidationHandler
            name="title"
            v-slot="{ errors, hasError }"
            v-bind="$attrs"
          >
            <v-combobox
              :value="title"
              @input="updateTitle"
              class="text-capitalize"
              autocomplete="honorific-prefix"
              hide-details="auto"
              item-value="value"
              item-text="text"
              :error-messages="errors"
              dense
              :items="field.options"
              :placeholder="field.placeholder"
              :label="field.label"
              outlined
            />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.firstName')"
        >
          <ValidationHandler
            name="first_name"
            v-slot="{ errors, hasError }"
            v-bind="$attrs"
          >
            <v-text-field
              v-model="first_name"
              hide-details="auto"
              :error-messages="errors"
              dense
              :placeholder="field.placeholder"
              :label="field.label"
              outlined
            />
          </ValidationHandler>
        </TranslationField>
      </v-col>
      <v-col cols="12" sm="6">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.lastName')"
        >
          <ValidationHandler
            name="last_name"
            v-slot="{ errors, hasError }"
            v-bind="$attrs"
          >
            <v-text-field
              v-model="last_name"
              hide-details="auto"
              dense
              :error-messages="errors"
              :items="field.options"
              :placeholder="field.placeholder"
              :label="field.label"
              outlined
            />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.phone')"
        >
          <ValidationHandler
            name="phone"
            v-slot="{ errors, hasError }"
            v-bind="$attrs"
          >
            <v-text-field
              v-model="phone"
              :error-messages="errors"
              dense
              hide-details="auto"
              :items="field.options"
              :placeholder="field.placeholder"
              :label="field.label"
              outlined
            />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.email')"
        >
          <ValidationHandler
            name="email"
            v-slot="{ errors, hasError }"
            v-bind="$attrs"
          >
            <v-text-field
              v-model="email"
              hide-details="auto"
              dense
              :error-messages="errors"
              :items="field.options"
              :placeholder="field.placeholder"
              :label="field.label"
              outlined
            />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Subheader>
          {{ $t('components.donorInfoForm.subheaders.address_information') }}
        </Subheader>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.address_line1')"
        >
          <ValidationHandler
            name="address_line1"
            v-slot="{ errors }"
            v-bind="$attrs"
          >
            <v-text-field
              v-model="address_line1"
              hide-details="auto"
              :error-messages="errors"
              dense
              :items="field.options"
              :placeholder="field.placeholder"
              :label="field.label"
              outlined
            />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.address_line2')"
        >
          <ValidationHandler
            name="address_line2"
            v-slot="{ errors }"
            v-bind="$attrs"
          >
            <v-text-field
              v-model="address_line2"
              hide-details="auto"
              :error-messages="errors"
              dense
              :items="field.options"
              :placeholder="field.placeholder"
              :label="field.label"
              outlined
            />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.country')"
        >
          <ValidationHandler name="country" v-slot="{ errors }" v-bind="$attrs">
            <v-autocomplete
              v-if="countryListLoaded"
              v-model="country"
              :error-messages="errors"
              :placeholder="field.placeholder"
              :label="field.label"
              hide-details="auto"
              autocomplete="country-name"
              cache-items
              outlined
              dense
              item-text="name"
              item-value="alpha3Code"
              :items="countryList"
            />

            <v-input v-else hide-details="auto">
              <v-progress-linear indeterminate />
            </v-input>
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.city')"
        >
          <ValidationHandler name="city" v-slot="{ errors }" v-bind="$attrs">
            <v-text-field
              v-model="city"
              :error-messages="errors"
              hide-details="auto"
              dense
              :items="field.options"
              :placeholder="field.placeholder"
              :label="field.label"
              outlined
            />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row v-if="content.gdpr_text" class="mt-0">
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.gdpr_text')"
        >
          <ValidationHandler name="gdpr" v-slot="{ errors }" v-bind="$attrs">
            <v-checkbox
              v-model="gdpr"
              :error-messages="errors"
              dense
              hide-details="auto"
              ><template #label>
                <AdraMarkdownViewer :value="content.gdpr_text" /></template
            ></v-checkbox>
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row v-if="content.communication_text" class="mt-0">
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.communication_text')"
        >
          <ValidationHandler
            name="communication"
            v-slot="{ errors }"
            v-bind="$attrs"
          >
            <v-checkbox
              v-model="communication"
              :error-messages="errors"
              hide-details="auto"
              dense
              class="mt-0"
              ><template #label>
                <AdraMarkdownViewer
                  :value="content.communication_text" /></template
            ></v-checkbox>
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

import PaymentProviderList from './PaymentProvider/List.vue'
export default {
  name: 'DonorInfoForm',
  components: { PaymentProviderList },
  inject: ['content'],

  data() {
    return {
      form: {},

      countryList: [],
    }
  },
  async fetch() {
    const { data: countryList } = await this.$api.country('/')
    this.countryList = countryList
    this.$emit('ready')
  },
  methods: {
    updateTitle(event) {
      this.title = event?.value || event || ''
    },
  },
  computed: {
    capitalizeTitle() {
      return this.title.capitalize()
    },
    ...mapFields('payment', [
      'donorInfo.title',
      'donorInfo.first_name',
      'donorInfo.last_name',
      'donorInfo.email',
      'donorInfo.phone',
      'donorInfo.address_line1',
      'donorInfo.address_line2',
      'donorInfo.country',
      'donorInfo.city',
      'donorInfo.communication',
      'donorInfo.gdpr',
    ]),
    countryListLoaded() {
      return this.countryList.length > 0
    },
  },
}
</script>
<style scoped>
/deep/ input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus,
input:-internal-autofill-selected {
  -webkit-box-shadow: 0 0 0px 1000px #fff inset;
  box-shadow: 0 0 0px 1000px #fff inset;
}

/deep/ .v-input--checkbox .v-input__slot {
  align-items: start;
}

/* Reduce checkboxes font-size */
/deep/ .v-input--checkbox .v-input__slot p {
  font-size: 0.85rem;
}
/deep/ .v-text-field--outlined.v-input--dense .v-label--active {
  z-index: 1;
}
</style>
