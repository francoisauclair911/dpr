const handleError = (error, store, nuxtErrorThrower = null) => {
  if (error.response) {
    const code = parseInt(error.response && error.response.status)
    if (code === 422) {
      // store.dispatch(
      //   'notifications/danger',
      //   'Some fields require your attention'
      // )
      store.dispatch('validation/handleValidation', error.response.data)
    }
  } else {
    return store.dispatch(
      'notifications/danger',
      'Could not contact the server, please try again later'
    )
  }
}
const handleRequest = (config, store) => {}
export { handleError, handleRequest }
