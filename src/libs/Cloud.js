import OSS from 'ali-oss'
import axios from '@/utils/axios'
import crypto from '@/utils/crypto'

const region = import.meta.env.VITE_OSS_REGION
const bucket = import.meta.env.VITE_OSS_BUCKET

class Cloud {
  client = null

  async getClient() {
    if (this.client) return this.client
    const token = await axios.get('/sts')
    this.client = new OSS({
      region,
      bucket,
      accessKeyId: token.Credentials.AccessKeyId,
      accessKeySecret: token.Credentials.AccessKeySecret,
      stsToken: token.Credentials.SecurityToken
    })
    return this.client
  }

  getUrl(key) {
    return `https://${bucket}.${region}.aliyuncs.com/${key}`
  }

  async list(dir = '', size = 20, marker = null) {
    const client = await this.getClient()
    const result = client.listV2({ prefix: dir, 'max-keys': size, marker })
    result.objects = result.objects || []
    return result
  }

  async upload(file, prefix = '', progress = (percent, text) => {}, options = {}) {
    progress(0, '正在进行 MD5 校验')
    const md5 = await crypto.md5(file)
    const key = `${prefix}${md5}`
    const exists = await this.exists(key)

    if (exists) {
      progress(100, '文件上传完成')
      return { url: this.getUrl(key), md5, duplicated: true }
    }

    progress(0, '正在上传文件')
    let result = { name: '' }
    if (file.size > 1024 * 1024 * 1) {
      result = await this.putChunked(file, key, {
        ...options,
        progress: (p) => progress(parseInt(p * 100), '正在上传文件')
      })
    } else {
      result = await this.put(file, key)
      progress(100, '文件上传完成')
    }
    return { url: this.getUrl(result.name), md5, duplicated: false }
  }

  async put(file, path) {
    const client = await this.getClient()
    return await client.put(`${path}`, file)
  }

  async putChunked(file, key, options = {}) {
    const client = await this.getClient()
    return await client.multipartUpload(`${key}`, file, { ...options })
  }

  async delete(paths) {
    const client = await this.getClient()
    return await client.deleteMulti([...paths])
  }

  async exists(key, options = {}) {
    const client = await this.getClient()
    try {
      await client.head(key, options)
      return true
    } catch (e) {
      if (e.code === 'NoSuchKey') {
        return false
      } else {
        throw e
      }
    }
  }
}

export default new Cloud()
