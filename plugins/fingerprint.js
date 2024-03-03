import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

export default defineNuxtPlugin(({ $config, $unleash }) => {
  if ($unleash.isEnabled('dpr.load.fingerprintjs')) {
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
