<template>
  <v-row v-bind="$attrs">
    <v-col cols="12" sm="6">
      <dt
        class="font-weight-light secondary--text text--lighten-2 text-capitalize"
      >
        {{ dt }}
      </dt>
    </v-col>
    <v-col cols="auto">
      <dd class="secondary--text text--lighten-1" style="font-weight: 600">
        {{ dd }}
      </dd>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DonationDetailRowItem',
  props: {
    dd: {
      type: String,
      default: '',
    },
    dt: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
