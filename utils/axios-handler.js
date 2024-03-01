const handleError = (error) => {
  const validationStore = useValidationStore()
  const notificationsStore = useNotificationsStore()

  if (error.response) {
    const code = parseInt(error.response && error.response.status)
    if (code === 422) {
      // store.dispatch(
      //   'notifications/danger',
      //   'Some fields require your attention'
      // )
      validationStore.handleValidation(error.response.data)
    }
  } else {
    notificationsStore.danger(
      'Could not contact the server, please try again later'
    )
  }
}
const handleRequest = (config, store) => { }
export { handleError, handleRequest }
