<template>
  <ButtonPrimary
    class="flex-grow-1"
    large
    elevation="2"
    @click="$emit('click')"
  >
    <span class="white--text text-h6 font-weight-medium"
      ><slot>
        {{ content.submit_text || $t('components.button_donate.donate') }}
      </slot></span
    >
  </ButtonPrimary>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ButtonDonate',
  computed: {
    ...mapGetters('pages', ['content']),
  },
}
</script>
