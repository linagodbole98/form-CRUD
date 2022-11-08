const aws = require("aws-sdk")
const dotenv = require("dotenv")
dotenv.config();

//--------------------------------AWS Configuration-------------------------------------

aws.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
})

//--------------------------------AWS file upload--------------------------

const uploadFile = async function (file, name) {
  return new Promise(function (resolve, reject) {
    // Create S3 service object
    const s3 = new aws.S3({ apiVersion: "2006-03-01" })
    const uploadParams = {
      ACL: "public-read",
      Bucket: "classroom-training-bucket",
      Key: name + "/" + file.originalname,
      Body: file.buffer,
    }
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err })
      }

      return resolve(data.Location)
    })
  })
}

module.exports = uploadFile