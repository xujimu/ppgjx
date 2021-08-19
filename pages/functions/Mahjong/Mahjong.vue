<template>
	<view class="content">
		<view class="tag_f">
			<picker @change="bindPickerChange1" :value="index1" :range="array">
				<view class="uni-input">{{array[index1]}}</view>
			</picker>
		</view>
		<view class="tag_box">
			<view class="tag_s">
				<picker @change="bindPickerChange2" :value="index2" :range="array">
					<view class="uni-input">{{array[index2]}}</view>
				</picker>
			</view>
			<view class="tag_t">
				<picker @change="bindPickerChange3" :value="index3" :range="array">
					<view class="uni-input">{{array[index3]}}</view>
				</picker>
			</view>
		</view>
		<view class="clear"></view>
		<view class="tag_four">
			<picker @change="bindPickerChange4" :value="index4" :range="array">
				<view class="uni-input">{{array[index4]}}</view>
			</picker>
		</view>
		<view class="padding flex flex-direction bg-white top">
		<button class="cu-btn  bg-blue margin-tb-sm lg" @tap="reset">清空</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: ['万', '筒', '条'],
				index1: '',
				index2: '',
				index3: '',
				index4: ''
			}
		},
		onLoad() {
			let self=this;
			uni.getStorage({
			    key: 'index1',
			    success: function (res) {
			       self.index1=res.data;
			    }
			});
			uni.getStorage({
			    key: 'index2',
			    success: function (res) {
			        self.index2=res.data;
			    }
			});
			uni.getStorage({
			    key: 'index3',
			    success: function (res) {
			        self.index3=res.data;
			    }
			});
			uni.getStorage({
			    key: 'index4',
			    success: function (res) {
			       self.index4=res.data;
			    }
			});
		},
		methods: {
			bindPickerChange1(e) {
				let seif=this;
				seif.index1 = e.target.value;
				uni.setStorage({
				    key: 'index1',
				    data: seif.index1,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			bindPickerChange2(e) {
				let seif=this;
				seif.index2 = e.target.value;
				uni.setStorage({
				    key: 'index2',
				    data: seif.index2,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			bindPickerChange3(e) {
				let seif=this;
				seif.index3 = e.target.value;
				uni.setStorage({
				    key: 'index3',
				    data: seif.index3,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			bindPickerChange4(e) {
				let seif=this;
				seif.index4 = e.target.value;
				uni.setStorage({
				    key: 'index4',
				    data: seif.index4,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			reset(){
				this.index1= '';
				this.index2= '';
				this.index3= '';
				this.index4= '';
				uni.removeStorage({
				    key: 'index1',
				    success: function (res) {
				        console.log('success');
				    }
				});
				uni.removeStorage({
				    key: 'index2',
				    success: function (res) {
				        console.log('success');
				    }
				});
				uni.removeStorage({
				    key: 'index3',
				    success: function (res) {
				        console.log('success');
				    }
				});
				uni.removeStorage({
				    key: 'index4',
				    success: function (res) {
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
	uni-picker{
		width: 100%;
		height: 100%;
	}
	.padding{
		margin-top: 40rpx;
	}
	.bg-white {
	    background-color:transparent;
	}
</style>
