import regeneratorRuntime from '../../utils/runtime.js'
import Api from '../../api/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    tabs:['全部车型','明星奢享','经典热门','高性价比'],
    imageArray:['../../asset/img/001.jpg','../../asset/img/002.jpg','../../asset/img/003.jpg' ],
      recommandImages:['../../asset/img/005.jpg','../../asset/img/004.jpg','../../asset/img/003.jpg','../../asset/img/003.jpg','../../asset/img/003.jpg' ],
  },
    //切换tab
    switchTab: function (e) {
       console.log(e)
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        })
    },
  // 获取首页轮播图
 async getBannerImgs() {
    let res = await Api.getBanner(params,data)

  },
  // 获取首页数据列表
  async getHomePageInfo() {
    let res = await Api.getHomePage(params,data)
  },
  
  // 获取推荐套餐图片
  async getRecommandImages() {

  },
  // 提交订单
  submit() {
    wx.navigateTo({
        url:'/pages/payOrder/payOrder'
    })
  },
  //查看详情
  goDetails(e) {
      wx.navigateTo({
          url:'../carDetails/carDetails'
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imageArray:this.data.imageArray,
        recommandImages:this.data.recommandImages
    })
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