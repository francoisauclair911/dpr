export default class AdraException extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
  }
}
