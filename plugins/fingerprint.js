import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

export default function ({ $config, isDev }, inject) {
  console.log(': $config.FINGERPRINT_JS_PK', $config.FINGERPRINT_JS_PK)
  const fpPromise = FingerprintJS.load({
    token: $config.FINGERPRINT_JS_PK,
  })

  inject('fingerprint', fpPromise)
}
