<template>
  <ButtonPrimary
    class="flex-grow-1"
    large
    elevation="2"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <slot name="icon" />
    <span class="white--text text-h6 font-weight-medium"
      ><slot>
        {{ $t('components.button_donate.donate') }}
      </slot></span
    >
  </ButtonPrimary>
</template>
<script>
export default {
  name: 'ButtonDonate',
}
</script>
