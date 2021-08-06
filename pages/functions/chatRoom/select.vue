<template>
	<view>
		<u-cell-group>
			<u-cell-item icon="file-text" @click="skip('/pages/functions/chatRoom/chatRoomText','text')"  title="文字聊天室" >
			</u-cell-item>
			<u-cell-item icon="mic" @click="skip('/pages/functions/chatRoom/chatRoomAudio','audio')" title="语音聊天室" >
			</u-cell-item>
			<u-cell-item icon="home" @click="skip('/pages/functions/chatRoom/chatRoom','chat')" title="文字语音聊天室" >
			</u-cell-item>
		</u-cell-group> 
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
			
		},
		onUnload(){

			
		},
		watch:{
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			test(){
				_self.xhttp.request({
					url: "/functions/ChatRoom/banned", //仅为示例，并非真实接口地址。
					method:"POST",
					data: {
						uid: 99,
						day: 20	//1 文字 2语音 3语音文字
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
			},
			skip(path,type){
				uni.showLoading({
					title: '请求中'
				});
				_self.xhttp.request({
					url: "/functions/ChatRoom/apply", //仅为示例，并非真实接口地址。
					method:"POST",
					data: {
						type: type    //1 文字 2语音 3语音文字
					},
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(res => {
					console.log(res)
					if(res.data.code == 0){
						_self.navto(path)
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