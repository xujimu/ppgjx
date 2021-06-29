<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		<view class="cu-list menu " >
			<view class="cu-item ">
				<view class="content">
					<text class="cuIcon-home text-grey"></text>
					<text class="text-grey">手机品牌:   {{data.brand}}</text>
				</view>
			</view>
			<view class="cu-item "> 
				<view class="content">
					<text class="cuIcon-home text-grey"></text>
					<text class="text-grey">手机型号:   {{data.model}}</text>
				</view>
			</view>
			<view class="cu-item ">
				<view class="content">
					<text class="cuIcon-home text-grey"></text>
					<text class="text-grey">操作系统:   {{data.platform}}</text>
				</view>
			</view>
			<view class="cu-item ">
				<view class="content">
					<text class="cuIcon-home text-grey"></text>
					<text class="text-grey">操作系统版本:   {{data.system}}</text>
				</view>
			</view>
			<view class="cu-item ">
				<view class="content">
					<text class="cuIcon-home text-grey"></text>
					<text class="text-grey">设备像素比:   {{data.pixelRatio}}</text>
				</view>
			</view>
			<view class="cu-item ">
				<view class="content">
					<text class="cuIcon-home text-grey"></text>
					<text class="text-grey">屏幕宽度:   {{data.screenWidth}}</text>
				</view>
			</view>
			<view class="cu-item ">
				<view class="content">
					<text class="cuIcon-home text-grey"></text>
					<text class="text-grey">屏幕高度:   {{data.screenHeight}}</text>
				</view>
			</view>
			<view class="cu-item ">
				<view class="content">
					<text class="cuIcon-home text-grey"></text>
					<text class="text-grey">系统语言:   {{data.language}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	var _self;
	export default {
		onLoad() {
			_self = this;
			uni.getSystemInfo({
			    success: function (res) {
			        console.log(res)
					_self.data = res
			    },
				fail:function(){
					plus.nativeUI.alert("无法获取系统信息", function(){
						}, "提示", "好的");
				}
			});
		},
		data() {
			return {
				data:[]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
