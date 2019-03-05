// pages/search/search.js

const app = getApp()
Page({

  /**
* 页面的初始数据
*/

  data: {
    id:null,
    centent_Show: true,
    content_error:true,
    searchValue: '',
    results:''
  },

  searchInput: function (e) {
    let value = e.detail.value;
    
    this.setData({
      searchValue:value
    })
    
  },
  
  search:function(e){
    let that = this
    // console.log(that.data.searchValue)
    wx.navigateTo({
      url: '../search/search',
    })
    let reg = /^[A-Z\s]{2,20}$/
    
    wx.cloud.callFunction({
      name:'search',
      data: {
        content: that.data.searchValue
      },
      success: function (res) {
        if (that.data.searchValue == '') {
          wx.showToast({
            title: '输入框不能为空/(ㄒoㄒ)/~~',
            icon: 'none',
            duration: 2000
          })
        }
        else if (!reg.test(that.data.searchValue)){
          wx.showToast({
            title: '输入格式不对！名称请使用大写英文',
            icon: 'none',
            duration: 3000
          })
        }
        else if (res.result.data == ''||!res.result.data==that.data.searchValue) {
          wx.redirectTo({
            url: '../search/search'
          })
          wx.showToast({
            title: '很抱歉,没有找到您要搜索的资料/(ㄒoㄒ)/~~',
            icon:'none',
            duration:5000
          })
          
        }else{
          
          that.setData({
            
            contents: res.result.data
          });
          console.log(res.result.data)
        }
        
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

  valueInput:function(e){
    this.setData({
      id:e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad search');
    
  }

})