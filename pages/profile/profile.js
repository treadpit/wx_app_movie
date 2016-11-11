var app = getApp();

const conf = {
	data: {
		userInfo: '' // 可以不定义
	},
	onLoad() {
		const self = this;
		wx.login({
			success(res) {
				wx.getUserInfo({
					success(res) {
						res.userInfo.onlineTime = 308;
						res.userInfo.experience = 5885;
						res.userInfo.attention = 5;
						res.userInfo.fans = 205;
						res.userInfo.grades = 561;
						res.aboutMe = {
							collect: '../../images/hot-actived.png'
						};
						self.setData({
							userInfo: res.userInfo
						})
					},
					fail() {
						console.log('用户信息获取失败！');
					}
				})
			},
			fail() {
				console.log('登陆失败！');
			},
		})
	}
};

Page(conf);