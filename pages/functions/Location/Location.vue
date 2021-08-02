<!-- 
	2021/7/27
	liubin
	820565510@qq.com 
-->
<template>
	<view>
		<view class="padding flex flex-direction bg-white top">
			<button class="cu-btn  bg-blue margin-tb-sm lg" @tap="count">刷新</button>
		</view>
		<view v-if="res.longitude" class="cu-form-group">
			<view class="title">经度</view>
			<input v-model="res.longitude" style="padding-bottom: 6.5upx;">
		</view>
		<view v-if="res.latitude" class="cu-form-group">
			<view class="title">纬度</view>
			<input v-model="res.latitude" style="padding-bottom: 6.5upx;">
		</view>
		<view v-if="res.altitude" class="cu-form-group">
			<view class="title">高度</view>
			<input v-model="res.altitude" style="padding-bottom: 6.5upx;">
		</view>
		<view v-if="res.address.country" class="cu-form-group">
			<view class="title">国家</view>
			<input v-model="res.address.country"  style="padding-bottom: 6.5upx;">
		</view>
		<view v-if="res.address.province" class="cu-form-group">
			<view class="title">省/直辖市</view>
			<input v-model="res.address.province" style="padding-bottom: 6.5upx;">
		</view>
		<view v-if="res.address.city" class="cu-form-group">
			<view class="title">市</view>
			<input v-model="res.address.city" style="padding-bottom: 6.5upx;">
		</view>
		<view v-if="res.address.district" class="cu-form-group">
			<view class="title">县/区</view>
			<input v-model="res.address.district" style="padding-bottom: 6.5upx;">
		</view>
		
		<view v-if="res.address.street"  class="cu-form-group">
			<view class="title">街道信息</view>
			<input v-model="res.address.street" style="padding-bottom: 6.5upx;">
		</view>
		
		<view v-if="res.address.postalCode" class="cu-form-group">
			<view class="title">邮政编码</view>
			<input v-model="res.address.postalCode " style="padding-bottom: 6.5upx;">
		</view>
		
		<view v-if="res.address.poiName" class="cu-form-group">
			<view class="title">POI信息</view>
			<input v-model="res.address.poiName" style="padding-bottom: 6.5upx;">
		</view>
		
		<view v-if="res.address.cityCode" class="cu-form-group">
			<view class="title">城市代码</view>
			<input v-model="res.address.cityCode" style="padding-bottom: 6.5upx;">
		</view>
		
	</view>
</template>

<script>
	var _self
	export default {
		onLoad() {
			_self = this
			switch(_self.$store.state.platform){
				case 'android':
				   console.log('运行Android上') 
				   Vue.prototype.requestAndroidPermission("android.permission.ACCESS_FINE_LOCATION","位置权限")
				   break;
				case 'ios':
				   Vue.prototype.requestIosPermission("location","位置权限")
				   console.log('运行iOS上')
				   break;
				default:
				   console.log('运行在开发者工具上')
				   break;
			}
			
		},
		onShow() {
			this.count()
		},
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
						console.log(res) 
						// var addr = "";
						// console.log(res)
						// if (res.address.street) {
						// 	addr += res.address.street;
						// }
						// if (res.address.streetNum) {
						// 	addr += res.address.streetNum;
						// }
						// if (res.address.poiName) {
						// 	addr += res.address.poiName;
						// }
						// that.res.address.street=addr;
					}
				});
			},
		}
	}
</script>

<style>

</style>
