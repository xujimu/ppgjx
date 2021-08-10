<template>
	<view class="content">
		<view v-for="item in canvasArr">
			<canvas canvas-id="myCanvas" :style="{width:canvasWidth+'px',height:canvasHeight+'px'}"></canvas>
		</view>
	</view>
</template>

<script>
	export default {
		props: {

		},
		data() {
			return {
				canvasArr: [],
				platformType: 'other',
				canvasWidth: '',
				canvasHeight: '',
				pixelRatio: 1
			};
		},
		mounted() {
			let _this = this;
			// #ifdef H5
			_this.platformType = 'h5';
			// #endif
			wx.getSystemInfo({
				success: function(data) {console.log(data);
					_this.pixelRatio = data.pixelRatio;
				}
			});
		},
		methods: {
			addWaterMark(options) {
				let _this = this;
				if (_this.platformType == 'h5') {
					_this.h5CanvasDraw(options);
				} else {
					_this.otherCanvasReady(options);
				}
			},
			otherCanvasReady(options) {
				let _this = this;
				uni.getImageInfo({
					src: options.url,
					success: function(img) {
						let size = options.maxSize || 0;
						if (options.maxSize) {
							if (img.width > img.height) {
								if (img.width < size) {
									size = img.width / _this.pixelRatio;
								}else{
									size = size / _this.pixelRatio
								}
								_this.canvasWidth = size;
								_this.canvasHeight = img.height / (img.width / size);
							} else {
								if (img.height < size) {
									size = img.height / _this.pixelRatio;
								}else{
									size = size / _this.pixelRatio
								}
								_this.canvasHeight = size;
								_this.canvasWidth = img.width / (img.height / size);
							}
						} else {
							_this.canvasWidth = img.width / _this.pixelRatio
							_this.canvasHeight = img.height / _this.pixelRatio
						}
						_this.canvasArr.splice(0, 1, 1);
						_this.$nextTick(function() {
							_this.otherCanvasDraw(options, img);
						});
					}
				});
			},
			otherCanvasDraw(options, img) {
				let _this = this;
				const ctx = uni.createCanvasContext('myCanvas',_this)
				ctx.drawImage(img.path, 0, 0, _this.canvasWidth, _this.canvasHeight)
				ctx.textAlign = options.textAlign || 'top'
				ctx.textBaseline = options.textBaseline || 'top'
				let imageArr = [];
				let textArr = [];
				options.watermark.some(function(item, index) {
					if (item.type == 'image') {
						imageArr.push(item);
					}
					if (item.type == 'text') {
						textArr.push(item);
					}
				})
				textArr.some(function(item, index) {
					ctx.font = (item.font||'16px') + ' Arial'
					ctx.shadowColor = item.shadowColor||'#000'
					ctx.shadowOffsetX = item.shadowOffsetX||0;
					ctx.shadowOffsetY = item.shadowOffsetY||0;
					ctx.fillStyle = item.fillStyle||'#fff'
					const fontWidth = ctx.measureText(item.content).width / 2; //获取文本宽度
					let rotate = item.rotate||0
					item.x = item.x||0
					item.y = item.y||0
					if(item.isRepeat){
						item.repeatWidth = item.repeatWidth||_this.canvasWidth
						item.repeatHeight = item.repeatHeight||_this.canvasHeight
						item.distanceX = item.distanceX||60
						item.distanceY = item.distanceY||50
						ctx.rotate(-rotate * Math.PI / 180)
						for(let i = item.x; i<item.repeatWidth; i+=item.distanceX) {
							for(let j = item.y; j<item.repeatHeight; j+=item.distanceY) {
							  // 填充文字，x 间距, y 间距
							  console.log(item.x,item.y);
							  ctx.fillText(item.content, i, j)
							}
						}
						ctx.rotate(rotate * Math.PI / 180);
					}else{
						ctx.rotate(-rotate * Math.PI / 180)
						ctx.fillText(item.content, item.x, item.y);
						ctx.rotate(rotate * Math.PI / 180);
					}
				})
				imageArr.some(function(item, index) {
					uni.getImageInfo({
						src: item.path,
						success: function(reimg) {
							let rotate = item.rotate||0
							item.x = item.x||0
							item.y = item.y||0
							item.width = item.width||reimg.width / _this.pixelRatio
							item.height = item.height||reimg.height / _this.pixelRatio
							if(item.isRepeat){
								item.repeatWidth = item.repeatWidth||_this.canvasWidth
								item.repeatHeight = item.repeatHeight||_this.canvasHeight
								item.distanceX = item.distanceX||60
								item.distanceY = item.distanceY||50
								ctx.rotate(-rotate * Math.PI / 180);
								for(let i = item.x; i<item.repeatWidth; i+=item.distanceX) {
									for(let j = item.y; j<item.repeatHeight; j+=item.distanceY) {
									  // 填充文字，x 间距, y 间距
									  console.log(item.x,item.y);
									  ctx.drawImage(reimg.path, i, j, item.width, item.height)
									}
								}
								ctx.rotate(rotate * Math.PI / 180);
							}else{
								ctx.rotate(-rotate * Math.PI / 180)
								ctx.drawImage(reimg.path, item.x, item.y, item.width, item.height)
								ctx.rotate(rotate * Math.PI / 180)
							}
							if (imageArr.length == index + 1) {
								_this.otherGenerateBase64(options, ctx);
							}
						}
					})
				})
			},
			otherGenerateBase64(options, ctx) {
				let _this = this;
				ctx.draw(true, function(ret) {
					uni.canvasToTempFilePath({
						canvasId: 'myCanvas', // canvas id
						quality: options.quality || 1,
						complete(res) {
							const savedFilePath = res.tempFilePath //相对路径
							const path = plus.io.convertLocalFileSystemURL(savedFilePath) //绝对路径
							const fileReader = new plus.io.FileReader()
							fileReader.readAsDataURL(path)
							fileReader.onloadend = (res) => { //读取文件成功完成的回调函数
								_this.$emit("pBackImage",res.target.result);
							}
						}
					})
				})
			},
			h5CanvasDraw(options) {
				let _this = this;
				const img = new Image()
				img.src = options.url
				img.crossOrigin = 'anonymous'
				img.onload = function() {
					const canvas = document.createElement('canvas')
					let size = options.maxSize || 0;
					if (options.maxSize) {
						if (img.width > img.height) {
							if (img.width < size) {
								size = img.width;
							}
							_this.canvasWidth = size;
							_this.canvasHeight = img.height / (img.width / size);
						} else {
							if (img.height < size) {
								size = img.height;
							}
							_this.canvasHeight = size;
							_this.canvasWidth = img.width / (img.height / size);
						}
					} else {
						_this.canvasWidth = img.width
						_this.canvasHeight = img.height
					}
					canvas.width = _this.canvasWidth
					canvas.height = _this.canvasHeight
					const ctx = canvas.getContext('2d')
					ctx.drawImage(img, 0, 0)
					ctx.textAlign = options.textAlign || 'top'
					ctx.textBaseline = options.textBaseline || 'top'

					let imageArr = [];
					let textArr = [];
					options.watermark.some(function(item, index) {
						if (item.type == 'image') {
							imageArr.push(item);
						}
						if (item.type == 'text') {
							textArr.push(item);
						}
					})
					textArr.some(function(item, index) {
						ctx.font = (item.font||'16px') + ' Arial'
						ctx.shadowColor = item.shadowColor||'#000'
						ctx.shadowOffsetX = item.shadowOffsetX||0;
						ctx.shadowOffsetY = item.shadowOffsetY||0;
						ctx.fillStyle = item.fillStyle||'#fff'
						const fontWidth = ctx.measureText(item.content).width / 2; //获取文本宽度
						
						let rotate = item.rotate||0
						item.x = item.x||0
						item.y = item.y||0
						if(item.isRepeat){
							item.repeatWidth = item.repeatWidth||_this.canvasWidth
							item.repeatHeight = item.repeatHeight||_this.canvasHeight
							item.distanceX = item.distanceX||60
							item.distanceY = item.distanceY||50
							ctx.rotate(-rotate * Math.PI / 180)
							for(let i = item.x; i<item.repeatWidth; i+=item.distanceX) {
								for(let j = item.y; j<item.repeatHeight; j+=item.distanceY) {
								  // 填充文字，x 间距, y 间距
								  console.log(item.x,item.y);
								  ctx.fillText(item.content, i, j)
								}
							}
							ctx.rotate(rotate * Math.PI / 180);
						}else{
							ctx.rotate(-rotate * Math.PI / 180)
							ctx.fillText(item.content, item.x, item.y);
							ctx.rotate(rotate * Math.PI / 180);
						}
					})
					imageArr.some(function(item, index) {
						const reimg = new Image()
						reimg.src = item.path
						reimg.crossOrigin = 'anonymous'
						reimg.onload = function() {
							let rotate = item.rotate||0
							item.x = item.x||0
							item.y = item.y||0
							item.width = item.width||reimg.width
							item.height = item.height||reimg.height
							if(item.isRepeat){
								item.repeatWidth = item.repeatWidth||_this.canvasWidth
								item.repeatHeight = item.repeatHeight||_this.canvasHeight
								item.distanceX = item.distanceX||60
								item.distanceY = item.distanceY||50
								ctx.rotate(-rotate * Math.PI / 180);
								for(let i = item.x; i<item.repeatWidth; i+=item.distanceX) {
									for(let j = item.y; j<item.repeatHeight; j+=item.distanceY) {
									  // 填充文字，x 间距, y 间距
									  console.log(item.x,item.y);
									  ctx.drawImage(reimg, i, j, item.width, item.height)
									}
								}
								ctx.rotate(rotate * Math.PI / 180);
							}else{
								ctx.rotate(-rotate * Math.PI / 180)
								ctx.drawImage(reimg, item.x, item.y, item.width, item.height)
								ctx.rotate(rotate * Math.PI / 180)
							}
							if (imageArr.length == index + 1) {
								const base64Url = canvas.toDataURL()
								_this.$emit("pBackImage", base64Url);
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 0;
		height: 0;
		overflow: hidden;
	}
</style>
