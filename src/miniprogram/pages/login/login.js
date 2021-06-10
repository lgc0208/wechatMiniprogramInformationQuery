// miniprogram/pages/login/login.js
const sm3 = require('miniprogram-sm-crypto').sm3;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    flag: false,
    unameNULL: false,
    pwdVaild: true,
    unameSpace: -1,
    pwdSpace: -1
  },

  username: function(e) {
    this.setData({ username: e.detail.value })
  },
  password: function (e) {
    this.setData({ password: e.detail.value })
  },
  login: function (e) {
    var that = this
    let password =  e.detail.value.password
    let username =  e.detail.value.username
    var unameNULL = (username.length === 0) ? true : false   // 判断用户名是否为空
    var pwdVaild = (password.length < 6) ? false : true      // 判断密码是否大于6位
    var unameSpace = username.lastIndexOf(' ')               // 判断用户名中有没有空格,值为-1时没有
    var pwdSpace = password.lastIndexOf(' ')                 // 判断密码中有没有空格,值为-1时没有
    console.log(pwdVaild,unameNULL)
    console.log(sm3('nihao'))
    // 用户名不为空以及密码大于6位且其中都没有空格时，才传递登录表单
    if(!unameNULL && pwdVaild && unameSpace === -1 && pwdSpace === -1){
      password = sm3(password)  // 上传前，先基于国密算法sm3将密码加密
      console.log(password)
      wx.request({
        url: 'http://localhost:8080/userServer/userServlet', //后端的url地址  
        // 传给后端的数据 —— 用户名与加密后的密码
        data: {
          username: username,
          password: password,
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        // res为从后端获取的数据
        success: function (res) {
          console.log(res)
          console.log(res.statusCode === 200);
          // 只要后端返回的状态码以2开头，即请求成功的情况
          if (res.statusCode === 200) {
            // 登录成功，将跳转至首页
            if(res.data === 'success') {
              wx.showToast({
                title: '登录成功！',
                duration: 1000
              })
              wx.switchTab({
                url: '../index/index',
              })
            } 
            // 这个是登录失败的处理，界面将显示提示字段,告知用户是哪个部分出错
            else that.setData({ flag: true })
          }
          else {
            wx.showToast({
              title: '服务器异常',
            })
          }
        },
        fail: function (err) {
          wx.showToast({
            title: '网络异常！',
          })
          console.log("失败！！！！！！");
        }
      })
    } 
    // 设置标志位，不管什么时候都进行
    this.setData({
      unameNULL: unameNULL,
      pwdVaild: pwdVaild,
      unameSpace: unameSpace,
      pwdSpace: pwdSpace
    })
  },
})