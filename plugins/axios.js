import { handleError, handleRequest } from '~/utils/axios-handler'

export default function ({ $axios, $api, redirect, store, app }) {
  // return
  $axios.onRequest((config) => handleRequest(config, store))
  $axios.onError((error) => handleError(error, store))
}
