# wechat
### 一 、小程序是什么？
- 一种介于原生app、和web app的hybrid, 比web app 的开发成本还低;
- 通过微信进行加载;
- 相对原生app来说，更加轻量、更新实时、跨平台;
- 相对web app来说，资源离线，体验更流畅。
- 可以使用微信的支付功能

[开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=20161107)
[开发文档](https://mp.weixin.qq.com/debug/wxadoc/dev/?t=20161107)
### 二 、实现机制
基于微信提供的一套应用框架。微信通过封装微信客户端提供的**文件系统**、**网络通信**、**任务管理**、**数据安全**等基础功能，对上层提供了一套完整的***Javascript Api***，开发者能够非常方便的调用微信客户端提供的各种基础功能。
> 视图层描述语言 `.WXML` 和 `.WXSS`，以及基于 JavaScript 的逻辑层框架，并在视图层与逻辑层之间通过 **单向数据** 绑定进行数据传输

![](http://mmbiz.qpic.cn/mmbiz_png/tnZGrhTk4dfuSoEBa0bEh8RGsIW2ETpjqPvicUCXMgEEliaFVFn3Zp2cesJEsib6srQ7WmKI8futbzEicia5YQOTUNg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

### 三 、开发前须知
+ AppStore问题;
+ 发布的项目包体积 **< 1M**, 只适合轻量级 😤;
+ 开发基于微信框架，部分功能受限, 不能操作DOM, 没有script标签，要引入则需加入项目文件夹;
+ 没有与浏览器BOM相关的API;
+ 没有cookie 😱;
+ 用 **storage** 替代了H5中的*localstorage*、*sessionstorage*、 storage对每个小程序的大小是 **10M**，支持 **同步** 和 **异步** 🤔。
+ 同时只能存在 **5** 个url请求;
+ 小程序页面只能同时打开 **5** 个，如果交互流程较长难以支持;
+ 注释方式： `// comment`, `/** comment **/`;

注意：cookie问题，在请求发送时，可以动态设置Header发送报文的cookie，但是 **cookie本身不能在客户端进行读写**。

```
wx.request({
	header: {cookie: "abcd1234"},
	url: "/getinfo",
	data: {},
	...
})

```
### 四、路由
1. pages 里面的第一个元素即为首页;
2. 每个页面需要手动在app.json中进行注册，否则不能访问;
3. 路由跳转： 组件跳转(navigator) ／ API跳转

```
wx.navigateTo({  // 保留当前页
	url: "",
	...
}) 

wx.navigateTo({  // 关闭当前页
	url: "",
	...
})

```

### 五、Tab页

1. 由app.json定义；
2. 配置最少2个、最多5个；
3. 每个页面的 `.json` 文件可以覆盖定义导航栏。

### 六、页面结构
#### 由同路径下同名的四个不同后缀文件的组成：

+ `.js` 文件是脚本文件
+ `.json` 文件是配置文件
+ `.wxss` 是样式表文件
+ `.wxml` 文件是页面结构文件

![](http://mmbiz.qpic.cn/mmbiz_png/tnZGrhTk4dfuSoEBa0bEh8RGsIW2ETpjtic2d6sibDx40IJ4WzHV7Jb6KjCNmtr4NPe9nLPPEGV77n5IuGEzbfmA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

##### `.wxml` 文件
```
// wxml语法

<block wx:for="{{shareItems}}" wx:for-index="idx">
	<view id="{{idx}}" class="flex share-item box box-tb">
	  <view class="flex box box-lr article-info">
	    <view class="flex title">{{item.articleInfo.title}}</view>
	  </view>
	  <view class="user-info box box-lr">
	    <image src="{{item.articleInfo.isApproved ? icon.approved : icon.approve}}" class="icon approve-icon"></image>
	  </view>
	</view>
</block>

```
 
1. `.wxml` 文件通过相同的名称，将页面与逻辑js、样式、配置进行关联匹配
2. `.wxml` [组件语法](https://mp.weixin.qq.com/debug/wxadoc/dev/component/?t=20161107)
3. `.wxml` 提供两种文件引用方式[`import`(有作用域)和`include`](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/import.html)
4. 事件绑定方式

```
// test.wxml

<view class="flex title" bindtap="getInfo">{{userName}}</view>

// test.js

page({
	data: {},
	getInfo: function() {
		this.setData({
			userName: "Tom"
		})
	}
})

```

##### `.wxss` 文件
```
/** app.wxss **/

@import "common.wxss";

view {
  padding:15px;
}

```
1. 可通过 `@import` (后跟相对路径)样式表;
2. [尺寸单位](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxss.html?t=20161107)：有两种单位：(1)、引入`rpx`(根据屏幕宽度进行自适应)的概念； (2)、`rem`；
3. 支持内联
4. [选择器](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxss.html?t=20161107)：不再支持媒体查询，支持 .demo, #demo, view, view input, view::after, view::before;
5. 增加了app的flex布局;
6. 目前还不支持动画 😱;
7. [weui 官方样式库](https://github.com/weui/weui-wxss) 😢

> 规定屏幕宽为750rpx, 如iPhone6, 1rpx = 1物理像素 = 0.5px;
> 
> 规定屏幕宽度为20rem, 1rem = (750/20)rpx;


##### `.js` 文件
1. 模块运行（类似node，框架自动添加外层define）;
2. 形式上支持CommonJs，通过require加载;
3. data应约定为只读，不能直接修改data值，否则 **容易造成data中的数据与view不一致**;
4. 更新View需使用[setData()]()，与data中的数据进行Diff比较，不同才会更新。

- setData() 单次设置的数据 **< 1M**，要避免一次设置过多的数据;
- 支持ES6中的 `…` 操作符展开模块数据。

![](http://mmbiz.qpic.cn/mmbiz_png/tnZGrhTk4dfuSoEBa0bEh8RGsIW2ETpjuftMrzdyau2PiciazwkiaJfWJhwowV0hu1B226MkSG5NJ6fG23bhUj1WA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

```
// js引入 

// a.js
function sayHi() {
	console.log("hello wxAPP!");
}
module.exports = {
	say: sayHi
}

// b.js
var say = require("a.js");

```


```
// data 操作 

page({
	data: {
		name: 'one'
	},
	handleData() {
	
		// 错误操作方式，虽不会报错，但不会更新view
		this.data.name = 'two';
		
		// 正确操作方式
		this.setData({
			name: 'tow'
		})
		
	}
})

```

##### `.json` 文件

- 各个页面的配置性文件

[小程序其他限制](https://github.com/iamxwk/Code-wiki/issues/18)