import BaseModel from './BaseModel'

export default class Setting extends BaseModel {
  static entity = 'settings'

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(null),
      value: this.attr(null)
    }
  }
}
