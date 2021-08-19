<!-- 
	2021/8/20
	WIsh
	i@itsse.cn
-->
<template>
	<view class="imgdata">
		<u-button @click="getImage" class="btn" type="default">选择图片</u-button>
		<view class="pvw">
			<image class="image" ref="img" :src="imageUrl" mode="aspectFit"></image>
		</view>
		<view class="main" v-if="show">
			<view class="main-title">
				-图片信息-
			</view>
			<view class="main-item">
				<view class="main-text">
					名称: {{imgData.name}}
				</view>
				<view class="main-text">
					大小: {{imgData.size.toFixed(1)}} MB
				</view>
			</view>
			<view class="main-item">
				<view class="main-text">
					专辑:
				</view>
				<view class="main-text">
					制造商: {{imgData.phone}}
				</view>
				<view class="main-text">
					型号: {{imgData.phoneModel}}
				</view>
			</view>
			<view class="main-item">
				<view class="main-text">
					位置信息:
				</view>
				<view class="main-text">
					X: {{imgData.location.x}}
				</view>
				<view class="main-text">
					Y: {{imgData.location.y}}
				</view>
				<view class="main-text">
					{{imgData.location.name}}
				</view>
			</view>
			<view class="main-item">
				<view class="main-text">
					宽 x 高: {{imgData.width}} x {{imgData.height}}
				</view>
			</view>
			<view class="main-item">
				<view class="main-text">
					拍摄时间: {{imgData.ctime}}
				</view>
			</view>
		</view>
		<view class="tips">
			该工具没有上传图片功能
		</view>
		<view v-if="loading" class="loading">
			<u-loading mode="flower"></u-loading>
		</view>
	</view>
</template>

<script>
	import EXIF from 'exif-js'
	export default {
		data() {
			return {
				show: false,
				loading: false,
				imageUrl: "",
				isUpImg: false,
				imgData: {
					width: "",
					height: "",
					name: "", // 名称
					size: "", // 大小
					trifle: "", // 尺寸
					phone: "", // 手机
					phoneModel: "", // 手机型号
					ctime: "", // 创建时间
					location: { //位置信息
						name: "", // 位置
						x: "",
						y: ""
					}
				}
			}
		},
		methods: {
			// 选择图片
			getImage() {
				let _this = this;
				// 二次上传EXIF获取图片消息出现错误, 先刷新页面,后期在更新
				if (this.isUpImg) {
					location.reload()
					return;
				}
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						_this.loading = true;
						_this.imageUrl = res.tempFilePaths[0];
						_this.imgData.name = res.tempFiles[0].name;
						_this.imgData.size = res.tempFiles[0].size / 1000 / 1000;
						_this.isUpImg = true;
						setTimeout(() => {
							_this.getImgLocation()
						}, 3000)
					}
				});
			},
			// 获取图片信息
			getImgLocation() {
				let _this = this
				// console.log(_this.$refs.img)
				EXIF.getData(_this.$refs.img, function() {
					//图片包含的所有信息(例：拍照方向、相机设备型号、拍摄时间、ISO 感光度、GPS 地理位置等数据。)
					let imgAllInfo = EXIF.getAllTags(this);
					// console.log(imgAllInfo)
					// 创建时间
					_this.imgData.ctime = imgAllInfo.DateTime;
					// 手机
					_this.imgData.phone = imgAllInfo.Make;
					// 手机型号
					_this.imgData.phoneModel = imgAllInfo.Model;
					// 宽
					_this.imgData.width = imgAllInfo.PixelYDimension;
					// 高
					_this.imgData.height = imgAllInfo.PixelXDimension;
					let imgLon = EXIF.getTag(this, 'GPSLongitude')
					let imgLat = EXIF.getTag(this, 'GPSLatitude')

					if (imgLon && imgLat) {
						//计算出经纬度并保留6为小数
						const lon = (imgLon[0] + imgLon[1] / 60 + imgLon[2] / 60 / 60).toFixed(6)
						const lat = (imgLat[0] + imgLat[1] / 60 + imgLat[2] / 60 / 60).toFixed(6)
						//使用高德地图的逆地理编码，key申请类型为Web API服务
						_this.imgData.location.y = lat
						_this.imgData.location.x = lon
						_this.xhttp.request({
							url: "/functions/ImageLocation/get", //仅为示例，并非真实接口地址。
							method: "POST",
							data: {
								location: `${lon},${lat}`
							},
							header: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						}).then(res => {
							if (res.data.code == 0) {
								_this.imgData.location.name = res.data.data.regeocode.formatted_address;
								_this.loading = false;
								_this.show = true;
								uni.showToast({
									title: '获取成功!',
									duration: 1000,
									icon: "none"
								})
							} else {
								uni.showToast({
									title: '系统异常',
									duration: 1000,
									icon: "none"
								})
							}
							uni.hideLoading();
						}).catch(err => {
							uni.hideLoading();
						})
					} else {
						_this.loading = false;
						_this.show = true;
						uni.showToast({
							title: '暂未获得该图片地址',
							duration: 1000,
							icon: "none"
						})
						console.log('暂未获得该图片地址')
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.tips {
		text-align: center;
		color: #ccc;
	}

	.loading {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .4);
		display: grid;
		place-items: center;
	}

	.image {
		margin: 20px 0;

	}

	.pvw {
		text-align: center;
	}

	.imgdata {
		background: #fff;
		height: calc(100vh - 44px);
		padding: 0 10rpx;
		padding-top: 20px;
	}

	.main {
		padding: 35rpx 50rpx;
		background: #fff;
		border-radius: 26.66rpx;
		box-shadow: 0px 4px 23px 0px rgba(86, 168, 210, 0.28);
	}

	.main-title {
		font-size: 18px;
	}

	.main-item {
		margin-top: 20px;
		font-size: 16px;
	}

	.main-text {
		margin-top: 2px;
	}
</style>
