<template>
	<view>
		<view class="cu-form-group " style="margin: 20rpx 20rpx;border-radius:18rpx;">
			<textarea maxlength="-1" v-model="text" placeholder="有什么建议或者bug都可以写给我哟!"></textarea>
		</view>
		<view class="padding-xl" >
			<button :disabled="text != '' ? false:true" class="cu-btn block lg bg-white" @click="submit()">
				<text class="cuIcon-command" ></text>提交</button>
		</view>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>反馈记录
			</view>
		</view>
		
		<view class="cu-list menu-avatar comment " >
			<view class="cu-item " v-for="item  in data" >
				<view class="cu-avatar round" style="background-image:url(../../static/images/logo.jpg);"></view>
				<view class="content">
					<view class="text-grey">我</view>
					<view class="text-gray text-content text-df">
						{{item.issue}}
					</view>
					<view class="text-grey text-right">开发者</view>
					<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
						<view class="flex">
							<view class="flex-sub">{{item.reply == null ? '待回复' : item.reply}}</view>
						</view>
					</view>
					<view class="margin-top-sm flex justify-between">
						<view class="text-gray text-df">{{item.create_time}}</view>
					</view>
				</view>
								
			</view>
		</view>
	
		
	</view> 
</template>
<script>
	var _self;
	export default {
		onLoad() {
			_self = this
			
			_self.query()
		}, 
		data() {
			return {
				text: '',
				data: [

				]
			}
		},
		methods: {
			query(){
				uni.showLoading({
					title: '加载中'
				});
				_self.xhttp.request({
					url: "/user/feedback/v1/query", //仅为示例，并非真实接口地址。
					method:"POST",
					data: {
						type: 1
					},
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(res => {
					console.log(res)	
					if(res.data.code == 0){
						_self.data = res.data.data
					}
					uni.hideLoading(); 
				}).catch(err => {
					uni.hideLoading(); 
				})
				
			},
			submit(){
				console.log("提交") 
				uni.showLoading({
					title: '加载中'
				});
				
				_self.xhttp.request({
					url: "/user/feedback/v1/issue", //仅为示例，并非真实接口地址。
					method:"POST",
					data: {
						issue: _self.text,
						type: 1,
						platform: _self.$store.state.platform
					},
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(res => {
					console.log(res)	
					if(res.data.code == 0){
						_self.query()
						plus.nativeUI.alert(res.data.message, function() {}, "提示", "好的");
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
.cu-list.menu-avatar>.cu-item:after, .cu-list.menu>.cu-item:after {
	border-bottom: 0px none #ddd;
}
</style>
