<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">修改密码</block>
		</cu-custom>
		<view >
			<u-field
				v-model="password"
				label="旧密码"
				placeholder="填写旧密码"
				password
			>
			</u-field>
			<u-field
				v-model="newPassword"
				label="新密码"
				placeholder="请输入新密码"
				password
			>
			</u-field>
			<u-field
				v-model="verifyPassword"
				label="确认密码"
				placeholder="请再次输入新密码"
				password
			>
			</u-field>
		</view>
		<view class="padding-xl">
			<button @click="submit()" :disabled="password == '' || newPassword == '' || verifyPassword == ''?true:false" class="cu-btn block lg bg-blue">修改</button>
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
				password:'',
				newPassword:'',
				verifyPassword:''
			}
		},
		methods: {
			submit(){
				console.log(_self.$u.test.enOrNum(_self.password))
				if(!(_self.$u.test.enOrNum(_self.password) && _self.$u.test.enOrNum(_self.newPassword) && _self.$u.test.enOrNum(_self.verifyPassword))){
					plus.nativeUI.alert("密码只能是数字与字母组合哦!", function(){
						}, "提示", "好的");
				}else if(_self.newPassword != _self.verifyPassword){
					plus.nativeUI.alert("两次填写的密码不一致!", function(){
						}, "提示", "好的");
				}else{
					uni.showLoading({
					    title: '修改中'
					});
					_self.xhttp.request({
						url: "/user/updatePassword", //仅为示例，并非真实接口地址。
						method:"POST",
						data: {
							password:_self.password,
							newPassword:_self.newPassword
						},
						header:{
							'Content-Type':'application/json'
						}
					}).then(res => {
						console.log(res)	
						if(res.data.code == 200){
							_self.$store.state.user = null
							uni.setStorageSync('user', null);	
							_self.toast("修改成功 请重新登录")
							uni.switchTab({
								url: '/pages/index/my'
							});						
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

<style>

</style>
