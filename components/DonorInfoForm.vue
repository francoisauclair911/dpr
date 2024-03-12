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
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.title')">
          <ValidationHandler v-slot="{ errors, hasError }" v-bind="$attrs" name="title" keep-prefix>
            <v-combobox v-if="titlesLoaded" :modelValue="paymentStore.donor.title" @update:model-value="updateTitle"
              class="text-capitalize combobox" color="primary" autocomplete="honorific-prefix" hide-details="auto"
              item-value="value" item-text="label" :items="helpersStore.titles" :error-messages="errors"
              density="compact" :placeholder="field.placeholder" :label="field.label" variant="outlined" />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.firstName')">
          <ValidationHandler v-slot="{ errors, hasError }" v-bind="$attrs" name="first_name" keep-prefix>
            <v-text-field v-model="paymentStore.donor.first_name" hide-details="auto" :error-messages="errors"
              density="compact" color="primary" :placeholder="field.placeholder" :label="field.label"
              variant="outlined" />
          </ValidationHandler>
        </TranslationField>
      </v-col>
      <v-col cols="12" sm="6">
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.lastName')">
          <ValidationHandler v-slot="{ errors, hasError }" v-bind="$attrs" name="last_name" keep-prefix>
            <v-text-field v-model="paymentStore.donor.last_name" hide-details="auto" density="compact"
              :error-messages="errors" color="primary" :items="field.options" :placeholder="field.placeholder"
              :label="field.label" variant="outlined" />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row v-if="extended">
      <v-col>
        <ValidationHandler v-slot="{ errors, hasError }" v-bind="$attrs" name="phone" keep-prefix>
          <AdraPhoneField @input:callingCode="paymentStore.phone.countryCallingCode = $event"
            @input:number="paymentStore.phone.number = $event" :error-messages="errors" density="compact"
            variant="outlined" />
        </ValidationHandler>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.email')">
          <ValidationHandler v-slot="{ errors, hasError }" v-bind="$attrs" name="email" keep-prefix>
            <v-text-field v-model="paymentStore.donor.email" hide-details="auto" density="compact"
              :error-messages="errors" color="primary" :items="field.options" :placeholder="field.placeholder"
              :label="field.label" variant="outlined" />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row v-if="extended">
      <v-col>
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.birthday')">
          <ValidationHandler v-slot="{ errors, hasError }" v-bind="$attrs" name="birthday" keep-prefix>
            <AdraDatePicker v-model="paymentStore.donor.birthday" hide-details="auto" min="1900-01-01" density="compact"
              :error-messages="errors" :items="field.options" :placeholder="field.placeholder" :label="field.label"
              variant="outlined" />
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
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.address_line_1')">
          <ValidationHandler v-slot="{ errors }" v-bind="$attrs" name="address_line_1" keep-prefix>
            <v-text-field v-model="paymentStore.address.address_line_1" hide-details="auto" :error-messages="errors"
              density="compact" color="primary" :items="field.options" :placeholder="field.placeholder"
              :label="field.label" variant="outlined" />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row v-if="extended">
      <v-col cols="12">
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.address_line_2')">
          <ValidationHandler v-slot="{ errors }" v-bind="$attrs" name="address_line_2" keep-prefix>
            <v-text-field v-model="paymentStore.address.address_line_2" hide-details="auto" :error-messages="errors"
              density="compact" color="primary" :items="field.options" :placeholder="field.placeholder"
              :label="field.label" variant="outlined" />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row v-if="extended">
      <v-col cols="12">
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.country')">
          <ValidationHandler v-slot="{ errors }" v-bind="$attrs" name="country" keep-prefix>
            <v-autocomplete v-if="countriesLoaded" v-model="paymentStore.address.country" :error-messages="errors"
              color="primary" :placeholder="field.placeholder" :label="field.label" hide-details="auto"
              autocomplete="country-name" cache-items variant="outlined" density="compact" item-text="name"
              item-value="alpha3Code" :items="countries" />

            <v-input v-else hide-details="auto">
              <v-progress-linear indeterminate />
            </v-input>
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row v-if="extended">
      <v-col cols="12">
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.administrative_area')">
          <ValidationHandler v-slot="{ errors }" v-bind="$attrs" name="administrative_area" keep-prefix>
            <v-text-field v-model="paymentStore.address.administrative_area" :error-messages="errors"
              hide-details="auto" density="compact" color="primary" :items="field.options"
              :placeholder="field.placeholder" :label="field.label" variant="outlined" />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row v-if="extended">
      <v-col cols="12">
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.locality')">
          <ValidationHandler v-slot="{ errors }" v-bind="$attrs" name="locality" keep-prefix>
            <v-text-field v-model="paymentStore.address.locality" :error-messages="errors" hide-details="auto"
              density="compact" color="primary" :items="field.options" :placeholder="field.placeholder"
              :label="field.label" variant="outlined" />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row v-if="pagesStore.content.dependent_locality && extended">
      <v-col cols="12">
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.dependent_locality')">
          <ValidationHandler v-slot="{ errors }" v-bind="$attrs" name="dependent_locality" keep-prefix>
            <v-text-field v-model="paymentStore.address.dependent_locality" :error-messages="errors" hide-details="auto"
              density="compact" color="primary" :items="field.options" :placeholder="field.placeholder"
              :label="field.label" variant="outlined" />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row v-if="pagesStore.content.postal_code && extended">
      <v-col cols="12">
        <TranslationField v-slot="{ field }" :field="$tm('components.donorInfoForm.fields.postal_code')">
          <ValidationHandler v-slot="{ errors }" v-bind="$attrs" name="postal_code" keep-prefix>
            <v-text-field v-model="paymentStore.address.postal_code" :error-messages="errors" hide-details="auto"
              density="compact" color="primary" :items="field.options" :placeholder="field.placeholder"
              :label="field.label" variant="outlined" />
          </ValidationHandler>
        </TranslationField>
      </v-col>
    </v-row>
    <v-row v-if="pagesStore.content.gdpr_text" class="mt-0">
      <v-col cols="12">
        <ValidationHandler v-slot="{ errors }" v-bind="$attrs" name="gdpr" keep-prefix>
          <v-checkbox v-model="paymentStore.consents.gdpr" :error-messages="errors" density="compact" color="primary"
            hide-details="auto"><template #label>
              <AdraMarkdownViewer :value="pagesStore.content.gdpr_text" />
            </template></v-checkbox>
        </ValidationHandler>
      </v-col>
    </v-row>
    <v-row v-if="pagesStore.content.communication_text" class="mt-0">
      <v-col cols="12">
        <ValidationHandler v-slot="{ errors }" v-bind="$attrs" name="communication" keep-prefix>
          <v-checkbox v-model="paymentStore.consents.communication" :error-messages="errors" hide-details="auto"
            color="primary" density="compact" class="mt-0"><template #label>
              <AdraMarkdownViewer :value="pagesStore.content.communication_text" />
            </template></v-checkbox>
        </ValidationHandler>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>

