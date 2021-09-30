<template>
	<view>
		<view >
			<u-cell-group>
				<u-cell-item title="头像"  @click="skip()">
					<image style="width: 90upx;height: 90upx;margin-top: 10px;" :src="$store.state.user ? $store.state.user.icon : 'https://ppgjx.com/static/images/logo.png'"></image>
				</u-cell-item>
				<u-cell-item  title="昵称" :value="$store.state.user ? $store.state.user.name : '未登录'" @click="skip()">
				</u-cell-item>
				<u-cell-item  title="皮皮号" :value="$store.state.user ? $store.state.user.account : '未登录'" @click="skip()">
				</u-cell-item>
				<u-cell-item  title="修改密码"  @click="navto('/pages/index/changePassword')">
				</u-cell-item>
				<u-cell-item  title="手机号"  :value="$store.state.user ? $store.state.user.phone ? $store.state.user.phone : '未绑定' : '未登录'"  @click="binPhone()">
				</u-cell-item> 
				<u-cell-item  title="退出"  @click="quit()">
				</u-cell-item>
			</u-cell-group> 
		</view> 
	
	</view>
</template>

<script>
	var _self;
	export default {
		onLoad() { 
			_self = this 
		},
		data() {
			return { 
				
			}
		},
		methods: {
			binPhone(){
				if(_self.$store.state.user.phone){
					plus.nativeUI.alert("暂不支持修改哦!", function(){
						}, "提示", "好的");
				}else{
					_self.navto('/pages/index/bindPhone');
				}
				 
			},
			skip:function(){
				plus.nativeUI.alert("暂不支持修改哦!", function(){
					}, "提示", "好的");
			},
			quit(){
				uni.showModal({
				    title: '提示',
				    content: '确定要退出吗?',
				    success: function (res) {
				        if (res.confirm) {
							_self.xhttp.request({
								url: "/user/quit", //仅为示例，并非真实接口地址。
								method:"GET",
								data:{ 
									
								},
								header:{
									'Content-Type':'application/x-www-form-urlencoded'
								}
							}).then(res => {
								console.log("返回状态")  
								if(res.data.code == 200){	
									_self.$store.state.user = null
									uni.setStorageSync('user', null);
									uni.switchTab({
										url: '/pages/index/my'
									});
								}
								uni.hideLoading(); 
							}).catch(err => {
								uni.hideLoading(); 
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
			
		}
	}
</script>

<style>

</style>
