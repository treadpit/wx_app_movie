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
						res.userInfo.aboutMe = {
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
	},
	lightAode(e) {
		const mode = e.detail.value ? '开启' : '关闭';
		wx.showModal({
			title: `是否${mode}夜间模式`,
			content: `是否${mode}夜间模式`,
			showCancel: true,
			cancelText: '后悔了',
			confirmText: '是的',
			success() {
				wx.showToast({
					title: `成功${mode}`,
					icon: 'success',
					duration: 500
				})
			},
			fail() {
				
			}
		})
	}
};

Page(conf);