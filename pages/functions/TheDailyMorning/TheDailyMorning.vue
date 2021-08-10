<template>
	<view>
		<view class="padding text-center" v-for="(item,index) in list" >
				<view class="padding-lr bg-white" >
					<view class="padding">{{item}}</view>
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
		},
		onShow() {
			_self.get()
		},
		onUnload(){

			
		},
		watch:{
			
		},
		data() {
			return {
				list: []
			}
		},
		methods: {
			get(){
				uni.showLoading({
					title: '加载中'
				});
				_self.xhttp.request({
					url: "/functions/TheDailyMorning/v1/get", //仅为示例，并非真实接口地址。
					method:"POST",
					data: {
						type: 0
					},
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(res => {
					console.log(res)	
					if(res.data.code == 0){
						_self.list = res.data.data.news
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