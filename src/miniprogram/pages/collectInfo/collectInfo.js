// pages/collectInfo/collectInfo.js
const app = getApp()
const DB = wx.cloud.database().collection("userStar") // 初始化云开发数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.request()
  },

  getDetail: function(e){
    console.log(e)
    var index = parseInt(e.currentTarget.id)
    var tab = this.data.nowTab
    var info = this.data.collectionList[index]
    var title = info.title
    var date = info.date
    var article = encodeURIComponent(info.article)
    var image = info.image
    var like = true                           // 本部分的like肯定是true
    var id = ''
    var collectList = this.data.collectionList
    for(var i = 0;i < collectList.length; i++){
      if(title === collectList[i].title){
        id = collectList[i]._id
      }
    }
    if(tab === '学术讲座') 
      tutor = info.tutor
    wx.navigateTo({
      url: '../noticeDetail/noticeDetail?title=' + title + '&date=' + date + '&id=' + id + 
      '&article=' + article + '&tab=' + tab + '&image=' + image + '&like=' + like,
      success(res){
        console.log(res)
      },
      fail(err){
        console.log(err)
      }
    })
  },
  request: function(){
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
  onPullDownRefresh: function () {
    this.request()
  },

  onShow: function () {

    this.onLoad()
    
    },
})