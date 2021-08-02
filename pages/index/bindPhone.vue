<template>
	<view>
		<u-field v-model="phone" label="手机号" placeholder="请填写手机号">
		</u-field>
		<u-field v-model="code" label="验证码" placeholder="请填写验证码">
			<u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
		</u-field>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
		<view class="padding-xl">
			<button :disabled=" code == '' || phone == '' ? true:false" class="cu-btn block lg bg-white"
				@click="bind()">
				<text></text>提交</button>
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
				phone: '',
				code: '',
				codeTips: '',
			}
		},
		methods: {
			codeChange(text) {
				this.codeTips = text;
			},
			bind() {

				_self.xhttp.request({
					url: "/user/user/v1/phone", //仅为示例，并非真实接口地址。
					method: "POST",
					data: {
						phone: _self.phone,
						code: _self.code 
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if (res.data.code == 0) {
						uni.setStorageSync('user', res.data.data);
						_self.$store.state.user = res.data.data
						this.$u.toast('绑定成功');
						uni.switchTab({
							url: '/pages/index/my'
						});
					}
					uni.hideLoading();
				}).catch(err => {
					uni.hideLoading();
				})
			},
			// 获取验证码
			getCode() {
				if (this.$refs.uCode.canGetCode) {

					_self.xhttp.request({
						url: "/user/user/v1/sendSms", //仅为示例，并非真实接口地址。
						method: "POST",
						data: {
							phone: _self.phone
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(res => {
						if (res.data.code == 0) {
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							this.$u.toast('验证码已发送');
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						}
						uni.hideLoading();
					}).catch(err => {
						uni.hideLoading();
					})

				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
		}
	}
</script>
