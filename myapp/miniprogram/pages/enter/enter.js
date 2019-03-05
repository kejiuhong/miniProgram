//index.js
const app = getApp()

Page({
  /**
* 生命周期函数--监听页面加载
*/
  onLoad: function (options) {
    console.log("==onLoad==");
  },
  data: {
    product: '',
    SN: '',
    customer: '',
    date: '',
    problem: '',
    items: [
      { name: 'change', value: '更换' },
      { name: 'repair', value: '维修', checked: 'true' },

    ],
    directorItems: [
      { name: 'Archie', value: 'Archie' },
      { name: 'Lynn', value: 'Lynn' },
      { name: 'ZhongXiao', value: 'Zhongxiao' },
      { name: 'Ken', value: ' Ken' },
      { name: 'Kelly', value: 'Kelly', checked: 'true' }

    ],
    freeItems: [
      { name: 'free', value: '是', checked: 'true' },
      { name: 'pay', value: '否' },

    ]
  },
    formSubmit(e) {
      let that = this
      let object = e.detail.value
      let reg = /^[A-Z\s]{2,20}$/
      let enter=new Date()
      let enterD = enter.toDateString()
      // let y=date.getFullYear()
      // let m=date.getMonth()+1
      // let m = m < 10 ? ('0' + m) : m;
      // let d=date.getDate()
      // let d = d < 10 ? ('0' + d) : d;
      // let enterDate=y+'/'+m+'/'+'d'
      console.log(enterD)
      if(!reg.test(object.customer)) {
        wx.showToast({
          title: '客户名称请使用大写英文',
          icon:'none',
          duration:3000
        })
      }else{
      wx.cloud.callFunction({
           name:'test',     
            data: {
              product: object.product,
              SN: object.SN,
              customer: object.customer,
              date: object.date,
              problem: object.problem,
              changeM: object.changeM,
              director: object.director,
              price: object.price,
              enterDate:enterD,
            },
            success: res => {
              
              console.log(res)
              
              wx.showToast({
                title: '登记成功！',
              })
              wx.redirectTo({
                url: '../enter/enter'
              })
              that.onLoad()
              
            },
            fail: res => {
              wx.showToast({
                title: '登记失败',
              })
              // wx.navigateTo({
              //   url: '../deployFunctions/deployFunctions',
              // })
              console.log(res)
            }
      
        })  
      }     
    },


    

    // formSubmit(e) {
    //   console.log('form发生了submit事件，携带数据为：', e.detail.value)

    // },
    formReset() {
        console.log('form发生了reset事件')
    }
})