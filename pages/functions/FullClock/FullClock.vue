<!-- 
	2021/7/27
	liubin
	820565510@qq.com 
-->
<template>
	<view @tap="quitF()">
		<view class="close cuIcon-close" v-if="quit" @tap="exit()"></view>
		<view class="full">
			<view class="time">{{hour+':'+minute+':'+second}}</view>
		</view>
	</view>
</template>

<script>
	var interval = '';
	export default {
		data() {
			return {
				hour: '',
				minute: '',
				second: '',
				quit: false
			}
		},
		onLoad() {
			this.getTime()
		},
		onUnload() {
			clearInterval(interval);
		},
		methods: {
			getTime() {
				var that = this;
				interval = setInterval(function() {
					var date = new Date();
					var hour = date.getHours(); //获取系统时， 
					var minute = date.getMinutes(); //分 
					var second = date.getSeconds(); //秒
					if (hour < 10) {
						hour = "0" + hour;
					}
					if (minute < 10) {
						minute = "0" + minute;
					}
					if (second < 10) {
						second = "0" + second;
					}
					that.hour = hour;
					that.minute = minute;
					that.second = second;
				}, 500)
			},
			quitF() {
				this.quit = !this.quit;
			},
			exit() {
				plus.navigator.setFullscreen(false)
				clearInterval(interval)
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	.full {
		width: 100vw;
		height: 100vh;
		background-color: #000000;
		color: #FFFFFF;
	}

	.time {
		transform: rotate(90deg);
		font-size: 20vh;
		width: 100vw;
		padding-left: 30vh;
	}

	.close {
		float: left;
		color: #ffffff;
		width: 100%;
		width: 30px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		position: fixed;
		left: 85vw;
		top: 5vh;
		font-size: 30px;
	}
</style>
