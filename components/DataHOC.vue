<template>
  <v-row>
    <v-col cols="12">
      <slot
        name="header"
        :search="search"
        :attrs="headerAttrs"
        :on="headerEvents"
      >
        <DataToolbar
          v-if="!hideHeader"
          v-bind="headerAttrs"
          v-on="headerEvents"
          >{{ btnText }}</DataToolbar
        >
      </slot>
    </v-col>
    <v-col>
      <slot
        v-if="json"
        :json="json"
        :filtered-items="filteredItems"
        :refresh="$fetch"
        :search="search"
        :update-item-from-list="updateItemFromList"
        :delete-item-from-list="deleteItemFromList"
        :add-item-to-list="addItemToList"
      />
      <slot v-else name="loader">
        <v-skeleton-loader class="mx-auto" type="table" />
      </slot>

      <v-row v-if="!hideFooter" class="pb-4">
        <v-col>
          <v-row class="mt-2 mx-6" align="center" justify="center">
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template #activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ perPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in [1, 5, 10, 15, 30]"
                  :key="index"
                  @click="perPage = number"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <span class="grey--text"
              >Total <span class="primary--text">{{ total }}</span></span
            >
            <v-spacer></v-spacer>

            <span class="mr-4 grey--text">
              Page {{ currentPage }} of {{ totalPage }}
            </span>
            <v-btn
              fab
              x-small
              color="primary"
              class="mr-1"
              :disabled="currentPage < 2"
              @click="currentPage--"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              x-small
              color="primary"
              class="ml-1"
              :disabled="currentPage === totalPage"
              @click="currentPage++"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DataHOC',
  props: {
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
  },
  data() {
    return {
      searchText: null,
      json: null,
      baseUrl: null,
      currentPage: 1,
      perPage: null,
      total: null,
      totalPage: null,
      filters: [],
    }
  },

  async fetch() {
    try {
      this.json = null
      let response
      if (this.baseUrl) {
        response = await this.$axios(this.completeURL)
      } else if (this.dataSource instanceof Promise) {
        response = await this.dataSource
      } else {
        response = await this.$axios(this.dataSource)
      }
      this.json = response.data
      const { meta } = response.data
      this.currentPage = meta.current_page
      this.total = meta.total
      this.totalPage = meta.last_page
      this.perPage = meta.per_page

      this.baseUrl = response.request.responseURL
    } catch (error) {
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> error', error)
    }
  },
  computed: {
    headerEvents() {
      return {
        click: () => this.$emit('btn:click'),
        'btn:click': () => this.$emit('btn:click'),
      }
    },
    headerAttrs() {
      return {
        'hide-button': this.hideButton,
        search: this.search,
      }
    },
    filteredItems() {
      return this.json.data ? this.filterItems(this.json.data) : []
    },
    completeURL() {
      if (!this.baseUrl) {
        return ''
      }
      const currentUrl = new URL(this.baseUrl)
      currentUrl.searchParams.set(
        `filter[${this.searchField}]`,
        this.searchText
      )
      currentUrl.searchParams.set('page[number]', this.currentPage)
      if (this.perPage) {
        currentUrl.searchParams.set('page[size]', this.perPage)
      }
      return currentUrl.href
    },
  },
  watch: {
    async completeURL() {
      await this.$fetch()
    },
    async refresh() {
      await this.$fetch()
    },
  },
  methods: {
    findIndex(item, attribute = 'attributes.id') {
      return this.json.data.findIndex((jsonItem) => {
        return jsonItem[attribute] === item[attribute]
      })
    },
    addItemToList(item) {
      this.json.data = [...this.json.data, item]
    },
    updateItemFromList(item) {
      this.$set(this.json.data, this.findIndex(item), item)
    },
    deleteItemFromList(item) {
      const test = [...this.json.data]
      const target = test.findIndex((jsonItem) => {
        return jsonItem['attributes.id'] === item['attributes.id']
      })
      test.splice(target, 1)
      this.json.data = test
      // this.json.data.splice(this.findIndex(item), 1)
      // this.$set(this.json.data, targetIndex, item)
    },
    search(field, value) {
      this.searchField = field
      if (!value) {
        this.searchText = ''
      }
      if (value?.length > 2 || value?.length === 0) {
        this.searchText = value
      }
    },
  },
}
</script>
