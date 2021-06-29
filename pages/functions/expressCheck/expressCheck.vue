<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		<view class="cu-form-group">
			<view class="title">单号</view>
			<input v-model="number"  placeholder="请输入快递单号"   style="padding-bottom: 6.5upx;"> 
			<button @click="query()" class='cu-btn bg-green shadow'>查询</button>
		</view>
		
	</view>
</template>

<script>
	var _self
	export default {
		onLoad() {
			_self = this
		},
		data() {
			return {
				number: '',
				data:''
			}
		},
		methods: {
			query(){
				uni.showLoading({
				    title: '查询中'
				});
				
				_self.xhttp.request({
					url: "/functions/ExpressCheck/query", //仅为示例，并非真实接口地址。
					method:"POST",
					data: {
						number:_self.number
					}, 
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(res => {
					
					uni.hideLoading(); 
				}).catch(err => {
					uni.hideLoading(); 
				})
			}
		}
	}
</script>

<style scoped>
	
</style>
