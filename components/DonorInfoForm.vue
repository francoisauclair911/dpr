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
          <v-combobox
            v-model="form.title"
            autocomplete="honorific-prefix"
            hide-details="auto"
            dense
            :items="field.options"
            :placeholder="field.placeholder"
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
          <v-autocomplete
            v-if="countryListLoaded"
            v-model="form.country"
            :placeholder="field.placeholder"
            :label="field.label"
            hide-details="auto"
            autocomplete="country-name"
            outlined
            dense
            item-text="name"
            item-value="alpha3Code"
            :items="countryList"
          />

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
    <v-row v-if="content.gdpr_text" class="mt-0">
      <v-col cols="12">
        <TranslationField
          v-slot="{ field }"
          :field="$t('components.donorInfoForm.fields.city')"
        >
          <v-checkbox v-model="form.gdpr" hide-details="auto"
            ><template #label>
              <AdraMarkdownViewer :value="content.gdpr_text" /></template
          ></v-checkbox>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row v-if="content.communication_text" class="mt-0">
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
                :value="content.communication_text" /></template
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
  </v-form>
</template>

<script>
import PaymentProviderList from './PaymentProvider/List.vue'
export default {
  name: 'DonorInfoForm',
  components: { PaymentProviderList },
  inject: ['content'],
  props: {
    donorInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: this.donorInfo,
      countryList: [],
    }
  },
  async fetch() {
    const { data: countryList } = await this.$api.country('/')
    this.countryList = countryList
    this.$emit('ready')
  },
  computed: {
    countryListLoaded() {
      return this.countryList.length > 0
    },
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.$emit('input', this.form)
      },
    },
  },
}
</script>
<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus,
input:-internal-autofill-selected {
  /* border: 1px solid green; */
  /* -webkit-text-fill-color: green; */
  -webkit-box-shadow: 0 0 0px 1000px #fff inset;
  box-shadow: 0 0 0px 1000px #fff inset;
}
</style>
