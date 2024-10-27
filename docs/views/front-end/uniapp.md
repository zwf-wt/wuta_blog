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

## 文件

### pages.json

```json
{
  "pages": [ // 页面路由
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "uni-app"
      }
    },
    {
      "path": "pages/demo1/demo1",
      "style": {
        "navigationBarTitleText": "demo页面",
        "enablePullDownRefresh": false
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  },
  "uniIdRouter": {}
}
```
