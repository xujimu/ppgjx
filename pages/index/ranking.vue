<template>
	<view>
		<view class="uni-box">
			<uni-row>
				<uni-col :span="16">
					<view class="title">排行榜</view>
					<view class="self-num">
						<text>您已观看广告次数：</text>
						<text>{{myNum}}</text>
					</view>
				</uni-col>
				<uni-col :span="8">
					<view class="trophy">
					</view>
				</uni-col>
			</uni-row>
		</view>
		<view class="uni-cell">
			<uni-row>
				<uni-col :span="8">
					<view>排名</view>
				</uni-col>
				<uni-col :span="8">
					<view>昵称</view>
				</uni-col>
				<uni-col :span="8">
					<view>观看次数</view>
				</uni-col>
			</uni-row>
			<scroll-view class="scroll-y" @scrolltolower="bott()" scroll-y>
				<view v-for="(item,index) in data" :class="index%2==0?'row-bg':''">
					<uni-row>
						<uni-col :span="8">
							<view :class="getClass(index)">{{index>2?index+1:''}}
							</view>
						</uni-col>
						<uni-col :span="8">
							<view>{{item.name}}</view>
						</uni-col>
						<uni-col :span="8">
							<view>{{item.sum}}次</view>
						</uni-col>
					</uni-row>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				data: [],
				myNum: '未登录', //此处替换为后台获取
			}
		},
		onPullDownRefresh() {
		    console.log('refresh');
			_self.getList(true)
			uni.stopPullDownRefresh();
		},
		onLoad() {
			_self = this
			 
			// _self.getList(true)
		},
		onShow() {
			uni.startPullDownRefresh()
		},
		methods: {
			bott(){
				console.log("触发")
			    _self.getList()
			},
			getClass(index) {
				switch (index) {
					case 0:
						return 'glod'
						break;
					case 1:
						return 'silver'
						break;
					case 2:
						return 'copper'
						break;
					default:
						return ''
				}

			},
			getList(num){
				var sum =  _self.data.length
				if(num){
					sum = 0
				}
				uni.showLoading({
					title: '加载中'
				});
				_self.xhttp.request({
					url: "/user/ad/ranking", //仅为示例，并非真实接口地址。
					method:"POST",
					data: {
						offset: sum
					},
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(res => {
					console.log(res)
					if(res.data.code == 0 ){
						if(num){
							_self.data = res.data.data.list
						}else{
							_self.data = _self.data.concat(res.data.data.list)
						}
						_self.myNum = res.data.data.mySum;
						// _self.shortUrl = res.data.data
					}
					uni.hideLoading(); 
				}).catch(err => {
					uni.hideLoading(); 
				})
			}
			
		}
	}
</script>

<style>
	.uni-box {
		
		width: 100vw;
		height: 25vh;
		background-color: rgb(0, 129, 255);
	}

	.uni-cell {
		
		width: 100vw;
		height: 80vh;
		z-index: 99;
		top: 20vh;
		background-color: #ffffff;
		border-top-left-radius: 50rpx;
		border-top-right-radius: 50rpx;
	}

	.glod:before {
		content: '';
		display: block;
		margin-top: 10rpx;
		margin-left: 70rpx;
		width: 60rpx;
		height: 60rpx;
		background-image: url('../../static/img/ranking/gold.png');
		background-size: 100% 100%;
		float: left;
	}

	.silver:before {
		content: '';
		display: block;
		margin-top: 10rpx;
		margin-left: 70rpx;
		width: 60rpx;
		height: 60rpx;
		background-image: url('../../static/img/ranking/silver.png');
		background-size: 100% 100%;
		float: left;
	}

	.copper:before {
		content: '';
		display: block;
		margin-top: 10rpx;
		margin-left: 70rpx;
		width: 60rpx;
		height: 60rpx;
		background-image: url('../../static/img/ranking/copper.png');
		background-size: 100% 100%;
		float: left;
	} 

	.uni-row {
		width: 80vw;
		margin-left: 10vw !important;
		text-align: center;
		font-size: 28rpx;
		line-height: 6vh;
	}

	.trophy::before {
		content: '';
		display: block;
		margin-top: 10rpx;
		width: 180rpx;
		height: 180rpx;
		background-image: url('../../static/img/ranking/trophy.png');
		background-size: 100% 100%;
		float: left;
	}

	.title {
		font-size: 48rpx;
		color: #FFFFFF;
		letter-spacing: 40rpx;
	}

	.row-bg {
		background-color: #d1c8c840;
	}

	.self-num {
		color: #ffffff;
		font-size: 26rpx;
		text-align: center;
		letter-spacing: 4rpx;
	}

	.scroll-y {
		height: 70vh;
	}
</style>
