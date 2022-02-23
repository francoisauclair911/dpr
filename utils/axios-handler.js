const handleError = (error, store) => {
  if (error.response) {
    const code = parseInt(error.response && error.response.status)
    if (code === 422) {
      store.dispatch(
        'notifications/danger',
        'Some fields require your attention'
      )
      store.dispatch('validation/handleValidation', error.response.data)
    } else if (code === 403) {
      store.dispatch('notifications/danger', 'Unauthorized')
    } else if (code === 500) {
      store.dispatch('notifications/danger', 'A server error occurred')
    } else {
      return store.dispatch(
        'notifications/danger',
        'Could not contact the server, please try again later'
      )
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
