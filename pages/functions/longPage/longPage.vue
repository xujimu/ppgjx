<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		<view class="cu-form-group">
			<view class="title">网址:</view>
			<input maxlength="-1" v-model="url" placeholder="请输入网址 必须携带http前缀"></input>
			<button @click="create()" :disabled="url == '' ? true : false" class='cu-btn bg-green shadow'>截图</button>
		</view>
		
		<u-divider>云端截图较慢 请耐心等待</u-divider>
		
		<view class="cu-form-group ">
			<view class="title">截图类型</view>
			<picker @change="isPhoneF" :value="isPhoneIndex" :range="isPhoneList" range-key="value">
				<view class="picker">
					{{isPhoneList[isPhoneIndex].value}}
				</view>
			</picker>
		</view>
		
		<u-divider>若手机模式仍然是电脑页面</u-divider>
		<u-divider>请手动指定宽度为手机宽度</u-divider>
		
		<view class="cu-form-group ">
			<view class="title">去除滚动条</view>
			<u-switch v-model="isScroll" active-color="#39b54a"></u-switch>
		</view>


		<view class="cu-form-group">
			<view class="title">宽度</view> 
			<view v-if="widthAuto">自动</view> 
			<input maxlength="-1" v-model="width" v-if="widthAuto == true?false:true" type="number" ></input>
			<u-switch v-model="widthAuto" active-color="#39b54a"></u-switch>
		</view>

		<view class="cu-form-group">
			<view class="title">高度</view>
			<view v-if="heightAuto" style="text-align: left;">自动</view> 
			<input maxlength="-1" v-model="height" v-if="heightAuto == true?false:true"  type="number" ></input>
			<u-switch v-model="heightAuto" active-color="#39b54a"></u-switch>
		</view>
	
	
	</view>
</template>

<script>
	var _self;
	export default {
		onLoad() {
			_self = this
			switch (_self.$store.state.platform) {
				case 'android':
					console.log('运行Android上')
					// Vue.prototype.requestAndroidPermission("android.permission.READ_EXTERNAL_STORAGE")
					// Vue.prototype.requestAndroidPermission("android.permission.WRITE_EXTERNAL_STORAGE")
					break;
				case 'ios':
					Vue.prototype.requestIosPermission("photoLibrary", "相册")
					console.log('运行iOS上')
					break;
				default:
					console.log('运行在开发者工具上')
					break;
			}
		},
		onShow() {

			uni.getClipboardData({
				success: function(res) {
					var value = res.data
					if (value.indexOf("http") != -1) {
						uni.showModal({
							title: '提示',
							content: '检测到链接!是否粘贴?',
							success: function(res) {
								if (res.confirm) {
									_self.url = value
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}
			});

		},
		data() {
			return {
				url: '',
				isPhoneIndex: 0,
				isPhoneList: [{
						'id': '0',
						'value': '电脑模式'
					},
					{
						'id': '1',
						'value': '手机模式'
					}
				],
				isScroll: false,
				height: 1600,
				heightAuto: true,
				widthAuto: true,
				width: 1200,
				isdis: true
			}
		},
		methods: {
			isPhoneF(e) {
				_self.isPhoneIndex = e.detail.value
				console.log(_self.isPhoneIndex)
			},
			create() {
				var isScroll;
				var isPhone;
				var url;
				var width;
				var height

				if(_self.widthAuto){
					width = "auto"
				}else{
					width = _self.width
					if (!_self.$u.test.range(width, [1, 5000])) {
						plus.nativeUI.alert('宽度的范围应该在1-5000范围内', function() {}, "提示", "好的");
						return
					}
				}
				
				if(_self.heightAuto){
					height = "auto"
				}else{
					height = _self.height
					if (!_self.$u.test.range(height, [1, 5000])) {
						plus.nativeUI.alert('高度的范围应该在1-5000范围内', function() {}, "提示", "好的");
						return
					} 
				}
				
				url = _self.url
				
				isPhone = _self.isPhoneList[_self.isPhoneIndex].id

				if (_self.isScroll) {
					isScroll = 1
				} else {
					isScroll = 0
				} 
				

				console.log("截图类型" + isPhone + '去除滚动条' + isScroll  + 'url' + url +
					"宽" + width + "高" + height)
				
				if(_self.isdis){
					_self.isdis = false 
					uni.showLoading({
						title: '处理中'
					});
					_self.xhttp.request({
						url: "/functions/LongPage/create", //仅为示例，并非真实接口地址。
						method:"POST",
						data: {
							url: _self.url,
							width: width,
							height: height,
							isPhone: isPhone,
							isScroll: isScroll
						},
						header:{
							'Content-Type':'application/x-www-form-urlencoded'
						}
					}).then(res => {
						console.log(res)
						if(res.data.code == 0){
							uni.downloadFile({
								url: res.data.data, //仅为示例，并非真实的资源
								success: (res) => {
									if (res.statusCode === 200) {
										console.log("下载成功")
										console.log(res.tempFilePath)
										var tempFilePath = res.tempFilePath;
										// 预览图片
										var arr = []
										arr.push(tempFilePath)
										uni.previewImage({
											indicator: "none",
											urls: arr,
											current: 0,
											longPressActions: {
												itemList: ['保存图片'],
												success: function(data) {
													uni.saveImageToPhotosAlbum({
														filePath: tempFilePath,
														success: function(res) {
															console.log("保存成功")
															uni.showToast({
																icon: "success",
																title: '已保存',
																duration: 1000
															});
														},
														fail: (err) => {
															console.log("保存失败")
															console.log(err)
															uni.showToast({
																icon: "none",
																title: '保存失败',
																duration: 1000
															});
														}
													});
												},
												fail: function(err) {
													console.log(err.errMsg);
												}
											}
										})
									}else{
										console.log("下载失败")
										_self.code("截图失败!",true)
									}
								},
								fail: () => {
									console.log("下载失败")
									_self.code("截图失败!请检查网络!",true)
								},
								complete: () => {
									uni.hideLoading(); 
								}
							});
						}
						_self.isdis = true
					}).catch(err => {
						uni.hideLoading(); 
						_self.isdis = true
					})
				}
				
			}
		}
	}
</script>

<style scoped>
	
</style>
