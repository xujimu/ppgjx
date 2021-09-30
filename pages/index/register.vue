<template>
	<view>
	<view class="login-img">
		<view class="owl-login" >
			
		</view>
	</view>
		
		<view class="login-form">
			<form @submit="formSubmit">
				<view class="form-input">
					<input type="text" maxlength="7" v-model="name" placeholder="昵称" />
				</view>
				<view class="form-input">
					<input  type="text" maxlength="15" v-model="account" placeholder="皮皮号" />
				</view>
				<view class="form-input">
					<input type="password" maxlength="20" v-model="password" placeholder="密码" @focus="passwordF_B" @blur="passwordF_B" />
				</view>
				<view class="form-input">
					<input type="password" maxlength="20" v-model="verifyPassword" placeholder="确认密码" @focus="passwordF_B" @blur="passwordF_B" />
				</view>
				<button type="primary" :disabled="account == '' || password == '' || name == '' || verifyPassword == ''?true:false" @click="submit()">注册</button>
			</form>
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
				hideEyes: false,
				account: '',
				password: '',
				name:'',
				verifyPassword:''
			}
		},
		methods: {
			passwordF_B() {
				this.hideEyes = !this.hideEyes;
			},
			formSubmit(e) {
				console.log(e.detail.value);
			},
			submit(){
				console.log("注册")
				
				if(!_self.$u.test.enOrNum(_self.account)){
					_self.toast("皮皮号只能是数字与字母组合哦!")
				}else if(_self.password != _self.verifyPassword){
					_self.toast("两次密码不一致!")
				}else if(!_self.$u.test.enOrNum(_self.password)){
					_self.toast("密码只能是数字与字母组合哦!")
				}else{
					uni.showLoading({
					    title: '注册中'
					});
					
					_self.xhttp.request({
						url: "/user/register", //仅为示例，并非真实接口地址。
						method:"POST",
						data: {
					        name:_self.name,
							account:_self.account,
							password:_self.password
						},
						header:{
							'Content-Type':'application/json'
						}
					}).then(res => {
						if(res.data.code == 200){
							_self.toast("注册成功,请登录")
							_self.navto('/pages/index/login')
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
	.login-form {
		margin: -9px 10px 0 10px;
		height: auto;
		background: #007AFF; 
		border-radius: 10px;
		background-color: #EEEEEE;
		box-shadow: 0 2px 10px #9B9B9B;
		padding: 20px;
	}

	.form-input input {
		background: #ffffff;
		border-radius: 5px;
		height: 40px;
		margin: 20px 0;
		padding: 0 10px;
	}

	.login-img {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 108px;
		margin-top: 100upx;
	}

	.owl-login {
		width: 211px;
		height: 108px;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaYAAADYCAMAAACX8Lc0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURQAAAHhROYBWPXpSOpRkR4teQ3NNN3lSOpZlSH9VPHFMNpBhRY1fQ5BhRYxeQ2hGMpVkR4VZP3pSOmxJNJJiRnRON5NjRpBhRV9ALXVPOHpSOnVPOIZaQF8/LW9KNWFALpRkR3ZPOIZaQG9LNV9ALlo8K5VkR31UO1U5KE41JYxeQ3VPOEkyI1U6KU0zJWBALkArHv///93d3BoWG3dQOZVkR5RkR0syJEYvIk0zJZJiRpBhRXhROUkxI3lSOnZQOXZPOHpSOkQuIUEsH0UuIUcwIoRZP1o8K4dbQZNjRoxeQ5FiRopdQntTO0gwI31UPIFXPo1fRIhcQYZaQHhROnZQOIVaQEwzJDYlGl8/LfzHA1I3J5NjRzUkGl4+LT8rH0oxIzgmG4BWPYNYP0MtIFQ4KIJYPlA1Jo9gRIteQ1c6KU40JU81Jj4qHnVPOEoyJDknHH9WPTsoHI5gRGA/LVw9LJRjR0gwIlU5KYlcQlE2J5ZlSF09LD0pHTclG35VPJVlSDQkGVk7KnxTOzonHDwoHT8qHmBALpFhRYVZQIZbQHpTO4hbQTQjGUIsIINZP0cvIoldQoJXPn9VPX5VPUYvIZFiRV4+LI1fQ040JsS+utbKwvn4+Pz8/ItdQ2hGMv7+/nFMNmtIM2ZEMMrCvWNCL+7u7W5KNODg38fAvOTj41c5Kd/Qx/Lx8Vk7K9fV1Ovr6ujo5/X19bmzsIV1bNrZ2LSsp4t9dX5uZJmNhWxXS6+moCckKNTR0N3OxcC6tk40JpKDe6uinM3Kx2hPQkZDR4mHiltGOnJeU5GQkiAcIX57fkw5LTMvM6uqrKGYk9HNy3VkWV5ORf/77f7ur8nGxP3bWkQzKWRJOp6TjfzMFlM8Ljo3O2ZkZ3xnW6GfoWBdYaqel+u5BtDFv6eZkVg9IW9sb1lWWlJDOVE/NPnGCXJSG5qYmmFEH/G9Bf3SMIJhGP7pmP/2131cGpBsFqyEEVpBM4hlF8WZDbuQDqSclt7DbdipCcrArMGVDYJeIqKadIMAAACtdFJOUwARC9SxQFAgwQVkcFBhMSmSGIQ9fd+j16G1pfPC3cDz43SPkn2w+Oj04+zp7Lr0y/r////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+2IAVYAAAF8VJREFUeNrt3XtcE1e+AHBERZGHolZb66vWal+73QxRAwE0gKZoAR9YxNjEB1kQIVBoLIJaC2p0a9lb613REmMSQ5AuIu+XlA+Cz/reddVqrfb93O29+7rvz51HMplJZjKTZITkZH5/tp+PJ8x35nfO+Z2ZcwICBjkiAnwrhjwe4Icx6hkf+8Ezn/VHpim+9ldPyRrlf0oRKYmjfeoHBxdnTfE/pscT430r14+SZZWM8DumZxPjn/OpH/ySLCvX7wYRQQsT40VDfOq+gpn8bhDxEsxUMdOHfvA4JcwUFeRfSsElCJMvdcnPoEwv+RfTzFiEKd+HfvE0lCk30L8mTSiTwncmIqOLUaZ5M/1JaUQ6xvQL35k/WJie8yemx/Mxpl/6Ts6zMM0b7UdMz1qYdo/zkR8cUWZhWvuM/yiNS7cy+cof/XSOlemX/sM0FWfylT96Cs6UMs5vmJ7Fmbb5RqoPVNuY/CbrBW2yMflGlWxmmY3Jb7LeVALTi76R8whMIkvWA3bIN8Iym32WwLTLF/7aQDWRCZvsjXsRVKax09CS+LhcAlOhL2S9mVIiE5b1XiwEtW40VToVnduSmHzhppxCYkJXnR8vLAB1yX2aVIosBEwhMe30/qw3RE5mghPA6ITCAkCHfEO2SqXTAgMClSSmAu/Pek+ryUzPBQQ8B/9wQMt7T8FMOVMDRpWQmbw/602xY0oJeDoP/uG/ApPpCYQpJ2iqHdM6b5/Wjzhox5Q5MxFhWgfmkHwKwlQ8bZo9k7evZjzuwCRSoExgrj2ZUCalzJ7J25PHNAemBIzpFyAqjc6gYVrl3e+BBGXQMQE5hniKlsm778qXaJmAHEM8gTIZKZieDPbinx1scmQ6hDFtHwIg02MIk3GNzoEpsyjUm3Oe0YEpa0FJng9kazd7YoRp/dwkoz1T6pKR3pwEhBo7JplKqMOYQBzqaWAmzZq5c6N1ZCbTkiVLwr134COR6MlMxSqhUBiLMgFYLhqBMJXPhWONgciUK4aZxnhvoUgiidMR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');
		background-repeat: no-repeat;
		background-size: 100%;
	}


</style>
