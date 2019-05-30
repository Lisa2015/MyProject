import regeneratorRuntime from '../../utils/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:['全部订单','有效订单','待支付订单','已完成'],
    currentTab:0,
    orderImages:['../../asset/img/004.jpg'],
  },
  //切换tab
  switchTab: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  // 前往订单详情
  goDetails() {
    wx.navigateTo({
      url:'/pages/orderDetails/orderDetails'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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