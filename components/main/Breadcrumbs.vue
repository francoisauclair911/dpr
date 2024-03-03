<template>
  <v-breadcrumbs class="pl-0" :items="crumbs" large>
    <template #divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
    <template #item="{ item }">
      <v-btn v-if="item.icon" nuxt exact :to="item.path" icon>
        <v-icon color="blue-grey darken-4">{{ item.icon }}</v-icon>
      </v-btn>
      <v-breadcrumbs-item
        v-else
        class="text-capitalize"
        nuxt
        exact
        exact-active-class="grey--text"
        :to="item.path"
      >
        {{ item.title }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'AdraBreadcrumbs',
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
      const crumbs = [{ title: 'Home', path: '/', icon: 'mdi-home' }]
      let path = ''
      params.forEach((param, index) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)
        if (match.name !== null) {
          crumbs.push({
            title: param,
            ...match,
          })
        }
      })
      return crumbs
    },
  },
}
</script>
