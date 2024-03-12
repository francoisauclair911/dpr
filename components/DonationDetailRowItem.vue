<template>
  <v-row v-bind="$attrs" justify="space-between">
    <v-col cols="12" sm="6" md="auto">
      <dt class="font-weight-light text-secondary lighten-2 text-capitalize">
        {{ dt }}
      </dt>
    </v-col>
    <v-col cols="auto">
      <dd class="text-primary lighten-1" style="font-weight: 600">
        {{ dd }}
      </dd>
    </v-col>
  </v-row>
</template>

<script setup>
defineProps({
  dd: {
    type: String,
    default: '',
  },
  dt: {
    type: String,
    default: '',
  },
},
)
</script>
