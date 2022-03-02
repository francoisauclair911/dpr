<template>
  <v-card flat>
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
      <v-row justify="space-between">
        <v-col>
          <Subheader>
            <div class="d-flex justify-space-between">
              {{ $t('components.step_3.subheader.donation_detail') }}
              <SharerItem />
            </div>
          </Subheader>
        </v-col>
      </v-row>
      <DonationDetailRowItem
        :dt="$t('components.step_3.fields.donation_amount')"
        :dd="currencySymbol + formData.amount"
      />
      <DonationDetailRowItem
        :dt="$t('components.step_3.fields.name')"
        :dd="`${formData.donorInfo.firstName || '-/-'} ${
          formData.donorInfo.lastName || ''
        }`"
      />
      <DonationDetailRowItem
        :dt="$t('components.step_3.fields.email')"
        :dd="formData.donorInfo.email || '-/-'"
      />
      <DonationDetailRowItem
        :dt="$t('components.step_3.fields.date')"
        :dd="new Date().toDateString()"
      />
      <v-divider class="my-4" />

      <v-row justify="center">
        <v-col cols="auto">
          <ButtonPrimary
            class="text-caption mx-auto"
            @click="
              $router.push(
                '/' + $route.params.organization_id + '?utm_medium=constituent'
              )
            "
          >
            {{ $t('components.step_3.buttons.support_other_causes') }}
          </ButtonPrimary>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DonateThirdStep',
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('pages', ['currencySymbol']),
  },
}
</script>
