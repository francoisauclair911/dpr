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
        <ValidationHandler
          name="phone"
          v-slot="{ errors, hasError }"
          v-bind="$attrs"
        >
          <AdraPhoneField
            @input:callingCode="phone_calling_code = $event"
            @input:number="phone_number = $event"
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
      <v-col>
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.birthday')"
        >
          <ValidationHandler
            name="birthday"
            v-slot="{ errors, hasError }"
            v-bind="$attrs"
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
          :field="$t('components.donorInfoForm.fields.address_line_1')"
        >
          <ValidationHandler
            name="address_line_1"
            v-slot="{ errors }"
            v-bind="$attrs"
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
    <v-row>
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.address_line_2')"
        >
          <ValidationHandler
            name="address_line_2"
            v-slot="{ errors }"
            v-bind="$attrs"
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
    <v-row>
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.country')"
        >
          <ValidationHandler name="country" v-slot="{ errors }" v-bind="$attrs">
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
    <v-row>
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.administrative_area')"
        >
          <ValidationHandler
            name="administrative_area"
            v-slot="{ errors }"
            v-bind="$attrs"
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
    <v-row>
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.locality')"
        >
          <ValidationHandler
            name="locality"
            v-slot="{ errors }"
            v-bind="$attrs"
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
    <v-row v-if="content.dependent_locality">
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.dependent_locality')"
        >
          <ValidationHandler
            name="dependent_locality"
            v-slot="{ errors }"
            v-bind="$attrs"
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
    <v-row v-if="content.postal_code">
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.postal_code')"
        >
          <ValidationHandler
            name="postal_code"
            v-slot="{ errors }"
            v-bind="$attrs"
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
      </v-col>
    </v-row>
    <v-row v-if="content.communication_text" class="mt-0">
      <v-col cols="12">
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
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'DonorInfoForm',

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
    ...mapFields('payment', [
      'donorInfo.title',
      'donorInfo.first_name',
      'donorInfo.last_name',
      'donorInfo.email',
      'donorInfo.birthday',
      'donorInfo.phone_number',
      'donorInfo.phone_calling_code',
      'donorInfo.postal_code',
      'donorInfo.address_line_1',
      'donorInfo.address_line_2',
      'donorInfo.dependent_locality',
      'donorInfo.locality',
      'donorInfo.country',
      'donorInfo.administrative_area',
      'donorInfo.communication',
      'donorInfo.gdpr',
    ]),
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
