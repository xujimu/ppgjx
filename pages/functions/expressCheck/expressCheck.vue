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
				<text class="cuIcon-command" ></text>查询</button>
		</view>
		<logistics v-if="wlInfo" :wlInfo="wlInfo"></logistics>
	</view>
</template>

<script>
	var _self
	import logistics from '@/components/xinyu-logistics/xinyu-logistics.vue'
	export default {
		components: { logistics ,
		},
		onLoad() {
			_self = this 
			
		},
		onShow() {
			uni.getClipboardData({
				success: function(res) {
					var value = res.data
					if(value != ''){
						uni.showModal({
							title: '提示',
							content: '检测到内容!是否粘贴并查询?',
							success: function(res) {
								if (res.confirm) {
									_self.number = value
									_self.query();
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
					
				}
			});
		},
		data() {
			return {
				number: '',
				data:{time:'',content:'',info:[]},
				wlInfo: ''
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
					console.log(res.data.data)
					if(res.data.code == 0){
						_self.wlInfo = res.data.data
					}
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
