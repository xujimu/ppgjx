<template>
	<view>

		<button  @click="selectVideo()">选择视频</button>
		<button  v-if="videoUrl" @click="to()">开始转换</button>
		<button v-if="img" @click="save()">保存图片</button>
		<view v-if="pro" class="padding flex flex-direction  top">
			<u-line-progress v-if="pro" active-color="#2979ff" :percent="pro"></u-line-progress>	
		</view>
		 
		<image :src="img" mode="aspectFit" style="width: 100%;">
	</view>
</template>

<script>
	var _self
	var FFmpeg
	export default {
		components: {

		},
		onLoad() {
			_self = this

			FFmpeg = uni.requireNativePlugin('pocaidao-fmpegcmdruns')
			FFmpeg.logXcodeLog(function(e) {
				_self.log = e
			})
		},
		onShow() {

		},
		onUnload() {


		},
		watch: {

		},
		data() {
			return {
				videoUrl: '',
				img: '',
				log: '',
				pro: 0
			}
		},
		methods: {
			save() {
				uni.saveImageToPhotosAlbum({
					filePath: _self.img,
					success: function() {
						uni.showToast({
							title: '保存成功',
							duration: 2000
						});
					}
				});
			},
			cp() {
				uni.setClipboardData({
					data: _self.log
				});

			},
			to() {
				_self.pro = 0
				//输入目录
				var tempSrc = _self.videoUrl
				//输出目录
				var outPut = plus.io.convertLocalFileSystemURL("_doc") + new Date().getTime() + ".GIF"

				console.log("ffmpeg -i " + tempSrc + " " + outPut)
				//同步调用
				FFmpeg.runCmdCodeAsyncFunc({
						"cmd": "ffmpeg -i " + tempSrc + " " + outPut
					},
					(progress) => {
						//进度回调
						console.log(progress)
						_self.pro = Math.floor(progress * 100)
					},
					(isComplet) => {
						if (isComplet == 1) {
							_self.img = outPut
							
							plus.nativeUI.toast("转换成功");
						} else {
							
							plus.nativeUI.toast(isComplet);
						}
						//完成回调
					})
			},
			selectVideo() {
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function(res) {
						_self.videoUrl = plus.io.convertLocalFileSystemURL(res.tempFilePath);
					}
				});
			}
		}
	}
</script>

<style scoped>

</style>
