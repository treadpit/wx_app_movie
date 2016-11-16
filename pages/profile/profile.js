var app = getApp();

const conf = {
	data: {
		userInfo: '' // 可以不定义
	},
	onLoad() {

	},
	toLogin() {
		const self = this;
		const userInfo = wx.getStorageSync('user');
		if (!userInfo.hasLogin) {
			wx.redirectTo({
				url: '../login/login'
			})
		} else {
			wx.showModal({
				title: '退出',
				content: "注销当前帐号，但不会退出该程序？",
				showCancel: true,
				cancelText: "取消",
				confirmText: "退出",
				success(res) {
					console.log(res);
					if (res.confirm === 'true' || res.confirm === 1) {
						self.logout();
					}
				}
			})
		}
	},
	logout() {
		wx.removeStorage({
			key: 'user'
		})
		this.setData({
			userInfo: ""
		})
	},
	lightAode(e) {
		const mode = e.detail.value ? '开启' : '关闭';
		wx.showToast({
			title: `已${mode}夜间模式`,
			icon: 'success',
			duration: 500
		})
	},
	chooseAvatar(e) {
		const self = this;
		wx.showActionSheet({
			itemList: ['拍照上传', '从相册选择'],
			itemColor: '#e50150',
			success(res) {
				if (!res.cancel) {
					if (res.tapIndex === 0) {
						self.takePhoto();
					} else {
						self.chooseImageFromCamera();
					}
				}
			},
			fail() {
				console.log(e);
			}
		})
	},
	chooseImageFromCamera() {
		const self = this;
		wx.chooseImage({
			count: 1, // 最多可以选择的图片张数，默认9
			sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
			sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有， 若只写其中一个，则无论哪一个都是调用相册，不能调用相机
			success: function (res) {
				self.setData({
					'userInfo.avatarUrl': res.tempFilePaths[0]
				});
				wx.showToast({
					title: "头像更换成功",
					duration: 1500
				})
			},
			fail: function () {
				wx.showToast({
					title: "头像设置失败",
					duration: 1500
				})
			}
		})
	},
	takePhoto() {
		const self = this;
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: function (res) {
				self.setData({
					'userInfo.avatarUrl': res.tempFilePaths[0]
				});
				wx.showToast({
					title: "头像更换成功",
					duration: 1500
				})
			},
			fail: function () {
				wx.showToast({
					title: "头像设置失败",
					duration: 1500
				})
			}
		})
	},
	callMe() {
		wx.makePhoneCall({
			phoneNumber: 18782966163
		})
	},
	onShow: function () {
		// 页面显示
		const userInfo = wx.getStorageSync('user');
		if (userInfo !== '' && userInfo.hasLogin) {
			var self = this;

			// const uid = userInfo.uid;
			// fetch("getUserInfo", function(){})
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
		}
	},
	onReady: function () {
		// 页面渲染完成
	},
	onHide: function () {
		// 页面隐藏
	},
	onUnload: function () {
		// 页面关闭
	}
};

Page(conf);