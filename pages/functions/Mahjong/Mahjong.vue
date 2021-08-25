<template>
	<view class="content">
		<view class="tag_f" @click="open(0)">
			<view class="uni-input">{{array[index1]}}</view>
		</view>
		<view class="tag_box">
			<view class="tag_s" @click="open(1)">
				<view class="uni-input">{{array[index2]}}</view>
			</view>
			<view class="tag_t" @click="open(2)">
				<view class="uni-input">{{array[index3]}}</view>
			</view>
		</view>
		<view class="clear"></view>
		<view class="tag_four" @click="open(3)">
			<view class="uni-input">{{array[index4]}}</view>
		</view>
		<view class="padding flex flex-direction bg-white top">
			<button class="cu-btn  bg-blue margin-tb-sm lg" @tap="reset">清空</button>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="c-box">
				<view @click="choose(0)" class="choose">萬</view>
				<view @click="choose(1)" class="choose">筒</view>
				<view @click="choose(2)" class="choose">条</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: ['萬', '筒', '条'],
				index1: '',
				index2: '',
				index3: '',
				index4: '',
				chooseIndex:''
			}
		},
		onLoad() {
			let self = this;
			uni.getStorage({
				key: 'index1',
				success: function(res) {
					self.index1 = res.data;
				}
			});
			uni.getStorage({
				key: 'index2',
				success: function(res) {
					self.index2 = res.data;
				}
			});
			uni.getStorage({
				key: 'index3',
				success: function(res) {
					self.index3 = res.data;
				}
			});
			uni.getStorage({
				key: 'index4',
				success: function(res) {
					self.index4 = res.data;
				}
			});
		},
		methods: {
			open(index) {
				this.chooseIndex=index;
				this.$refs.popup.open('center');
			},
			choose(index){
				let seif = this;
				var key="index"+(seif.chooseIndex+1);
				console.log(key)
				seif[key]=index;
				uni.setStorage({
					key: key,
					data: index,
					success: function() {
						console.log('success');
						seif.$refs.popup.close();
					}
				});
			},
			reset() {
				this.index1 = '';
				this.index2 = '';
				this.index3 = '';
				this.index4 = '';
				uni.removeStorage({
					key: 'index1',
					success: function(res) {
						console.log('success');
					}
				});
				uni.removeStorage({
					key: 'index2',
					success: function(res) {
						console.log('success');
					}
				});
				uni.removeStorage({
					key: 'index3',
					success: function(res) {
						console.log('success');
					}
				});
				uni.removeStorage({
					key: 'index4',
					success: function(res) {
						console.log('success');
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		margin-top: 20vh;
	}

	.tag_f {
		width: 30vw;
		height: 140rpx;
		font-size: 24px;
		font-weight: bold;
		background-color: #007AFF;
		text-align: center;
		line-height: 140rpx;
		color: #FFFFFF;
		margin-left: 35vw;
		margin-top: 20rpx;
	}

	.tag_box {
		width: 100vw;
	}

	.tag_s {
		width: 30vw;
		height: 140rpx;
		font-size: 24px;
		font-weight: bold;
		background-color: #007AFF;
		text-align: center;
		line-height: 140rpx;
		color: #FFFFFF;
		margin-left: 10vw;
		margin-top: 40rpx;
		float: left;
	}

	.tag_t {
		width: 30vw;
		height: 140rpx;
		font-size: 24px;
		font-weight: bold;
		background-color: #007AFF;
		text-align: center;
		line-height: 140rpx;
		color: #FFFFFF;
		margin-left: 20vw;
		margin-top: 40rpx;
		float: left;
	}

	.clear {
		clear: both;
	}

	.tag_four {
		width: 30vw;
		height: 140rpx;
		font-size: 24px;
		font-weight: bold;
		background-color: #007AFF;
		text-align: center;
		line-height: 140rpx;
		color: #FFFFFF;
		margin-left: 35vw;
		margin-top: 40rpx;
	}

	uni-picker {
		width: 100%;
		height: 100%;
	}

	.padding {
		margin-top: 40rpx;
	}

	.bg-white {
		background-color: transparent;
	}

	.choose {
		float: left;
		width: 100rpx;
		height: 100rpx;
		background-color: #007AFF;
		font-size: 20px;
		margin-left: 60rpx;
		text-align: center;
		line-height: 100rpx;
		margin-top: 150rpx;
		color: #FFFFFF;
	}

	.c-box {
		background-color: #FFFFFF;
		width: 70vw;
		height: 400rpx;
		/* margin-top: 30vh; */
		/* margin-left: 15vw; */
		border-radius: 40rpx;
	}
</style>
