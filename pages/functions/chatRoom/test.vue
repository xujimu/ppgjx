<template>
	<view>
		<view v-for="(item,index) in data">
			<view v-if="item.type == 0">{{item.user.name}}:{{item.text}}</view>
			<view v-if="item.type == 3">{{item.text}}</view>
		</view>
		<button @click="send()">发送</button>
	</view>
</template>

<script>
	var _self
	var ping 
	export default {
		components: {
			
		},
		onLoad() {
			_self = this
				
			//进行链接
			_self.connect()
			
			//定时发送ping包
		     ping =	setInterval(function(res){
				// console.log("发送ping")
				uni.sendSocketMessage({
				      data: 'ping',
					  fail() {
					  	console.log("发送失败")
						plus.nativeUI.toast("与服务器断开链接 正在尝试重新链接~~");
						_self.reconnect();
					  }
				});
			},1000)
			
			uni.onSocketOpen(function (res) {
			  console.log('WebSocket连接已打开！');
			});
			uni.onSocketError(function (res) {
			  console.log('WebSocket连接打开失败，请检查！');
			});
			uni.onSocketMessage(function (res) { 
			  var data = JSON.parse(res.data)
			  console.log('收到服务器内容：',data);
			  switch(data.code){
				  case 0:
					// console.log("用户消息",data)
					//用户消息 0文字 1语音 2图片 3视频
					switch(data.data.type){
						case 0:
							console.log("文字",data.data)
							break;
						case 1:
							console.log("语音",data.data)
							break;
						case 2:
							console.log("图片",data.data)
							break;
						case 3:
							console.log("系统消息",data.data)
							break;	
					}
					_self.data.push(data.data)
					break;
				  case 1:
				     console.log("未登录",data)
					break;
				   
			  }
			});
			uni.onSocketClose(function (res) {
			  console.log('WebSocket 已关闭！');
			});
			
		},
		onShow() {
			
		},
		onUnload(){
			clearInterval(ping)
			uni.closeSocket({
				
			})
		},
		watch:{
			
		},
		data() {
			return {
				data: [
					{
						"type": 0,
						"text": "你好",
						"user": {
							"user_id": 100,
							"name": "皮皮工具箱",
							"account": "ppgjx",
							"icon": "https://ppgjx.com/static/images/logo.png",
							"createTime": "2021-07-14 21:16:30"
						}
					},
					{
						"type": 1,
						"text": "你好",
						"user": {
							"user_id": 100,
							"name": "皮皮工具箱",
							"account": "ppgjx",
							"icon": "https://ppgjx.com/static/images/logo.png",
							"createTime": "2021-07-14 21:16:30"
						}
					}
				]
			}
		},
		methods: {
			send(){
				console.log("发送数据")
				uni.sendSocketMessage({
				      data: JSON.stringify({type: 0, text: '你好'}),
				});
			},
			reconnect(){
				console.log("重新链接")
				_self.connect()
			},
			connect(){
				uni.connectSocket({
				    url: 'ws://47.114.186.177:7777?token=' + _self.$store.state.user.token ,
				});
			} 
		}
	}
</script>

<style scoped>
	
</style>