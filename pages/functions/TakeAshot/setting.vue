<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		<view  class="cu-list menu sm-border" style="margin-top: 0px;margin-bottom: 1px;">
			<view class="cu-item">
				<view class="content ">
					<view><text class="text-blue margin-right-xs"></text>在线状态</view>
				</view>
				<view class="action">
					<u-switch v-model="status"  active-color="#39b54a"></u-switch>
				</view>
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
			uni.showLoading({
			    title: '加载中'
			});
			_self.xhttp.request({
				url: "/functions/TakeAShot/v1/getStatus", //仅为示例，并非真实接口地址。
				method:"POST",
				data:{
				},
				header:{
					'Content-Type':'application/x-www-form-urlencoded'
				}
			}).then(res => {
				console.log("返回状态")  
				if(res.data.code == 0){
					if(res.data.data.status == 1){
						_self.status = true
					}else{
						_self.status = false
					}
				}
				uni.hideLoading(); 
			}).catch(err => {
				uni.hideLoading(); 
			})

		},
		onShow() {
			
		},
		onUnload(){

			
		},
		watch:{
			status:{
				handler(newName, oldName) {
					console.log("当前选中",newName)
					var status = 1;

					if(newName){
						status = 1
					}else{
						status = 0
					}
					uni.showLoading({
					    title: '处理中'
					});
					_self.xhttp.request({
						url: "/functions/TakeAShot/v1/updateStatus", //仅为示例，并非真实接口地址。
						method:"POST",
						data:{
							status:status
						},
						header:{
							'Content-Type':'application/x-www-form-urlencoded'
						}
					}).then(res => {
						console.log(res)  
						uni.hideLoading(); 
					}).catch(err => {
						uni.hideLoading(); 
					})
				}
			}
		},
		data() {
			return {
				status:false
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	
</style>