import { storeToRefs } from 'pinia'
import { toRef } from 'vue'

defineProps({
  extended: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'ready',
])

const paymentStore = usePaymentStore()
const pagesStore = usePagesStore()
const helpersStore = useHelpersStore()

const updateGdpr = ref()

function initCheckboxes() {
  paymentStore.consents.gdpr = pagesStore.content.gdpr_text ? false : null
  paymentStore.consents.communication = pagesStore.content.communication_text ? false : null
}

function updateTitle(newTitle) {
  paymentStore.donor.title = newTitle?.value || newTitle || ''
}

onMounted(() => {

  initCheckboxes()
  if (pagesStore.content.gdpr_text) {
    updateGdpr.value = false
  }
  emit('ready')
})

</script>

<style scoped>
:deep(input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus,
  input:-internal-autofill-selected) {
  -webkit-box-shadow: 0 0 0px 1000px #fff inset;
  box-shadow: 0 0 0px 1000px #fff inset;
}

:deep(.v-input--checkbox .v-input__slot) {
  align-items: start;
}

/* Reduce checkboxes font-size */
:deep(.v-checkbox p) {
  font-size: 0.85rem;
}

:deep(.v-checkbox .v-label) {
  opacity: 1;
}

:deep(.v-text-field--outlined .v-input--dense .v-label--active) {
  z-index: 1;
}

:deep(.v-autocomplete input) {
  text-transform: capitalize;
}
</style>
