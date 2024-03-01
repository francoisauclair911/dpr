import ISO6391 from 'iso-639-1'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      iso: ISO6391,
    }
  }
});