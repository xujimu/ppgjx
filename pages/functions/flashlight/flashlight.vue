<template>
	<view>
		<view class="cu-bar bg-white ">
			<view class="action">
				<text class="cuIcon-title text-orange "></text>高频
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @click="start(1)" data-target="Modal">{{index == 1 ? '关闭':'开启'}}</button>
			</view>
		</view>
		<view class="cu-bar bg-white ">
			<view class="action">
				<text class="cuIcon-title text-orange "></text>低频
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow"  @click="start(2)" data-target="Modal">{{index == 2 ? '关闭':'开启'}}</button>
			</view>
		</view>
		<view class="cu-bar bg-white ">
			<view class="action">
				<text class="cuIcon-title text-orange "></text>长亮
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow"  @click="start(3)" data-target="Modal">{{index == 3 ? '关闭':'开启'}}</button>
			</view>
		</view>

		<view class="cu-bar bg-white ">
			<view class="action">
				<text class="cuIcon-title text-orange "></text>每{{speed}}秒
			</view>
			<view class="wrap" style="width: 400rpx;">
				<u-slider min="1"  v-model="speed" ></u-slider>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow"  @click="start(4)" data-target="Modal">{{index == 4 ? '关闭':'开启'}}</button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import torch from "@/components/dc-torch/torch.js"
	var _self;
	var timeId;
	export default {
		onLoad() {
			_self = this
			_self.index = _self.$store.state.vibrateIndex
			_self.speed = _self.$store.state.vibrateSpeed 
		},
		onUnload() {
			_self.$store.state.vibrateIndex = _self.index
			_self.$store.state.vibrateSpeed  = _self.speed 
		},
		data() {
			return {
				index: 0,
				speed: 1
			}
		},
		watch: {
		   speed(){
			   if(_self.index == 4){
				   _self.close()
				   torch.off(); 
				   timeId = setInterval(()=>{
				   	torch.on();
				   	torch.off(); 
				   },_self.speed * 1000);
			   }
		   }
		},
		methods: {
			start(index){
				console.log(index == _self.index)
				if(index == _self.index){
					_self.index = 0
					_self.close()
					torch.off(); 
				}else{
					_self.index = index
					switch (index){
						case 1:
							_self.close()
							console.log("高频")
							 timeId = setInterval(()=>{
								torch.on();
								torch.off(); 
							},150);
							break; 
							console.log("低频")
						case 2:
							_self.close()
						    timeId = setInterval(()=>{
								torch.on();
								torch.off(); 
							},500);
							break;
						case 3:
							_self.close()
							torch.on();
							break;	
						case 4:
							_self.close()
						    timeId = setInterval(()=>{
								torch.on();
								torch.off(); 
							},_self.speed * 1000);
							break;						
					}
				}
			},
			close(){
				clearInterval(timeId);
			}
		}
	}
</script>

<style>

</style>
