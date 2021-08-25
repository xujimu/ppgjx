<template>
	<view  class="cu-list menu sm-border" style="margin-top: 0px;margin-bottom: 1px;">
		<view class="cu-item">
			<view class="content ">
				<view><text class="text-blue margin-right-xs"></text>开屏广告</view>
			</view>
			<view class="action">
				<u-switch v-model="ad" @change="change()" active-color="#39b54a"></u-switch>
			</view>
		</view>
	</view>
</template>

<script>
	var _self
	export default {
		components: {
			
		},
		onLoad() {
			_self = this
			var ad = uni.getStorageSync('ad')
			
			if(ad === ""){
				_self.ad = true
			}else{
				_self.ad = ad
			}
		},
		onShow() {
			
		},
		onUnload(){
			
			
		},
		watch:{
			
		},
		data() {
			return {
				ad :true
			}
		},
		methods: {
			change() {
				 console.log("触发",_self.ad)
							// console.log(status);
				 uni.setStorageSync('ad',_self.ad)
				 plus.ad.setSplashAd(_self.ad);			
			},
		}
	}
</script>

<style scoped>
	
</style>