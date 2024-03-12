export default defineNuxtPlugin((nuxtApp) => {
    const notificationsStore = useNotificationsStore()
    const helpersStore = useHelpersStore()

    helpersStore.getCountries()
    helpersStore.getTitles()

    return {
        provide: {
            clone: (item) => JSON.parse(JSON.stringify(item)),
            success: (text) => notificationsStore.success(text),
            error: (text) => notificationsStore.danger(text)
        }
    }
});