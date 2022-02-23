<template>
  <div name="snackbars">
    <v-snackbar
      v-model="show"
      :color="color"
      :right="options.right"
      :bottom="true"
      app
    >
      {{ text }}
      <template #action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="show = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'SnackbarNotification',
  data() {
    return {
      show: false,
      color: '',
      text: '',
      timeout: -1,
    }
  },
  computed: {
    options() {
      return {
        right: this.$vuetify.breakpoint.name !== 'xs',
      }
    },
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'notifications/SHOW_NOTIFICATION') {
        this.text = state.notifications.text
        this.color = state.notifications.color || 'primary'
        this.timeout = state.notifications.timeout || 1000
        this.show = true
      }
    })
  },
}
</script>
