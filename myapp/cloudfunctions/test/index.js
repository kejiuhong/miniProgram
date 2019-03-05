// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('sksrepair').add({
      data:{
        PART_NO: event.product,
        S_N_NO: event.SN,
        CUSTOMER: event.customer,
        BUYING_DATE: event.date,
        PROBLEM: event.problem,
        REPAIR_EXCHANGE: event.changeM,
        IN_CHARGE_PERSON: event.director,
        PAY_FREE: event.price,
        ENTER_DATE:event.enterDate,
      }
    })
  }catch (e){
    console.log(e)
  }
}