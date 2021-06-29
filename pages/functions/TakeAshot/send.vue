<template>
	<view>
		<view class="cu-list menu-avatar">
			<view class="cu-item " >
				<view class="cu-avatar radius lg":style="{'background-image':'url(' + user.icon + ')'}"></view>
				<view class="content">
				<view class="text-black"><view class="text-cut">{{user.name}}</view></view>
				<view class="text-gray text-sm flex"> <view class="text-cut">皮皮号:{{user.account}}</view></view>
			</view>
			</view>
		</view>
		
		<view class="cu-form-group " style="margin: 20rpx 20rpx;border-radius:18rpx;">
			<textarea maxlength="-1" v-model="text" placeholder="捎句话吧~"></textarea>
		</view>
		<view class="padding-xl" >
			<button :disabled="text != '' ? false:true" class="cu-btn block lg bg-white" @click="send()">
				<text ></text>拍一拍</button>
		</view>

	</view> 
</template>

<script>
	var _self
	export default {
		components: {
			
		},
		onLoad(option) {
			_self = this
			_self.user = JSON.parse(option.data)
		},
		onShow() {
			
		},
		onUnload(){

		},
		watch:{
			
		},
		data() {
			return {
				text:'',
				user: {}
			}
		},
		methods: {
			send(){
				uni.showLoading({
				    title: '发送中'
				});
				_self.xhttp.request({
					url: "/functions/TakeAShot/v1/send", //仅为示例，并非真实接口地址。
					method:"POST",
					data:{
						receive_user_id:_self.user.user_id,
						text:_self.text
					}, 
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(res => {
					console.log(res)
					if(res.data.code == 0){
						uni.showToast({
							icon: "success",
							title: '操作成功',
							duration: 2000
						});
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