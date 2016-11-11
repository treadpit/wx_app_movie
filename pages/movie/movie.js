// 拿到全局应用程序实例
const app = getApp()

import API from "../../api/api.js";

const conf = {
    data: {
        title: '',
        loading: true,
        movie: {}
    },

    onLoad(params) {
        app.fetch(API.detail + params.id, (err, data) => {
            this.setData({
                title: data.title,
                movie: data,
                loading: false
            });
            wx.setNavigationBarTitle({
                title: this.data.title + ' <- 电影 <- 聚美'
            })
        })
    },

    onReady() {
        wx.setNavigationBarTitle({
            title: this.data.title + ' <- 电影 <- 聚美'
        });
    }
};

Page(conf);
