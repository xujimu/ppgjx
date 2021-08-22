<template >
	
	<view>
		<view >
			<image style="width: 100%;" mode="widthFix" @click="tapAd(item)"
				v-for="(item,index) in list" :src="item.img" :key="index">
			</image>
		</view> 
	</view>
	
</template>

<script>
	var time 
	var count 
	var _self
	export default {
		name: "components",
		onUnload(){
			if(count != 0){
				plus.nativeUI.toast("未到观看时间 不发放观看奖励");
				
			}
			clearInterval(time)
		},
		onLoad() {
			_self = this
			  count = 60
			 time = setInterval(function(){
				if(count > 0){
					uni.setNavigationBarTitle({
					    title: '观看次数发放倒计时' + count + '秒'
					});
					count = count - 1
				}else {

					_self.xhttp.request({
						url: "/user/ad/addCount", //仅为示例，并非真实接口地址。
						method:"POST",
						data: {
							
						},
						header:{
							'Content-Type':'application/x-www-form-urlencoded'
						}
					}).then(res => {
						console.log(res)	
						if(res.data.code == 0){
							
						}
						uni.hideLoading(); 
					}).catch(err => {
						uni.hideLoading(); 
					})
					uni.setNavigationBarTitle({
					    title: '奖励已发放'
					});
					plus.nativeUI.toast("感谢您的支持");
					clearInterval(time)
				}
			},1000)
			
			
			_self.xhttp.request({
				url: "/user/ad/getad", //仅为示例，并非真实接口地址。
				method:"POST",
				data: {
					
				},
				header:{
					'Content-Type':'application/x-www-form-urlencoded'
				}
			}).then(res => {
				console.log(res)	
				if(res.data.code == 0){
					this.list = res.data.data
				}
				uni.hideLoading(); 
			}).catch(err => {
				uni.hideLoading(); 
			})
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				list: []
			};
		},
		methods: {
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			tapAd(e){
				plus.runtime.openURL(e.url);  
			}
		},
	}
</script>

<style>

</style>
