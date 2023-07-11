import { AdraException } from '.'

export default class DomainNotFound extends AdraException {
  constructor(code, message) {
    super(message)
    this.code = code
    this.name = 'DomainNotFound'
  }
}
