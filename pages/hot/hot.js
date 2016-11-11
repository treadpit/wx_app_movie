import API from "../../api/api.js";
const app = getApp();

const conf = {
    data: {
        title: '正在拼命中...',
        movies: [],
        loading: true,
    },

    onLoad() {
        app.fetch(API.hot, (err, data) => {
            this.setData({
                title: data.title,
                movies: data.subjects,
                loading: false
            })
        });
    }
};

Page(conf);