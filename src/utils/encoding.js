import SparkMD5 from 'spark-md5'

export const md5 = (path) => {
  return new Promise((resolve, reject) => {
    uni.getFileSystemManager().readFile({
      filePath: path,
      success(res) {
        let spark = new SparkMD5.ArrayBuffer()
        spark.append(res.data)
        let md5 = spark.end(false)
        resolve(md5)
      },
      fail(e) {
        reject(e)
      }
    })
  })
}
