import { defineStore } from "pinia"

export const useNotificationsStore = defineStore('notifications', {

  state: () => ({
    text: '',
    color: '',
    timeout: '',
  }),
  actions: {
    show(payload) {
      this.showNotification(payload)
    },
    info(text) {
      this.showNotification({
        text,
        color: 'secondary',
      })
    },
    success(text) {
      this.showNotification({
        text,
        color: 'primary',
      })
    },
    danger(text) {
      this.showNotification({
        text,
        color: 'red',
      })
    },
    showNotification(payload) {
      this.text = payload.text
      this.color = payload.color
      this.timeout = payload.timeout
    },
  },
});