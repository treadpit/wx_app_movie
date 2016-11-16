const app = getApp();

const conf = {
  data: {
    logo: "http://p0.jmstatic.com/templates/jumei/images/logo_new_v1.jpg",
    account: "",
    password: "",
    phone: "",
    code: ""
  },
  login() {

    // ajax 请求
    // fetch("", function())

    wx.navigateTo({
      url: '../hot/hot',
      success: function (res) {
        wx.setStorage({
          key: 'user',
          data: {
            'uid': '45213665',
            'hasLogin': true
          },
          success: function(res){
            // success
          }
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
};

Page(conf);