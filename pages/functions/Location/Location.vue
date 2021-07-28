<!-- 
	2021/7/27
	liubin
	820565510@qq.com 
-->
<template>
	<view>
		<view class="padding flex flex-direction bg-white top">
			<button class="cu-btn  bg-blue margin-tb-sm lg" @tap="count">获取</button>
		</view>
		<view class="cu-form-group">
			<view class="title">经度</view>
			<input v-model="res.longitude" style="padding-bottom: 6.5upx;">
		</view>
		<view class="cu-form-group">
			<view class="title">纬度</view>
			<input v-model="res.latitude" style="padding-bottom: 6.5upx;">
		</view>
		<view class="cu-form-group">
			<view class="title">国家</view>
			<input v-model="res.address.country" style="padding-bottom: 6.5upx;">
		</view>
		<view class="cu-form-group">
			<view class="title">省/直辖市</view>
			<input v-model="res.address.province" style="padding-bottom: 6.5upx;">
		</view>
		<view class="cu-form-group">
			<view class="title">市</view>
			<input v-model="res.address.city" style="padding-bottom: 6.5upx;">
		</view>
		<view class="cu-form-group">
			<view class="title">县/区</view>
			<input v-model="res.address.district" style="padding-bottom: 6.5upx;">
		</view>
		<view class="cu-form-group">
			<view class="title">地址</view>
			<input v-model="res.address.street" style="padding-bottom: 6.5upx;">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				res: {
					address:{}
				}
			}
		},
		methods: {
			count() {
				var that = this;
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: function(res) {
						that.res = res;
						var addr = "";
						if (res.address.street.length>0) {
							addr += res.address.street;
						}
						if (res.address.streetNum.length>0) {
							addr += res.address.streetNum;
						}
						if (res.address.poiName.length>0) {
							addr += res.address.poiName;
						}
						that.res.address.street=addr;
					}
				});
			}
		}
	}
</script>

<style>

</style>
