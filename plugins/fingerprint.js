import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

export default defineNuxtPlugin(({ $config }) => {

  const dprLoadFingerprint = useFlag('dpr.load.fingerprintjs')

  if (dprLoadFingerprint.value) {
    const fpPromise = FingerprintJS.load({
      token: $config.public.FINGERPRINT_JS_PK,
    })

    return {
      provide: {
        fingerprint: fpPromise,
      }
    }

  }
})
