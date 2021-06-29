<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		<view class="cu-form-group ">
			<view class="title">图片质量: {{quality}}</view>
			<view class="wrap" style="width: 400rpx;">
				<u-slider min="1" v-model="quality"></u-slider>
			</view>
		</view>
		<view class="cu-form-group ">
			<view class="title">宽度: {{width}}%</view>
			<view class="wrap" style="width: 400rpx;">
				<u-slider min="1" v-model="width"></u-slider>
			</view>
		</view>
		<view class="cu-form-group ">
			<view class="title">高度: {{height}}%</view>
			<view class="wrap" style="width: 400rpx;">
				<u-slider min="1" v-model="height"></u-slider>
			</view>
		</view>

		<view class="cu-form-group">
			<view class="title">保留格式</view>
			<u-switch min="1" v-model="png" active-color="#39b54a"></u-switch>
		</view>

		<u-divider>开启后png格式保留但图片质量参数无效</u-divider>

		<view class="cu-bar bg-white ">
			<view class="action">
				选择图片
			</view>
			<view class="action">
				{{imgList.length}}/100
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					<image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<100">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>


		<view class="padding flex flex-direction bg-white top">
			<button class="cu-btn  bg-blue margin-tb-sm lg" :disabled="imgList == ''?true:false" @tap="build()">压缩</button>
			<button class="cu-btn  bg-blue margin-tb-sm lg" v-if="imgsinfo  != ''?true:false" @tap="preview()">预览</button>
			<button class="cu-btn  bg-blue margin-tb-sm lg" v-if="imgsinfo  != ''?true:false" @tap="save()">保存</button>
		</view>
		

	</view>
</template>

<script>
	var _self
	export default {
		onLoad() {
			_self = this
			_self.listDirectory('_doc/temp')
			switch (_self.$store.state.platform) {
				case 'android':
					console.log('运行Android上')
					Vue.prototype.requestAndroidPermission("android.permission.CAMERA")
					break;
				case 'ios':
					Vue.prototype.requestIosPermission("camera", "摄像头")
					Vue.prototype.requestIosPermission("photoLibrary", "相册")
					console.log('运行iOS上')
					break;
				default:
					console.log('运行在开发者工具上')
					break;
			}

		},
		data() {
			return {
				imgList: [],
				index: -1,
				width: 100,
				height: 100,
				png: false,
				quality: 50,
				buttonD: true,
				imgsinfo: [],
				imgs:[],
				saveD: true
			}
		},
		methods: {
			preview(){
				uni.previewImage({
					urls: _self.imgs,
					current: _self.imgs.length
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: _self.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			ChooseImage() {
				uni.chooseImage({
					count: 100, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						if (_self.imgList.length != 0) {
							_self.imgList = _self.imgList.concat(res.tempFilePaths)
						} else {
							_self.imgList = res.tempFilePaths
						}
					}
				});
			},
			DelImg(e) {
				_self.imgList.splice(e.currentTarget.dataset.index, 1)
			},
			save(){
				if(_self.saveD){
					_self.saveD = false
					uni.showLoading({
						title: "保存中"
					})
					var i = 0
								
					for (var value of _self.imgs){
						uni.saveImageToPhotosAlbum({
						   filePath: value,
						   success: function (res) {
							 console.log("保存成功")
							 i = i + 1
							if(i == _self.imgs.length){
								uni.showToast({
									icon: "success",
									title: '保存完毕',
									duration: 2000
								});
								uni.hideLoading()
								_self.saveD = true
							}
						   },fail: (err) => {
							console.log("保存失败")
							console.log(err)
							uni.showToast({
								icon: "none",
								title: '保存失败',
								duration: 2000
							});
							uni.hideLoading()
							_self.saveD = true
						   } 
						 });
					}
				}
				
			},
			build() {
				_self.imgsinfo = []
				_self.imgs = []
				console.log("图片质量" + _self.quality + "宽度" + _self.width + "高度" + _self.height)
				if(_self.buttonD){
					_self.buttonD = false
					if (_self.png) {
						console.log("保留格式")
						var i = 0
						uni.showLoading({
							title: "处理中"
						})
						for (var value of _self.imgList) {
							console.log('_doc/temp/' + _self.$u.guid() + '.' + value.substring(value.lastIndexOf('.') + 1));
							plus.zip.compressImage({
									src: value,
									dst: '_doc/temp/' + _self.$u.guid() + '.' + value.substring(value.lastIndexOf('.') + 1),
									quality: _self.quality,
									width: _self.width + "%",
									height: _self.height + "%"
								},
								function(e) {
									console.log("转换成功")
									console.log(e)
									i = i + 1
									_self.imgsinfo.push(e)
									_self.imgs.push(e.target)
									//_self.removeFile(e.target)
									if (i == _self.imgList.length) {
										uni.showToast({
											icon: "success",
											title: '压缩完毕',
											duration: 2000
										});
										uni.hideLoading()
										_self.buttonD = true
									}
								},
								function(error) {
									console.log("转换失败")
									uni.hideLoading()
									_self.buttonD = true
								});
						}
					} else {
						console.log("不保留格式")
					
						var i = 0
						uni.showLoading({
							title: "处理中"
						})
						for (var value of _self.imgList) {
					
							plus.zip.compressImage({
									src: value,
									dst: '_doc/temp/' + _self.$u.guid() + '.jpg',
									quality: _self.quality,
									width: _self.width + "%",
									height: _self.height + "%",
									format: "jpg"
								},
								function(e) {
									console.log(e);
									console.log("转换成功")
									_self.imgsinfo.push(e)
									_self.imgs.push(e.target)
									i = i + 1
									//_self.removeFile(e.target)
									if (i == _self.imgList.length) {
										uni.showToast({
											icon: "success",
											title: '压缩完毕',
											duration: 2000
										});
										uni.hideLoading()
										_self.buttonD = true
									}
									
								},
								function(error) {
									console.log("转换失败")
									uni.hideLoading()
									_self.buttonD = true
									
								});
						}
					}
				}else{
					
				}
			}
		}
	}
</script>

<style>

</style>
