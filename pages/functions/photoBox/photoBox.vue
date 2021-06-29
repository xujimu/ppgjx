<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>

	<view class="content">
		<jpPwd ref="jpPwds" contents="" :keep="true" :msg="msg"  forgetName="" :tite="title"  @completed="completed"  @forget="forget"></jpPwd>
	</view>
</template>
<script>
	var _self;
	import jpPwd from '@/components/jp-pwd/jp-pwd.vue';
	export default {
		onLoad() {
			_self = this
			var photoBoxPassword = uni.getStorageSync('photoBoxPassword');
			if(!photoBoxPassword){
				_self.title = '初次见面 请设置一个密码吧'
			}
			_self.photoBoxPassword = photoBoxPassword


		},
		onShow(){
			
		},
		onReady(){
			//_self.toOpen()
		},
		onUnload() {
		},
		data (){
			return {
				title:'请输入密码',
				msg:'',
				photoBoxPassword:'',
				newPassword: ''
			}
		},
		components: {
			jpPwd
		},
		methods: {
			toOpen() {
				_self.$refs.jpPwds.toOpen()
			},
			completed(e) {
				if(_self.photoBoxPassword){
					console.log("不设置新密码")
					if (e == _self.photoBoxPassword) {
						
						_self.navto('/pages/functions/photoBox/start')
					} else {
						_self.msg = '密码错误'
						_self.$refs.jpPwds.backs()
					}
				}else{
					console.log("设置新密码")
					if(_self.tempFilePath){
						if(e == _self.tempFilePath){
							console.log('设置成功')
							uni.setStorageSync('photoBoxPassword',e);
							_self.navto('/pages/functions/photoBox/start')
						}else{
							_self.msg = '两次密码不一致'
							_self.$refs.jpPwds.backs()
						}
					}else{
						_self.title = '请确认密码'
						_self.tempFilePath = e
						_self.$refs.jpPwds.backs()
					}
					
					
				}
			},
			forget() {
				console.log('忘记密码')
			}
		}
	}
</script>
