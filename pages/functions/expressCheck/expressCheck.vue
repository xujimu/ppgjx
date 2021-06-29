<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		<view class="cu-form-group " style="margin: 20rpx 20rpx;border-radius:18rpx;">
			<textarea maxlength="-1" v-model="number" placeholder="请输入快递单号"></textarea>
		</view>
		<view class="padding-xl" >
			<button :disabled="number != '' ? false:true" class="cu-btn block lg bg-white" @click="query()">
				<text ></text>查询</button>
		</view>
		<u-divider style="height: 80rpx;" >当前状态:{{data.state}}</u-divider>
		
		<view v-for="(item,index) in data.info">
			<view>{{item.time}}</view>
			<view>{{item.content}}</view>
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
				data:{time:'',content:'',info:[]}
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
					_self.data = res.data.data
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
