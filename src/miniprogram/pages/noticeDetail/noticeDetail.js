// pages/noticeDetail/noticeDetail.js

const DB = wx.cloud.database().collection("userStar") // 初始化云开发数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    date: '',
    tutor: '',
    article: '',
    image:[],
    tab: null,
    like: false,  
    count: 0,         // like函数执行的次数,关键逻辑
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取前面的页面传递来的参数
    console.log(options)
    var title = options.title
    var date = options.date
    var tutor = options.tutor
    var article = decodeURIComponent(options.article)
    var image = options.image
    // 待决
    if(image.length !== 0){
      var image = options.image.split(',')
      console.log(image)
    }
    var tab = options.tab
    var like = options.like
    var id = options.id
    like = JSON.parse(like)
    console.log(like)
    this.setData({
      title: title,
      date: date,
      tutor: tutor,
      article: article,
      image: image,
      tab: tab,
      like: like,
      id: id
    })
  },
  
  like: function(e) {
    var count = this.data.count + 1
    var like = this.data.like
    if(like) this.setData({ like: false })
    else this.setData({ like: true })
    console.log(this.data.like)
    this.setData({ count: count})
  },

  onUnload: function() {
    var id = this.data.id
    var like = this.data.like
    var image = this.data.image
    var imageStr = ""
    for(let i = 0; i < image.length; i++){
      if(i == image.length - 1){
        imageStr += image[i]
      }else{
        imageStr += image[i] + ',';
      }
      
    }
    if(this.data.count % 2 === 1){
      if(like){
        DB.add({
          data:{
            title: this.data.title,
            date: this.data.date,
            article: this.data.article,
            image: this.data.image,
          },
          success(res){
            console.log("云数据库添加成功",res)
          },
          fail(res){
            console.log("云数据库添加失败",res)
          }
        })
      } else{
        console.log(id)
        DB.doc(id).remove({
          success(res){
            console.log("云数据库删除成功",res)
          },
        })
      }
    }
  }
})