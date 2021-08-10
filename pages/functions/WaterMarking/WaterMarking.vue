<template>
	<view>
		<tnWaterMater @pBackImage="backImage" ref="childWaterMater"></tnWaterMater>
		<view class="login-bg">
			<view class="login-btn">
				<button class="btn-class" @click="selectImg">选择图片</button>
				<button class="btn-class" @click="addWaterBase64">加水印转base64</button>
				<text class="page-lable">结果:</text>
				<view class="img-box">
					<img :src="item" v-for="item in photoData">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tnWaterMater from '../../../components/tn-waterMark/index.vue'
	export default {
		components:{
			tnWaterMater
		},
		data() {
			return {
				photoData: ''
			}
		},
		onLoad() {
			
		},
		methods: {
			backImage(data){
				console.log(data.length);
				this.photoData.push(data);
			},
			addWaterBase64(){
				let _this = this;
				let model = {};
				model.url = _this.photoData[0];
				// model.maxSize = 100;
				model.watermark = [
					{
						type: 'image',
						path: '/static/img/2048.jpg',
						x: 0,
						y: 0,
						width: 20,
						height: 20,
						rotate: 0,
						textAlign: 'top',
						textBaseline: 'top',
						repeatWidth: 1500,
						repeatHeight: 2000,
						isRepeat: true
					},
					{
						type: 'text',
						fillStyle: 'rgba(250, 250, 250, 1)',
						content: '我是水印哈哈哈',
						font: '6px',
						x: 0,
						y: 0,
						shadowColor: 'rgba(0, 0, 0, 1)',
						shadowOffsetX: 2,
						shadowOffsetY: 2,
						rotate: 0,
						repeatWidth: 1500,
						repeatHeight: 2000,
						isRepeat: true
					}
				];
				this.$refs.childWaterMater.addWaterMark(model);
			},
			selectImg(){
				let _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						let type = '';
						// #ifdef H5
						type = 'h5';
						// #endif
						if(type == 'h5'){
							_this.photoData = res.tempFilePaths;
						}else{
							_this.photoData = [plus.io.convertLocalFileSystemURL(res.tempFilePaths[0])]
						}
					},
					fail(res) {
						
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: linear-gradient(to bottom, rgb(249, 249, 249) 0%, rgb(247, 246, 246) 100%);
	}
	
	.login-btn {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.btn-class {
		margin-top: 20px;
		width: 90vw;
		font-size: 14px;
		color: rgb(80, 80, 80);
		padding: 5px;
		background-color: #fff;
	}
	.page-lable{
		width: 90vw;
		padding: 10px 0;
		color: rgb(60,60,60)
	}
	.img-box{
		width: 90vw;
		min-height: 60vh;
		border-radius: 5px;
		text-align: center;
		border: 1px solid rgb(220, 220, 220);
		background-color: #fff;
		padding: 10px 0;
	}
	.img-box img{
		max-width: 100%;
		margin: 10px 0;
	}
</style>