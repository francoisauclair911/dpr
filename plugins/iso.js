import ISO6391 from 'iso-639-1'

export default function ({ $config }, inject) {
  inject('iso', ISO6391)
}
