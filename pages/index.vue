<template>
  <v-row class="mt-10 px-1 px-md-10">
    <v-col>
      <v-row>
        <v-col v-for="page in pagesStore.list" :key="page.id" cols="12" sm="6" md="4" lg="3">
          <!-- <DonationPageBox class="flex" :page="page"></DonationPageBox> -->
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>

import NoFundraisingPagesException from '~/exceptions/NoFundraisingPagesException'

const route = useRoute()
const error = useError()

const pagesStore = usePagesStore()
const settingsStore = useSettingsStore()

onBeforeRouteLeave((_, __) => {
  pagesStore.setPage(null)
  pagesStore.setBgOverride()
});

onMounted(async () => {
  try {
    await pagesStore.index({
      organizationId: settingsStore.domain?.organization_id,
    });
  } catch (e) {
    if (e instanceof NoFundraisingPagesException) {
      throw error({
        message: app.i18n.t('pages.error.no_fundraising_pages'),
      })
    }
    throw e
  }
})

watch(route, (_, __) => {
  pagesStore.index()
});

</script>
