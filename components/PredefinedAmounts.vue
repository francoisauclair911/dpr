<template>
  <v-row justify="center">
    <v-col v-for="(predefinedAmount, index) in pagesStore.content.predefined_amounts" :key="index" cols="6">
      <v-hover v-slot="{ hover }">
        <ButtonBase block large style="transition: all 0.2s ease-in-out"
          :color="clickedAmount === index || hover ? '#C09337' : 'primary'" elevation="2" @click="selectAmount(index)">
          <span class="text-white text-h6 font-weight-medium" v-text="predefinedAmount.label" />
        </ButtonBase>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script setup>
const pagesStore = usePagesStore()
const paymentStore = usePaymentStore()

const clickedAmount = ref(null)

function selectAmount(index) {
  clickedAmount.value = index
  paymentStore.updateAmount(pagesStore.content.predefined_amounts[index].value)
}

</script>