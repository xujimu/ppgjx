<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>

		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>视频链接
			</view>
		</view>

		<view class="cu-form-group " style="margin: 20rpx 20rpx;border-radius:18rpx;">
			<textarea auto-height maxlength="-1" v-model="url" placeholder="请输入视频链接 仅支持MP4和部分流媒体"></textarea>
		</view>

		<view v-if="playUrl">
			<video style="width: 100%;" id="myVideo" :src="playUrl" @error="videoErrorCallback" autoplay controls></video>
		</view>

		<view v-if="url" class="padding flex flex-direction bg-white top">
			<u-line-progress v-if="pro" active-color="#2979ff" :percent="pro"></u-line-progress>

			<button class="cu-btn  bg-blue margin-tb-sm lg" @click="play()">预览</button>
			<button class="cu-btn bg-green margin-tb-sm lg " @click="save()" v-if="playUrl">保存至相册</button>
		</view>

	</view>



</template>

<script>
	var _self;
	var downloadTask;
	export default {
		onHide() {
			
		},
		onUnload() {
			_self.clear()
		},
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
							content: '检测到链接!是否粘贴并预览?',
							success: function(res) {
								if (res.confirm) {
									_self.url = value
									_self.play()
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
				url: "",
				downV: false,
				playUrl: '',
				pro: 0
			}
		},
		methods: {
			save() {
				_self.clear()
				console.log("开始")
				downloadTask = uni.downloadFile({
					url: _self.playUrl, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							var url = res.tempFilePath;
							console.log(url)
							console.log(res)
							console.log('下载成功');
							switch (uni.getSystemInfoSync().platform) {
								case 'android':
									plus.io.resolveLocalFileSystemURL('_doc', function(entry) {
										console.log('获取目录对象成功');
										var dc = entry
										var timestamp = Date.parse(new Date());
										//获取文件对象
										plus.io.resolveLocalFileSystemURL(url, function(entry) {
											entry.copyTo(dc, timestamp + ".mp4", function(e) {
												url = "_doc/" + timestamp + ".mp4"
												console.log(url)
												uni.saveVideoToPhotosAlbum({
													filePath: url,
													success: function() {
														uni.showToast({
															title: '保存成功',
															duration: 2000
														});
													},
													fail() {
														uni.showToast({
															icon: "none",
															title: '保存失败',
															duration: 2000
														});
													}
												});
												console.log('移动文件成功');
											}, function(e) {
												console.log('移动文件失败');
											})
										}, function(e) {});
										
									}, function(e) {
										console.log('获取目录对象失败');
									});
									break;
								case 'ios':
									console.log(url)
									uni.saveVideoToPhotosAlbum({
										filePath: url,
										success: function() {
											uni.showToast({
												title: '保存成功',
												duration: 2000
											});
										},
										fail(err) {
											console.log(err)
											uni.showToast({
												icon: "none",
												title: '保存失败',
												duration: 2000
											});
										}
									});
									console.log('运行iOS上')
									break;
								default:
									console.log('运行在开发者工具上')
									break;
							}

						} else {
							plus.nativeUI.alert("下载失败!请检查网络或链接!", function() {}, "提示", "好的");
						}
					}
				});
				downloadTask.onProgressUpdate((res) => {
					_self.pro = res.progress
				});
			},
			play() {
				_self.pro = 0

				uni.showLoading({
					title: '加载中'
				});
				_self.xhttp.request({
					url: "/functions/WipeWatermark/exec", //仅为示例，并非真实接口地址。
					method:"POST",
					data: {
						url: _self.url,
						platform: _self.$store.state.platform
					},
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(res => {
					console.log(res)
					if(res.data.code == 0 ){
						_self.playUrl = res.data.data
					}
					uni.hideLoading(); 
				}).catch(err => {
					uni.hideLoading(); 
				})
				

			},
			videoErrorCallback() {
				console.log("播放失败")
				plus.nativeUI.alert("播放失败!请检查视频链接是否正确!您可以尝试保存至相册", function() {}, "提示", "好的");
			},
			clear(){
				if(downloadTask){
					downloadTask.abort()
				}
			}
		}
	}
</script>

<style>

</style>
