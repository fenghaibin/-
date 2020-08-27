// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
exports.main = async (event, context) => {
  return await db.collection('flower').add({data:event});
}