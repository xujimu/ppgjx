<template>
	<view>
		<view class="uni-box">
			<!-- <uni-row>
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
			</uni-row> -->
			<view class="change" @click="change()">{{changeFlag==0?'本周':'上周'}}</view>
			<view class="prize" @click="prize()">
				<image style="width: 100%;height: 100%;" src="../../static/img/ranking/prize.png"></image>
			</view>
			<uni-row>
				<uni-col :span="8">
					<view style="width: 100%;float: left;">
						<view class="crown" style="margin-top: 54rpx;">
							<image style="width: 100%;height: 100%;" src="../../static/img/ranking/greater.png"></image>
						</view>
					</view>
					<view class="s rank-top">
						<image style="width: 100%;height: 100%;border-radius: 50%;" :src="topData[1].pic"></image>
					</view>
					<view style="width: 100%;float: left;">
						<view class="crown-name">
							<text>{{topData[1].name}}</text>
						</view>
					</view>
				</uni-col>
				<uni-col :span="8">
					<view style="width: 100%;float: left;">
						<view class="crown">
							<image style="width: 100%;height: 100%;" src="../../static/img/ranking/crown.png"></image>
						</view>
					</view>
					<view class="f rank-top">
						<image style="width: 100%;height: 100%;border-radius: 50%;" :src="topData[0].pic"></image>
					</view>
					<view style="width: 100%;float: left;">
						<view class="crown-name">
							<text>{{topData[0].name}}</text>
						</view>
					</view>
				</uni-col>
				<uni-col :span="8">
					<view style="width: 100%;float: left;">
						<view class="crown" style="margin-top: 54rpx;">
							<image style="width: 100%;height: 100%;" src="../../static/img/ranking/TongGuan.png">
							</image>
						</view>
					</view>
					<view class="t rank-top">
						<image style="width: 100%;height: 100%;border-radius: 50%;" :src="topData[2].pic"></image>
					</view>
					<view style="width: 100%;float: left;">
						<view class="crown-name">
							<text>{{topData[2].name}}</text>
						</view>
					</view>
				</uni-col>
			</uni-row>
			<view class="self-num">
				<text>您已观看广告次数：</text>
				<text>{{myNum}}</text>
			</view>
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
				<view v-for="(item,index) in data" :key="index" :class="index%2==0?'row-bg':''">
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
		<uni-popup ref="popup" type="bottom">
			<view class="c-box">
				<view v-for="(item,index) in prizeData" :key="index" :class="index%2==0?'row-bg':''">
					<uni-row style="margin-left: 0 !important;">
						<uni-col :span="8">
							<view :class="getClass(index)">{{index>2?index+1:''}}
							</view>
						</uni-col>
						<uni-col :span="8">
							<view>{{item.name}}</view>
						</uni-col>
						<uni-col :span="8">
							<view>{{item.prize}}</view>
						</uni-col>
					</uni-row>
				</view>
				<view class="tip">注：作弊手段不发放奖励</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				data: [],
				myNum: '未登录', //此处替换为后台获取
				prizeData: [{ //前三奖品
						name: "p1",
						prize: '皮皮虾T恤'
					},
					{
						name: "p2",
						prize: '20元现金'
					},
					{
						name: "p3",
						prize: '10元现金'
					}
				],
				topData:[//本周/上周前三用户
					{
						name: "p2",
						pic: '../../static/images/pictureProduction/zbtx.jpg'
					},
					{
						name: "p2",
						pic: '../../static/images/pictureProduction/zbtx.jpg'
					},
					{
						name: "p2",
						pic: '../../static/images/pictureProduction/zbtx.jpg'
					}
				],
				changeFlag:1
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
			bott() {
				console.log("触发")
				_self.getList()
			},
			change(){
				_self.changeFlag==1?_self.changeFlag=0:_self.changeFlag=1;
				//切换本周和上周前三数据
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
			getList(num) {
				var sum = _self.data.length
				if (num) {
					sum = 0
				}
				return;
				uni.showLoading({
					title: '加载中'
				});
				_self.xhttp.request({
					url: "/user/ad/ranking", //仅为示例，并非真实接口地址。
					method: "POST",
					data: {
						offset: sum
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					console.log(res)
					if (res.data.code == 0) {
						if (num) {
							_self.data = res.data.data.list
						} else {
							_self.data = _self.data.concat(res.data.data.list)
						}
						_self.myNum = res.data.data.mySum;
						// _self.shortUrl = res.data.data
					}
					uni.hideLoading();
				}).catch(err => {
					uni.hideLoading();
				})
			},

			prize() {
				_self.$refs.popup.open('center');
			}

		},
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

	.rank-top {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.f,
	.s,
	.t {
		margin: 0 auto;
		text-align: center;
		margin-top: 40rpx;
		border-radius: 50%;
	}

	.s,
	.t {
		margin-top: 100rpx;
	}

	.crown {
		width: 60rpx;
		height: 60rpx;
		margin: 0 auto;
		position: absolute;
		margin-left: 10vw;
	}

	.crown-name {
		margin-top: -20rpx;
		color: #FFFFFF;
	}

	.prize {
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		right: 20rpx;
		margin-top: 20rpx;
	}

	.c-box {
		background-color: #FFFFFF;
		width: 90vw;
		height: 400rpx;
		border-radius: 40rpx;
	}

	.tip {
		margin-left: 10vw;
		margin-top: 20rpx;
		color: red;
		font-weight: bold;
		font-size: 12px;
		letter-spacing: 3px;
	}
	.change{
		width: 40px;
		height: 20px;
		background-color:#D9534F;
		color: #FFFFFF;
		position: absolute;
		margin-left: 20rpx;
		margin-top: 20rpx;
		border-radius: 5px;
		text-align: center;
		line-height: 20px;
	}
</style>
