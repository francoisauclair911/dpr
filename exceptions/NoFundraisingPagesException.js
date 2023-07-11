import { AdraException } from '.'

export default class NoFundraisingPagesException extends AdraException {
  constructor(code, message) {
    super(message)
    this.code = code
    this.name = 'NoFundraisingPagesException'
  }
}
