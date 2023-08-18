<template>
  <v-form class="py-4">
    <v-row>
      <v-col>
        <Subheader>
          {{ $t('components.donorInfoForm.subheaders.your_information') }}
        </Subheader>
      </v-col>
    </v-row>
    <v-row v-if="extended">
      <v-col>
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.title')"
        >
          <ValidationHandler
            v-slot="{ errors, hasError }"
            v-bind="$attrs"
            name="title"
            keep-prefix
          >
            <v-combobox
              v-if="titlesLoaded"
              :value="title"
              @input="updateTitle"
              class="text-capitalize combobox"
              autocomplete="honorific-prefix"
              hide-details="auto"
              item-value="value"
              item-text="label"
              :items="titles"
              :error-messages="errors"
              dense
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
            v-slot="{ errors, hasError }"
            v-bind="$attrs"
            name="first_name"
            keep-prefix
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
            v-slot="{ errors, hasError }"
            v-bind="$attrs"
            name="last_name"
            keep-prefix
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
    <v-row v-if="extended">
      <v-col>
        <ValidationHandler
          v-slot="{ errors, hasError }"
          v-bind="$attrs"
          name="phone"
          keep-prefix
        >
          <AdraPhoneField
            @input:callingCode="phoneCountryCallingCode = $event"
            @input:number="phoneNumber = $event"
            :error-messages="errors"
            dense
            outlined
          />
        </ValidationHandler>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.email')"
        >
          <ValidationHandler
            v-slot="{ errors, hasError }"
            v-bind="$attrs"
            name="email"
            keep-prefix
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
    <v-row v-if="extended">
      <v-col>
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.birthday')"
        >
          <ValidationHandler
            v-slot="{ errors, hasError }"
            v-bind="$attrs"
            name="birthday"
            keep-prefix
          >
            <AdraDatePicker
              v-model="birthday"
              hide-details="auto"
              min="1900-01-01"
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
    <v-row v-if="extended">
      <v-col cols="12">
        <Subheader>
          {{ $t('components.donorInfoForm.subheaders.address_information') }}
        </Subheader>
      </v-col>
    </v-row>
    <v-row v-if="extended">
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.address_line_1')"
        >
          <ValidationHandler
            v-slot="{ errors }"
            v-bind="$attrs"
            name="address_line_1"
            keep-prefix
          >
            <v-text-field
              v-model="address_line_1"
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
    <v-row v-if="extended">
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.address_line_2')"
        >
          <ValidationHandler
            v-slot="{ errors }"
            v-bind="$attrs"
            name="address_line_2"
            keep-prefix
          >
            <v-text-field
              v-model="address_line_2"
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
    <v-row v-if="extended">
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.country')"
        >
          <ValidationHandler
            v-slot="{ errors }"
            v-bind="$attrs"
            name="country"
            keep-prefix
          >
            <v-autocomplete
              v-if="countriesLoaded"
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
              :items="countries"
            />

            <v-input v-else hide-details="auto">
              <v-progress-linear indeterminate />
            </v-input>
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row v-if="extended">
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.administrative_area')"
        >
          <ValidationHandler
            v-slot="{ errors }"
            v-bind="$attrs"
            name="administrative_area"
            keep-prefix
          >
            <v-text-field
              v-model="administrative_area"
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
    <v-row v-if="extended">
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.locality')"
        >
          <ValidationHandler
            v-slot="{ errors }"
            v-bind="$attrs"
            name="locality"
            keep-prefix
          >
            <v-text-field
              v-model="locality"
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
    <v-row v-if="content.dependent_locality && extended">
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.dependent_locality')"
        >
          <ValidationHandler
            v-slot="{ errors }"
            v-bind="$attrs"
            name="dependent_locality"
            keep-prefix
          >
            <v-text-field
              v-model="dependent_locality"
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
    <v-row v-if="content.postal_code && extended">
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.postal_code')"
        >
          <ValidationHandler
            v-slot="{ errors }"
            v-bind="$attrs"
            name="postal_code"
            keep-prefix
          >
            <v-text-field
              v-model="postal_code"
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
        <ValidationHandler
          v-slot="{ errors }"
          v-bind="$attrs"
          name="gdpr"
          keep-prefix
        >
          <v-checkbox
            v-model="gdpr"
            :error-messages="errors"
            dense
            hide-details="auto"
            ><template #label>
              <AdraMarkdownViewer :value="content.gdpr_text" /></template
          ></v-checkbox>
        </ValidationHandler>
      </v-col>
    </v-row>
    <v-row v-if="content.communication_text" class="mt-0">
      <v-col cols="12">
        <ValidationHandler
          v-slot="{ errors }"
          v-bind="$attrs"
          name="communication"
          keep-prefix
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
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'DonorInfoForm',
  props: {
    extended: {
      type: Boolean,
      default: false,
    },
  },
  fetch() {},
  mounted() {
    this.initCheckboxes()

    if (this.content.gdpr_text) {
      this.updateGdpr = false
    }
    this.$emit('ready')
  },
  methods: {
    initCheckboxes() {
      this.gdpr = this.content.gdpr_text ? false : null
      this.communication = this.content.communication_text ? false : null
    },
    updateTitle(title) {
      this.title = title?.value || title || ''
    },
  },
  computed: {
    capitalizeTitle() {
      return this.title.capitalize()
    },
    ...mapState('helpers', ['countries', 'titles']),
    ...mapGetters('helpers', ['countriesLoaded', 'titlesLoaded']),
    ...mapGetters('pages', ['content']),
    ...mapFields('payment', {
      phoneNumber: 'phone.number',
      phoneCountryCallingCode: 'phone.countryCallingCode',
      phoneExtension: 'phone.extension',
      address_line_1: 'address.address_line_1',
      address_line_2: 'address.address_line_2',
      postal_code: 'address.postal_code',
      dependent_locality: 'address.dependent_locality',
      locality: 'address.locality',
      administrative_area: 'address.administrative_area',
      country: 'address.country',
      gdpr: 'consents.gdpr',
      communication: 'consents.communication',
      title: 'donor.title',
      first_name: 'donor.first_name',
      last_name: 'donor.last_name',
      email: 'donor.email',
      birthday: 'donor.birthday',
    }),
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
/deep/ .v-autocomplete input {
  text-transform: capitalize;
}
</style>
