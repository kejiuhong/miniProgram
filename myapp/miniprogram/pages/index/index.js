//index.js
const app = getApp()

Page({
  data: {
    // avatarUrl: './user-unlogin.png',
    // // userInfo: {},
    // logged: false,
    // takeSession: false,
    // requestResult: '',
    iphoneNum:''
    
  },


  iphone: function (e) {
    let num = +e.detail.value
    
    // console.log(num)
    
    this.setData({
      iphoneNum: num
    })
    
   
  },

  clickNum:function(e){
    let that =this
      
      // console.log(that.data.iphoneNum)
    let reg = /^1[34578]\d{9}$/

    wx.cloud.callFunction({
      
      name:'sign',
      
      data: {
        iphone: that.data.iphoneNum
      },

      success:function(res){
        
        if (that.data.iphoneNum == '') {

          wx.showToast({
            title: '输入框不能为空/(ㄒoㄒ)/~~',
            icon: 'none',
            duration: 2000
          })

        } else if (!reg.test(that.data.iphoneNum)){

          // console.log(that.data.iphoneNum)

          wx.showModal({
            title: '',
            content: '输入手机号有误，请重新填写！/(ㄒoㄒ)/~~',
            icon:'none',
            duration:2000
          })

        }else{
          let resultNum = res.result.data
          let resultN = resultNum[0].IPHONE
          console.log(resultNum)

          let endNum=''
          for (let b in resultN){

            console.log('循环', resultN[b])

            if (that.data.iphoneNum == resultN[b]) {
              endNum=resultN
               
              console.log('ok')
              wx.switchTab({
                url: '../enter/enter',
              })
              return;

            }
          }
          if(endNum===''){
            wx.showModal({
              title: '',
              content: '非常抱歉！您没有访问权限！/(ㄒoㄒ)/~~',
              duration: 2000
            })
          }
          
        }
        // console.log(res.result.data)
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
        console.log(e)
      }
        
      
    })
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
  }
})
    

  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             this.setData({
  //               avatarUrl: res.userInfo.avatarUrl,
  //               userInfo: res.userInfo
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })
  // },

  // onGetUserInfo: function(e) {
  //   if (!this.logged && e.detail.userInfo) {
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo
  //     })
  //   }
  // },

  // onGetOpenid: function() {
  //   // 调用云函数
  //   wx.cloud.callFunction({
  //     name: 'login',
  //     data: {},
  //     success: res => {
  //       console.log('[云函数] [login] user openid: ', res.result.openid)
  //       app.globalData.openid = res.result.openid
  //       wx.navigateTo({
  //         url: '../userConsole/userConsole',
  //       })
  //     },
  //     fail: err => {
  //       console.error('[云函数] [login] 调用失败', err)
  //       wx.navigateTo({
  //         url: '../deployFunctions/deployFunctions',
  //       })
  //     }
  //   })
  // },

  // // 上传图片
  // doUpload: function () {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {

  //       wx.showLoading({
  //         title: '上传中',
  //       })

  //       const filePath = res.tempFilePaths[0]
        
  //       // 上传图片
  //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：', res)

  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath
            
  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })

  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // },

// })
