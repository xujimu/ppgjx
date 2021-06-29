<template>
	<view>
		<view style="text-align: center;border-radius: 20upx;margin: 60upx 50upx;background-color: #333333;height: 400upx;">
			<text style="font-size: 150upx;color: #EEEEEE;line-height: 400upx;">{{count}}</text>
		</view>
		
		<view style="text-align: center;">
			<button class="noadd" style="display: inline-block;" @click="remove">
				<text  class="cuIcon-move" style="line-height: 150upx;font-size: 70upx;color: #FFFFFF;"></text> 
			</button>
			
			<button class="add" style="display: inline-block;" @click="add">
				<text class="cuIcon-add" style="line-height: 300upx;font-size: 250upx;color: #FFFFFF;"></text>
			</button>
			 
			<button class="noadd" style="display: inline-block;" @click="res">
				<text class="cuIcon-refresh" style="line-height: 150upx;font-size: 70upx;color: #FFFFFF;"></text>  
			</button> 
		</view> 
		
		 
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				count: 0
			}
		},
		methods: {
			add:function(){
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = '/static/music/click.mp3';
				innerAudioContext.play()
				innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				});
				this.count = this.count + 1 
			},
			remove:function(){ 
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src = '/static/music/click.mp3';
				innerAudioContext.play()
				innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				});
				this.count = this.count - 1
			},
			res:function(){
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src = '/static/music/click.mp3';
				innerAudioContext.play()
				innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				});
				this.count = 0
			}
		}
	}
</script>

<style>
	.add{
		  width: 300upx;
		  height: 300upx;
		  background-color:#333333;
		  border-radius: 50%;
		 -moz-border-radius: 50%;
		 -webkit-border-radius: 50%;
		  margin: 0px auto;
		  margin-top: 50upx;
	},
	.noadd{
		  width: 150upx;
		  height: 150upx;
		  background-color:#333333;
		  border-radius: 50%;
		 -moz-border-radius: 50%;
		 -webkit-border-radius: 50%;
		 margin-top: 50upx;
	},
	
	button:active {background-color: #555555}

</style>
