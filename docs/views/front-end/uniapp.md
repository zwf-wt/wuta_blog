# uniapp

## 基础

### 组件
#### 内置组件
##### view
- hover-class: 设置按下去的样式类。当 `hover-class="none"` 时，没有点击态效果
- hover-start-time: 按住后多久出现点击态，单位毫秒
- hover-stop-propagation: 是否阻止事件冒泡
```vue
<template>
	<view class="layout">
		<view
			class="box"
			hover-class="boxHover"
			hover-start-time="0"
		>
			<view
				class="inner"
				hover-class="innerHover"
				hover-stop-propagation
			>
				内部元素
			</view>
			view布局标签
		</view>
		
	</view>
</template>

<script setup>
	
	
</script>

<style lang="scss">
.layout {
	border: 1px solid red;
	.box {
		width: 200px;
		height: 200px;
		background: #ccc;
		border: 1px solid green;
	}
	
	.boxHover {
		background-color: orange;
	}
	
	.inner {
		width: 150px;
		height: 150px;
		background-color: green;
	}
	
	.innerHover {
		background-color: greenyellow;
	}
	
}
</style>
```
##### text
- selectable: 文本是否可选
- space: 显示连续空格的方式
```vue
<template>
	<view class="layout">		
		<text selectable space="emsp">文 本 标 签</text>
	</view>
</template>

<script setup>
	
	
</script>

<style lang="scss">
.layout {
	border: 1px solid red;
}
</style>
```

##### scroll-view
可滚动视图区域。用于区域滚动
- scroll-x: 允许横向滚动
- scroll-y: 允许纵向滚动
```vue
<template>
	<view class="layout">
		
		<scroll-view
			scroll-y="true"
			class="scrollView"
			scroll-x="true"
		>
			<view class="box">scroll子元素</view>
			<view class="box">scroll子元素</view>
			<view class="box">scroll子元素</view>
			<view class="box">scroll子元素</view>
			<view class="box">scroll子元素</view>
			<view class="box">scroll子元素</view>
			<view class="box">scroll子元素</view>
			<view class="box">scroll子元素</view>
			<view class="box">scroll子元素</view>
			<view class="box">scroll子元素</view>
			<view class="box">scroll子元素</view>
		</scroll-view>
	</view>
</template>

<script setup>
	
	
</script>

<style lang="scss">
.layout {
	border: 1px solid red;
	
	.scrollView {
		width: 80%;
		height: 220px;
		border: 1px solid red;
		white-space: nowrap;
		.box {
			width: 100px;
			height: 100px;
			background-color: blue;
			display: inline-block;
			margin: 5px;
		}
	}
}
</style>
```
##### swiper
轮播图
```vue
<template>
	<view class="layout">		
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				1111
			</swiper-item>
			<swiper-item>
				22222
			</swiper-item>
			<swiper-item>
				33333
			</swiper-item>
			<swiper-item>
				444444
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	
	
</script>

<style lang="scss">
.layout {
	border: 1px solid red;
}
</style>
```
##### image
图片组件
```vue
<template>
	<view class="layout">
		<image src="../../static/logo.png" mode=""></image>
	</view>
</template>

<script setup>
	
	
</script>

<style lang="scss">
.layout {
	border: 1px solid red;
}
</style>
```
##### navigator
页面跳转
- open-type: reLaunch、navigate
```vue
<template>
	<view class="layout">
		<view class="">
			<navigator
				url="/pages/demo1/demo1"
			>
				跳转到demo1
			</navigator>
		</view>
	</view>
</template>

<script setup>
	
	
</script>

<style lang="scss">
.layout {
	border: 1px solid red;
}
</style>
```
##### button
```vue
<template>
	<view class="layout">
		<button type="default">按钮</button>
		<button size="default" type="primary">按钮</button>
		<button size="default" type="warn">按钮</button>
		<button size="default" type="warn" plain>按钮</button>
	</view>
</template>

<script setup>
	
	
</script>

<style lang="scss">
.layout {
	border: 1px solid red;
	
	
}
</style>
```
##### input
```vue
<template>
	<view class="layout">
		<input type="text" value="" placeholder="请输入" />
		<input type="tel" value="" placeholder="请输入" />
	</view>
</template>

<script setup>
	
	
</script>

<style lang="scss">
.layout {
	border: 1px solid red;
}
</style>
```
## 生命周期
```vue
<script setup>
import {
	onLoad, onReady, onShow, onHide, onUnload,
	onPageScroll
} from '@dcloudio/uni-app'

onLoad((e)=>{
	console.log('onLoad, 接收路由参数', e)
})

onReady(() => {
	console.log('onReady 类似于 onMounted')
})

onShow(() => {
	console.log('onShow')
})

onHide(() => {
	console.log('onHide')
})

onUnload(() => {
	console.log('onUnload 卸载页面')
})

onPageScroll(() => {
	console.log('onPageScroll 页面滚动')
})

// -- onLoad -> onShow -> onReady
</script>
```
## 响应式单位rpx
以750px进行换算的

## 导入样式文件
```vue
<style>
@import '@/xxx.css'
</style>
```
## 文件

### pages.json

```json
{
  "pages": [ // 页面路由
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "uni-app",
      }
    },
    {
      "path": "pages/demo1/demo1",
      "style": {
        "navigationBarTitleText": "demo页面",
        "enablePullDownRefresh": false, // 禁止下拉刷新
				"navigationBarBackgroundColor": "#000000", // 页面导航栏背景颜色
				"navigationBarTextStyle": "white", // 页面导航栏标题颜色
      }
    }
  ],
  "globalStyle": { // 全局样式
    "navigationBarTextStyle": "black", // 导航栏标题颜色 black/white
    "navigationBarTitleText": "uni-app", // 导航栏标题文字内容
    "navigationBarBackgroundColor": "#F8F8F8", // 导航栏背景颜色
    "backgroundColor": "#F8F8F8",
		"navigationStyle": "custom", // 导航栏样式 default/custom
		"enablePullDownRefresh": true, // 是否开启下拉刷新
		"backgroundTextStyle": 'light', // 下拉 loading 样式 dark/light
		"onReachBottomDistance": 50 // 页面上拉触底事件触发时距页面底部距离
  },
  "uniIdRouter": {},
	"tabBar": {
		"color": '#999', // 未选中颜色
		"selectedColor": '#333', // 选中颜色
		"list": [
			{
				"pagePath": "pages/index/index",
				"text": "首页",
				"iconPath": "static/tabbar/home.png", // 未选中图标 81 * 81
				"selectedIconPath": "static/tabbar/home-active.png" // 选中图标 81 * 81
			}
			{
				"pagePath": "pages/index/index2",
				"text": "分类",

			}
		]
	}
}
```
## manifest.json
```json
// 上传代码时自动压缩
// 设置appid
```
## vite.config.js
```
npm i uniplugin-auto-import
```

创建一个 vite.config.js 文件
```js
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'uniplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: [
				'vue',
				'uni-app'
			]
    })
  ]
})
```