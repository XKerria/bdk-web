import crypto from 'crypto-js'
import { Base64 } from 'js-base64'
import axios from '@/utils/axios'
import { md5 } from '@/utils/encoding'
import { oss } from '@/config'

const { region, bucket } = oss

class Cloud {
  async getToken() {
    const res = await axios.get('/api/client/sts')
    const token = res.data
    return token
  }

  getUrl() {
    return `https://${bucket}.${region}.aliyuncs.com`
  }

  sign(secret, canonical) {
    return crypto.enc.Base64.stringify(crypto.HmacSHA1(canonical, secret))
  }

  getFormData(token) {
    const date = new Date()
    date.setHours(date.getHours() + 1)
    const policy = Base64.encode(
      JSON.stringify({
        expiration: date.toISOString(),
        conditions: [['content-length-range', 0, 1024 * 1024 * 1024]]
      })
    )
    const signature = this.sign(token.Credentials.AccessKeySecret, policy)
    const formData = {
      policy,
      signature,
      OSSAccessKeyId: token.Credentials.AccessKeyId,
      'x-oss-security-token': token.Credentials.SecurityToken
    }
    return formData
  }

  async upload(path, prefix = '') {
    const name = await md5(path)
    const key = `${prefix}${name}`
    const token = await this.getToken()
    const formData = this.getFormData(token)
    const url = this.getUrl()

    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url,
        filePath: path,
        name: 'file',
        formData: { ...formData, key },
        success: (res) => {
          if (res.statusCode === 204) {
            resolve(`${url}/${key}`)
          } else {
            reject(res)
          }
        },
        fail: (e) => {
          reject(e)
        }
      })
    })
  }
}

export default new Cloud()
