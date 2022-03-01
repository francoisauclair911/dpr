<template>
  <v-card>
    <!-- <v-card max-height="200" tile flat> -->
    <v-img
      class="white--text align-end"
      :src="page.attributes.settings.background_src"
      max-height="200"
    >
      <div class="fill-height bottom-gradient">
        <v-card-title class="">
          <!-- <v-overlay :absolute="true" :value="true"> -->
          {{ page.attributes.content.title }}
          <v-spacer />
          <ButtonBase color="white" nuxt append :to="page.attributes.slug"
            >Donate</ButtonBase
          >
          <!-- </v-overlay> -->
        </v-card-title>
      </div>
    </v-img>
    <!-- </v-card> -->
  </v-card>
</template>

<script>
export default {
  name: 'DonationPageBox',
  provide() {
    return {
      page: this.page,
    }
  },
  props: {
    page: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped>
.bottom-gradient {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}
</style>
