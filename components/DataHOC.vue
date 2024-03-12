<template>
  <v-row>
    <v-col cols="12">
      <slot name="header" :search="search" :attrs="headerAttrs" :on="headerEvents">
        <DataToolbar v-if="!hideHeader" v-bind="headerAttrs" v-on="headerEvents">{{ btnText }}</DataToolbar>
      </slot>
    </v-col>
    <v-col>
      <slot v-if="json" :json="json" :filtered-items="filteredItems" :refresh="$fetch" :search="search"
        :update-item-from-list="updateItemFromList" :delete-item-from-list="deleteItemFromList"
        :add-item-to-list="addItemToList" />
      <slot v-else name="loader">
        <v-skeleton-loader class="mx-auto" type="table" />
      </slot>

      <v-row v-if="!hideFooter" class="pb-4">
        <v-col>
          <v-row class="mt-2 mx-6" align="center" justify="center">
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template #activator="{ on, attrs }">
                <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
                  {{ perPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(number, index) in [1, 5, 10, 15, 30]" :key="index" @click="perPage = number">
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <span class="grey--text">Total <span class="primary--text">{{ total }}</span></span>
            <v-spacer></v-spacer>

            <span class="mr-4 grey--text">
              Page {{ currentPage }} of {{ totalPage }}
            </span>
            <v-btn fab x-small color="primary" class="mr-1" :disabled="currentPage < 2" @click="currentPage--">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab x-small color="primary" class="ml-1" :disabled="currentPage === totalPage"
              @click="currentPage++">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>

const props = defineProps({
  filterItems: {
    type: Function,
    default: (items) => items,
  },
  dataSource: {
    type: [Promise, String],
    required: true,
  },
  refresh: {
    type: Boolean,
    required: false,
  },
  url: {
    type: String,
    default: '',
  },
  hideFooter: {
    type: Boolean,
    default: false,
  },
  hideHeader: {
    type: Boolean,
    default: false,
  },
  hideButton: {
    type: Boolean,
    default: false,
  },
  btnText: {
    type: String,
    default: 'create',
  },
})

const emit = defineEmits(['btn:click'])

const searchText = ref(null)
const json = ref(null)
const baseUrl = ref(null)
const currentPage = ref(1)
const perPage = ref(null)
const total = ref(null)
const totalPage = ref(null)
const filters = ref([])
const searchField = ref('')

const router = useRouter()

const fetch = async () => {
  try {
    json.value = null

    let response
    if (baseUrl.value) {
      response = await $fetch(completeURL.value)
    } else if (props.dataSource instanceof Promise) {
      response = await props.dataSource
    } else {
      response = await $fetch(props.dataSource)
    }

    json.value = response.data

    const { meta } = response.data
    currentPage.value = meta.current_page
    total.value = meta.total
    totalPage.value = meta.last_page
    perPage.value = meta.per_page
    baseUrl.value = response.request.responseURL
  } catch (error) {
    console.log('\x1b[32;1m%s\x1b[0m ', '=> error', error)
  }
}

const headerEvents = computed(() => ({
  click: () => emit('btn:click'),
  'btn:click': () => emit('btn:click'),
}))

const headerAttrs = computed(() => ({
  'hide-button': props.hideButton,
  search: search,
}))

const filteredItems = computed(() => {
  return json.value?.data ? props.filterItems(json.value.data) : []
})

const completeURL = computed(() => {
  if (!baseUrl.value) {
    return ''
  }

  const currentUrl = new URL(baseUrl.value)
  currentUrl.searchParams.set(`filter[${searchField.value}]`, searchText.value)
  currentUrl.searchParams.set('page[number]', currentPage.value)

  if (perPage.value) {
    currentUrl.searchParams.set('page[size]', perPage.value)
  }

  return currentUrl.href
})

watch(completeURL, fetch)
watch(() => props.refresh, fetch)

const findIndex = (item, attribute = 'attributes.id') => {
  return json.value?.data.findIndex((jsonItem) => {
    return jsonItem[attribute] === item[attribute]
  })
}

const addItemToList = (item) => {
  json.value.data = [...(json.value.data || []), item]
}

const updateItemFromList = (item) => {
  const index = findIndex(item)
  if (index !== -1) {
    json.value.data.splice(index, 1, item)
  }
}

const deleteItemFromList = (item) => {
  const index = findIndex(item)
  if (index !== -1) {
    json.value.data.splice(index, 1)
  }
}

const search = (field, value) => {
  searchField.value = field
  if (!value) {
    searchText.value = ''
  }

  if (value?.length > 2 || value?.length === 0) {
    searchText.value = value
  }
}

fetch()

</script>
