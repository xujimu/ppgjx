<template>
	<view>
		<input v-model="amount" />
		<button @click="pay(channel)" v-for="(channel,index) in channels">{{channel.description}}</button>

		
		
	</view>
</template>

<script>
	var _self

	var wxServer = '/pay/test/wx';
	var zfbServer  = '/pay/test/zfb'
	var FFmpeg ; 
	export default {
		components: {
			
		},
		onLoad() {
			
			
			_self = this
						
			_self.init()

		},
		onShow() {
			
		},
		onUnload(){

			
		},
		watch:{
			
		},
		data() {
			return {
				channels: null,
				amount: 0,
				cmd: 'ffmpeg -version',
				log: ''
			}
		},
		methods: { 
			init(){
				// 获取支付通道
				plus.payment.getChannels(function(channels){  
					 _self.channels = channels
					console.log(channels)
				},function(e){  
					console.log("获取支付通道失败")
				});
			},
			pay(channel){  
				
			    // 从服务器请求支付订单  
			    var PAYSERVER='';  
			    if(channel.id=='alipay'){  
			        PAYSERVER=zfbServer;
					 
			    }else if(channel.id=='wxpay'){  
					if(!channel.serviceReady){
						plus.nativeUI.alert("您未安装微信,无法进行微信支付,请先安装微信", function(){
							}, "提示", "好的");
							return
					}
			        PAYSERVER=wxServer;  
			    }else{  
			        plus.nativeUI.alert("不支持该付款方式", function(){
			        	}, "提示", "好的");
			        return;  
			    }
				 _self.xhttp.request({
				 	url: PAYSERVER, //仅为示例，并非真实接口地址。
				 	method:"POST",
				 	data: {
						amount: _self.amount
				 	},
				 	header:{
				 		'Content-Type':'application/x-www-form-urlencoded'
				 	}
				 }).then(res => { 
				 	if(res.data.code == 0){
						
						plus.payment.request(channel, res.data.data, function(){
								console.log("支付成功") 
							}, function(e){
								console.log("支付失败")
								console.log(e)
							} );
				 		
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


