import BaseModel from './BaseModel'

export default class User extends BaseModel {
  static entity = 'users'

  static fields() {
    return {
      id: this.attr(null),
      phone: this.attr(null),
      name: this.attr(null)
    }
  }

  static current() {
    return this.api().get('/auth/user')
  }
}
