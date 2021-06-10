// miniprogram/pages/index/index.js
const app = getApp()
const DB = wx.cloud.database().collection("userStar") // 初始化云开发数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    needToKnow: '',
    searchList: null, // 搜索部分使用的列表
    //noticeList: null, // 校内通知列表
    noticeList: [
      { title: '欢迎报考北京邮电大学', 
        date:'2021-5-12', 
        article:'第一条  为了规范本科生招生工作，保证本科生招生工作正常顺利进行，依据《中华人民共和国教育法》、《中华人民共和国高等教育法》和教育部有关规定，结合学校实际情况，制定本章程。' 
      }
    ],
    newList: [], // 校内新闻列表
    signiList: [],  // 公示公告列表
    academicList: [
    ], // 学术讲座列表
    nowTab: '校内通知',  // 当前的Tab
    Isfoucs: false,
    IsInput: false,
    colloctList: [],
    showHalfscreen: true,
    buttons: [
      {
          type: 'default',
          className: '',
          text: '不同意',
          value: 0
      },
      {
          type: 'primary',
          className: '',
          text: '同意',
          value: 1
      }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.request()
  },

  /**
   * 当页面初始化以及用户下拉刷新时调用这个函数启用请求
   */
  request: function(){
    var that = this
    // 获取校内通知
    wx.request({
      //url: 'http://' + app.globalData.backend_server + '/noticeList',
      url: 'http://localhost:8080/articleServer/notificationServlet',
      success(res){
        console.log(res)
        if(res.statusCode.toString()[0] === '2'){
          that.setData({
            noticeList: res.data
          })
        } else {
          wx.showToast({
            title: '服务器异常',
            duration: 2000
          })
        }
      },
      fail(err){
        console.log(err)
        wx.showToast({
          titie: '网络异常',
          duration: 2000
        })
      }
    })
    // 获取校内新闻
    wx.request({
      //url: 'http://' + app.globalData.backend_server + '/noticeList',
      url: 'http://localhost:8080/articleServer/newsServlet',
      success(res){
        console.log(res)
        if(res.statusCode.toString()[0] === '2'){
          that.setData({
            newList: res.data
          })
        } else {
          wx.showToast({
            title: '服务器异常',
            duration: 2000
          })
        }
      },
      fail(err){
        console.log(err)
        wx.showToast({
          titie: '网络异常',
          duration: 2000
        })
      }
    })
    wx.request({
      //url: 'http://' + app.globalData.backend_server + '/noticeList',
      url: 'http://localhost:8080/articleServer/announcementServlet',
      success(res){
        console.log(res)
        if(res.statusCode.toString()[0] === '2'){
          that.setData({
            signiList: res.data
          })
        } else {
          wx.showToast({
            title: '服务器异常',
            duration: 2000
          })
        }
      },
      fail(err){
        console.log(err)
        wx.showToast({
          titie: '网络异常',
          duration: 2000
        })
      }
    })
    wx.request({
      //url: 'http://' + app.globalData.backend_server + '/noticeList',
      url: 'http://localhost:8080/articleServer/lectureServlet',
      success(res){
        console.log(res)
        if(res.statusCode.toString()[0] === '2'){
          that.setData({
            academicList: res.data
          })
        } else {
          wx.showToast({
            title: '服务器异常',
            duration: 2000
          })
        }
      },
      fail(err){
        console.log(err)
        wx.showToast({
          titie: '网络异常',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var globalData = app.globalData
    // 登录成功后，获取用户openid，可不获取
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        var that = this
        DB.get({
          _openid: app.globalData.openid,
          success(res){
            that.setData({
              collectionList: res.data
            })
            console.log(that.data.collectionList)
          },
          fail(err){
            console.log(err)
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    DB.get({
      success(res){
        console.log(res.data)
        that.setData({
          colloctList: res.data
        })
      },
      fail(err){
        console.log(err)
      }
    })
  },
  // 跳转到信息详情
  getDetail: function(e){
    console.log(e)
   
    var index = parseInt(e.currentTarget.id)
   
    // 初步分部已完成，后期可能还需要升级
    if(this.data.searchList == null){
    console.log(this.data.nowTab)
    var tab = this.data.nowTab
    var info = null
    switch(tab){
      case '校内通知':
        info = this.data.noticeList[index]
        break;
      case '校内新闻':
        info = this.data.newList[index]
        break;
      case '公示公告':
        info = this.data.signiList[index]
        break;
      case '学术讲座':
        info = this.data.academicList[index]
        break;
      default:
        wx.showToast({
          title: '异常！',
        })
    }}
    else{
      info = this.data.searchList[index]
    }
    var title = info.title
    var date = info.date
    var image = info.image
    var article = encodeURIComponent(info.article)
    var tutor = ''
    var like = false
    if(tab === '学术讲座') 
      tutor = info.tutor
    console.log(article)
    var id = ''
    var collectList = this.data.colloctList
    for(var i = 0;i < collectList.length; i++){
      if(title === collectList[i].title){
        like = true
        id = collectList[i]._id
      }
    }
    wx.navigateTo({
      url: '../noticeDetail/noticeDetail?title=' + title + '&title=' + title + '&date=' + date 
       + '&article=' + article + '&tab=' + tab + '&like=' + like + '&id=' + id + '&image=' + image,
    })
  },

  changeType: function(e){
    console.log(e)
    this.setData({
      nowTab: e.detail.title
    })
    console.log(this.data.nowTab)
  },

  onSearch: function(e){
    // 这部分先前端实现，已实现
    console.log(e)
    this.setData({
      searchList: null
    })
    var target = e.detail
    var list = this.data.noticeList
    var searchList = []
    for( var i = 0; i < list.length; i++) {
      // 如果匹配成功,将数据添加进搜索展示数组
      if(list[i].title.toLowerCase().indexOf(target.toLowerCase()) !== -1){
        searchList.push(list[i])
      }
    }
    for( var i = 0; i < this.data.newList.length; i++) {
      // 如果匹配成功,将数据添加进搜索展示数组
      if(this.data.newList[i].title.toLowerCase().indexOf(target.toLowerCase()) !== -1){
        searchList.push(this.data.newList[i])
      }
    }
    for( var i = 0; i < this.data.signiList.length; i++) {
      // 如果匹配成功,将数据添加进搜索展示数组
      if(this.data.signiList[i].title.toLowerCase().indexOf(target.toLowerCase()) !== -1){
        searchList.push(this.data.signiList[i])
      }
    }
    for( var i = 0; i < this.data.academicList.length; i++) {
      // 如果匹配成功,将数据添加进搜索展示数组
      if(this.data.academicList[i].title.toLowerCase().indexOf(target.toLowerCase()) !== -1){
        searchList.push(this.data.academicList[i])
      }
    }
    this.setData({
      searchList: searchList
    })
    console.log(this.data.searchList)
  },

  onCancel: function(e){
    console.log(e)
    this.setData({
      Isfoucs: false
    })
  },
  onFocus: function(e){
    console.log(e)
    this.setData({
      Isfoucs: true
    })
  },
  onBlur: function(e){
    this.setData({
      Isfoucs: false
    })
  },
  onChange: function(e){
    if(e.detail.length === 0){
      this.setData({
        IsInput: false
      })
    } else {
      this.setData({
        IsInput: true
      })
    }
  },

  getButton: function(e){
    console.log(e)
    var index = e.detail.index
    if(index === 1){
      wx.getUserProfile({
        desc: '用于完善个人信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          var data = res.userInfo
          app.globalData.nickname = data.nickName
          app.globalData.sex = (data.gender === 1) ? '男' : '女'
          app.globalData.avatar = data.avatarUrl
          this.setData({
            showHalfscreen: false
          })
        }
      })
    } else{
      // 只是取消弹框，获取匿名信息
      this.setData({
        showHalfscreen: false
      })
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
  },
})