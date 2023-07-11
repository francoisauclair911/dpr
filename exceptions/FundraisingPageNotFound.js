import { AdraException } from '.'

export default class FundraisingPageNotFound extends AdraException {
  constructor(code, message) {
    super(message)
    this.code = code
    this.name = 'FundraisingPageNotFound'
  }
}
