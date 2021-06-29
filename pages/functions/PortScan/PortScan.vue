<template>
	<view>
		<view class="cu-form-group">
			<view class="title">域名</view>
			<input v-model="ip" placeholder="IP地址或域名无需http://"   style="padding-bottom: 6.5upx;"> 
			<button @click="scan()" class='cu-btn bg-green shadow'>扫描</button>
		</view>
		
		<view class="cu-form-group">
			<view class="title">端口</view>
			<input v-model="port" placeholder="多个端口使用英文逗号分割如22,55"> 
		</view>
		
		
		
		<u-table v-if="data == ''?false:true">
			<u-tr>
				<u-th>端口</u-th>
				<u-th>状态</u-th>
				<u-th>类型</u-th>
			</u-tr>
			<u-tr v-for="(item,index) in data">
				<u-td style="height: 80rpx;" >{{item.port}}</u-td>
				<u-td  v-if="item.status == '开启'?false:true" style="height: 80rpx;color: #ff0000;">{{item.status}}</u-td>
				<u-td v-if="item.status == '关闭'?false:true" style="height: 80rpx;color: #228b22;">{{item.status}}</u-td>
				<u-td style="height: 80rpx;">{{item.type}}</u-td>
			</u-tr>
			<u-divider style="height: 80rpx;" >IP:{{resIp}}</u-divider>
		</u-table>
	</view>
</template>

<script>
	var _self;
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
				data:[],
				ip:'',
				port:'',
				resIp:''
			}
		},
		methods: { 
			scan(){
				if(_self.ip == ''){
					plus.nativeUI.alert("请输入ip!", function(){
						}, "提示", "好的");
				}else if(_self.port == ''){
					plus.nativeUI.alert("请输入端口", function(){
						}, "提示", "好的");
				}else{
					uni.showLoading({
					    title: '扫描中'
					});
					_self.xhttp.request({
						url: "/functions/PortVerify/verify", //仅为示例，并非真实接口地址。
						method:"POST",
						data: {
							ip:_self.ip,
							port:_self.port
						},
						header:{ 
							'Content-Type':'application/x-www-form-urlencoded'
						}
					}).then(res => {
						if(res.data.code == 0){
							_self.data = res.data.data.data
							_self.resIp = res.data.data.ip
						}
						uni.hideLoading(); 
					}).catch(err => {
						uni.hideLoading(); 
					})
				}
				
			}
		}
	}
</script>

<style scoped>
	
</style>