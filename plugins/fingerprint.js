import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

export default function ({ $config, $unleash }, inject) {
  if ($unleash.isEnabled('dpr.load.fingerprintjs')) {
    const fpPromise = FingerprintJS.load({
      token: $config.FINGERPRINT_JS_PK,
    })

    inject('fingerprint', fpPromise)
  }
}
