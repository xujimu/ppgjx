<template>
	<view>
		<view class="padding flex flex-direction bg-white top">
			<button class="cu-btn  bg-blue margin-tb-sm lg" @tap="count">获取</button>
		</view>
		<view class="cu-form-group">
			<textarea auto-height="true" maxlength="-1" v-model="res" placeholder="获取结果"></textarea>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				res: ''
			}
		},
		methods: {
			count() {
				var that=this;
				uni.getLocation({
				    type: 'wgs84',
					geocode:true,
				    success: function (res) {
						console.log(res)
				       that.res='当前位置的经度：' + res.longitude+'\n'+
				       '当前位置的纬度：' + res.latitude+'\n'+
					   '国家：'+res.address.country+'\n'+
					   '省/直辖市：'+res.address.province+'\n'+
					   '市：'+res.address.city+'\n'+
					   '县/区：'+res.address.district+'\n'+
					   '地址：'+res.address.street+res.address.streetNum+res.address.poiName+'\n'
				    }
				});
			}
		}
	}
</script>

<style>

</style>
