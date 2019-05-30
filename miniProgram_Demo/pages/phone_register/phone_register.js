import regeneratorRuntime from '../../utils/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 发送验证码
  async sendCode() {
    if (!this.data.isSend) {
      if (this.data.phone == '') {
        wx.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
      } else {
        // this.setData({
        //     isSend: true
        // })
        let data = {
          mobile: this.data.phone,
          timeout: 60,
        }
        wx.showLoading({
          title: '发送中',
        })
        this.setData({
          isSend: true
        })
        // wx.setStorageSync('smsId', res.list)
        this.changeSendCodeText(60);
        wx.hideLoading()
      }
    }
  },
  // 修改发送短信验证码文字
  changeSendCodeText(time) {
    if (time > 0) {
      this.setData({
        time
      })
      setTimeout(() => {
        this.changeSendCodeText(time - 1);
      }, 1000)
    } else {
      this.setData({
        isSend: false
      })
      this.getCodeing = false;
    }
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