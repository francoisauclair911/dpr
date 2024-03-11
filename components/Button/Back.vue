<template>
  <v-btn class="text-subtitle-2" variant="plain" icon v-bind="$attrs">
    <v-icon>{{ mdiChevronLeft }}</v-icon>
    <span class="text-subtitle-2 black--text text-capitalize">
      {{ $t('components.buttons.back') }}
    </span>
  </v-btn>
</template>

<script setup>

import { mdiChevronLeft } from '@mdi/js';

</script>