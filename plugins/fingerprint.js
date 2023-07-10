import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

export default function ({ $config, isDev }, inject) {
  const fpPromise = FingerprintJS.load({
    token: $config.FINGERPRINT_JS_PK,
  })

  inject('fingerprint', fpPromise)
}
