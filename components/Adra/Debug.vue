<template>
  <div v-if="$config.public.ADRA_DEBUG">
    <slot />
  </div>
</template>