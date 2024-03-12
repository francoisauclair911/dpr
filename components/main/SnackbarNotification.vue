<template>
  <div name="snackbars">
    <v-snackbar v-model="data.show" :color="data.color" location="bottom right">
      {{ data.text }}

      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="data.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>

import { useDisplay } from 'vuetify'

const display = useDisplay()
const notificationsStore = useNotificationsStore()

// const show = ref(false)

const data = reactive({
  show: false,
  color: '',
  text: '',
  timeout: -1,
})

// const options = computed(() => {
//   return {
//     right: display.xs.value,
//   }
// })

onBeforeMount(() => {
  notificationsStore.$subscribe((mutation, state) => {
    if (mutation.type == 'patch function') return
    data.text = state.text
    data.color = state.color || 'primary'
    data.timeout = state.timeout || 1000
    data.show = true
  })
})

watch(data, (newVal, oldVal) => {
  if (!newVal.show) {
    notificationsStore.$reset()
  }
})

</script>