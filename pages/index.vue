<template>
  <v-row class="mt-10 px-1 px-md-10">
    <v-col>
      <v-row>
        <v-col v-for="page in pagesStore.list" :key="page.id" cols="12" sm="6" md="4" lg="3">
          <DonationPageBox class="flex" :page="page"></DonationPageBox>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>

import NoFundraisingPagesException from '~/exceptions/NoFundraisingPagesException'

const { $i18n } = useNuxtApp()
const route = useRoute()

const pagesStore = usePagesStore()
const settingsStore = useSettingsStore()

onBeforeRouteLeave((_, __) => {
  pagesStore.setPage(null)
  pagesStore.setBgOverride()
});

onBeforeMount(async () => {
  try {
    await pagesStore.index({
      organizationId: settingsStore.domain?.organization_id,
    });
  } catch (e) {
    if (e instanceof NoFundraisingPagesException) {
      throw createError({
        message: $i18n.t('pages.error.no_fundraising_pages'),
        fatal: true,
      })
    }
    throw e
  }
})


watch(() => route.query, (_, __) => {
  pagesStore.index()
});

</script>
