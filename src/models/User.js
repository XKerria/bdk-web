import BaseModel from './BaseModel'

export default class User extends BaseModel {
  static entity = 'users'

  static fields() {
    return {
      id: this.attr(null),
      phone: this.attr(null),
      email: this.attr(null),
      nickname: this.attr(null),
      avatar: this.attr(null)
    }
  }

  static fetchCurrent() {
    return this.api().get('/api/site/auth/user')
  }
}
