##  一个电影类小程序应用（使用豆瓣API）

### start

- [下载开发工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=20161107)；
- 新建项目，添加appid，可选择无appid（无appid，不能手机预览）；
- 选择项目 -> 点击预览 -> 打开微信扫描二维码

> 若无appid可选择[申请](https://mp.weixin.qq.com/?t=20161107)


# 快速上手
****
### 1. 创建项目
- 在磁盘新建小程序项目文件夹；
- 安装并打开开发工具；
- 若无appid，选择无appid（无appid不能手机预览调试）；
- 命名小程序，选择项目文件夹，新建小程序；
- 点击添加项目，则项目自动创建完成。

-
### 2. 目录分析
```
├── app.js // 小程序的脚本文件
├── app.json // 整个小程序的全局配置，配置小程序是由哪些页面组成，配置小程序的窗口背景色，配置导航条样式，配置默认标题
├── app.wxss // 小程序的公共样式表
├── pages // view，各个视图页面
│   ├── index
│   │   ├── index.js
│   │   ├── index.wxml
│   │   └── index.wxss
│   └── logs
│       ├── logs.js // 页面的脚本文件
│       ├── logs.json // 页面的配置文件，非必需（没有则应用app.json配置），该配置文件只能修改app.json里的window配置
│       ├── logs.wxml // 页面的结构
│       └── logs.wxss // 页面样式文件，语法参考css
└── utils // 通用工具类方法文件夹
    └── util.js  
```

### 3. 文件分析
##### (1) app.json
> 小程序配置文件，文件内不能有注释

```
{
    "pages":[
        "pages/index/index", // pages第一项为小程序启动页
        "pages/logs/logs",
        "pages/home/home",
        "pages/cart/cart"
    ],
    "window":{ // 设置小程序的状态栏、导航条、标题、窗口背景色
        "backgroundTextStyle":"light",
        "navigationBarBackgroundColor": "#fff",
        "navigationBarTitleText": "WeChat",
        "navigationBarTextStyle":"black"
    },

     // 以下配置项需自己配置，初始化项目是并无以下配置项

    "tabBar": { // 底部tab栏
        "color": "#ccc",
        "selectedColor": "#35495e",
        "borderStyle": "#fff",
        "backgroundColor": "#fafafa",
        "list": [
            {
                "text": "主页",
                "pagePath": "pages/home/home", // 必须在 pages 中先定义，否则失效。
                "iconPath": "images/homev.png", // images文件夹自己创建即可，tab 栏图标
                "selectedIconPath": "images/home-actived.png" // tab 栏选中后图标效果
            },
            {
                "text": "购物车",
                "pagePath": "pages/cart/cart",
                "iconPath": "images/cart.png",
                "selectedIconPath": "images/cart-actived.png"
            }

        ]
    },
    "networkTimeout": { // 设置网络超时时间

    },
    "debug": true // 手机端是否开启调试，手机端扫码后需点击右上角打开调试，自动退出程序后重新扫码，调试工具vconsole生效，调试工具可直接书写js代码。
}
```

#####  (2) logs.json 
> 各页面配置项，不能有注释

``` 
// 页面 `.json` 配置项只能修改app.json里的window配置，决定本页面的窗口表现，故不需要window键，直接书写window内的配置即可。

{
    "navigationBarTitleText": "查看启动日志"
}
```
##### (3) app.js 

> 小程序启动脚本，使用 `App()` 函数注册小程序

```
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    getUserInfo:function(cb){ // 全局函数
        var that = this
        if(this.globalData.userInfo){
            typeof cb == "function" && cb(this.globalData.userInfo)
        }else{
            //调用登录接口
            wx.login({
            success: function () {
                wx.getUserInfo({
                success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
                })
            }
        })
    }
    },
    globalData:{ //   全局数据, 其它视图页面js可以通过getApp()这个全局函数获取整个app实例
        userInfo:null
    }
})
```

##### （4）utils.js
> 工具函数js库，可单独定义，其它页面引入即可

```
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

module.exports = {  // 暴露方法
    formatTime: formatTime
}

```

##### (5) logs.js

> 各页面脚本文件，通过 `Page()` 函数注册页面，新建 `.js` 文件，在开发工具里直接输入 `Page` 会自动创建该 js 的结构，如下：

```
var app = getApp(); // 获取app实例；
var userInfo = app.globalData.userInfo; // 可通过全局实例获取全局data和event

var util = require('../../utils/util.js'); // 引入工具库，亦可使用 `import` 方法导入

Page({
    data:{ // 本页面数据，类vuejs处理方式
        name: "Bow",
        human: {
            man: {
                name: 'Tom'
            }
        }
    },

    // 各种事件直接接着写就行
    ClickItem() { // 支持es6语法
        this.setData({ // 设置数据，会主动render相关视图，但若通过 this.data.name = "这样会更改数据，但不会触发render"
            'human.man.name': "支持点操作符赋值深路径"
        })

        wx.navigateTo({
            url : '../otherPage/index'   // 这里的路由也要先写到pages数组里
        })  
    },

    // 以下为页面生命周期函数
    onLoad:function(options){
        // 页面初始化 options为页面跳转所带来的参数，如其它页面通过如下代码跳转到本logs页面，在本页面则可获取所传参数

    },
    onReady:function(){
        // 页面渲染完成
    },
    onShow:function(){
        // 页面显示
    },
    onHide:function(){
        // 页面隐藏
    },
    onUnload:function(){
        // 页面关闭
    }
})

```

##### (6) logs.wxml

> 丰富的组件，除基本的表单，媒体，地图等，还包含scroll-view, slider, picker等，详情点击文章尾部的官方文档查阅；
>
> 数据绑定使用双大括号将变量包起来，变量为js中data里的数据，示例如下：

```
<view>这是视图文件</view>

<view>

    <text>下面演示绑定数据和事件</text>

    <view>{{ name }}</view>  // 内容
    
    <view id="item-{{id}}"> </view> // 组件属性(需要在双引号之内)
    
    <view wx:if="{{condition}}"> </view> // 控制属性(需要在双引号之内)
    
    <view wx:if="{{length > 5}}"> </view> // 逻辑判断
    
    <view hidden="{{flag ? true : false}}"> Hidden </view>  // 三元运算
    
    <checkbox checked="{{false}}"> </checkbox> // 关键字(需要在双引号之内), 不要直接写 checked="false"，其计算结果是一个字符串，转成 boolean 类型后代表真值
    
    <view> {{a + b}} + {{c}} + d </view> // 算数运算
    
    <view>{{object.key}} {{array[0]}}</view>  // 数据路径运算


    // 循环列表
    <view wx:for="{{items}}"> 
        {{index}}: {{item.message}}
    </view>

	
	// 使用 wx:for-item 可以指定数组当前元素的变量名，使用 wx:for-index 可以指定数组当前下标的变量名，如：
	<view wx:for="{{items}}" wx:for-index="idx" wx:for-item="itemName">
		{{idx}}: {{itemName.message}}
	</view>
	
	
	// block wx:for，类似block wx:if，也可以将wx:for用在<block/>标签上，以渲染一个包含 多节点 的结构块
	<block wx:for="{{items}}">
		<view> {{index}}: </view>
		<view> {{item}} </view>
	</block>
	
	// 组件路有跳转注意事项，如：
	<navigator url="../logs?title=navigate" hover-class="navigator-hover">跳转到新页面</navigator>  // 注意： 这里的url也必须在app.json中的pages选项中配置，否则不能跳转

</view>
```

##### (7) logs.wxss

> logs.wxss等为本页面样式文件，app.wxss为公共样式文件；
> 
> wxss不提倡使用级联；
> 
> 样式单位：px, rem, rpx。
> 

### 4、事件绑定

| 事件类型        | 描述           |
| ------------- |:------------- |
| touchstart      | 手指触摸动作开始 |
| touchmove     | 手指触摸后移动    |
| touchcancel | 手指触摸动作被打断，如来电提醒，弹窗      |
| tap     | 手指触摸后马上离开    |
| longtap     | 手指触摸后，超过350ms再离开    |

> bind或catch开头，然后跟上事件的类型，如bindtap
> 
> bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡。

```
<view id="tapTest" data-info="userInfo" bindtap="ClickItem"> Click me! </view>

// 有些事件是组件内定义的，如下面的几个事件：

	<input  bindinput="bindHideKeyboard" placeholder="输入123自动收起键盘" />  // bindinput
	
	<switch checked bindchange="switch1Change"/> // bindchange
	
	<textarea bindblur="bindTextAreaBlur" auto-height placeholder="自动变高" /> // bindblur
	
	...

```


#### 相关组件／API等详情请参考： [小程序开发官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/?t=20161122)