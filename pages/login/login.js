const app = getApp();

const conf = {
  data: {
    logo: "http://p0.jmstatic.com/templates/jumei/images/logo_new_v1.jpg",
    account: "",
    password: "",
    phone: "",
    code: ""
  },
  _login() {

    // ajax 请求
    // fetch("", function())
    // wx.showToast({
    //   title: "正在登陆..."
    // });
      wx.navigateTo({
				url: '../hot/hot',
         success: function (res) {
           console.log('跳转成功');
           console.log(res);
           wx.setStorage({
             key: 'user',
             data: {
               'uid': '45213665',
               'hasLogin': true
             },
             success: function (_res) {
               // success
               console.log('储存成功');
               console.log(_res);
             }
           })
      }
			})
  }
};

Page(conf);