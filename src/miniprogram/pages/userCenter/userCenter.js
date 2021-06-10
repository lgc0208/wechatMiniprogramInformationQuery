// pages/userCenter/userCenter.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    nickname: '',
    sex: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var globalData = app.globalData
   // 当全局变量获取失败时，获取用户信息 —— 性别为空说明全局变量没有存下来
   if(globalData.sex === ''){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              var sex = (res.userInfo.gender === 1) ? '男' : '女'
              this.setData({
                avatar: res.userInfo.avatarUrl,
                nickname: res.userInfo.nickName,
                sex: sex
              })
              // 同时设置用户名，头像，性别这三个全局变量
              globalData.sex = sex
              globalData.avatar = res.userInfo.avatarUrl
              globalData.nickname = res.userInfo.nickName
            }
          })
        }
      }
    })
   } 
   // 如果全局变量没有问题的话
   else {
    this.setData({
      avatar: globalData.avatar,
      nickname: globalData.nickname,
      sex: globalData.sex
    })
   }
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})