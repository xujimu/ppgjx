<template>
	<view>
		<view class="cu-bar bg-white ">
			<view class="action">
				<text class="cuIcon-title text-orange "></text>高频振动
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @click="start(1)" data-target="Modal">{{index == 1 ? '关闭':'开启'}}</button>
			</view>
		</view>
		<view class="cu-bar bg-white ">
			<view class="action">
				<text class="cuIcon-title text-orange "></text>低频振动
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow"  @click="start(2)" data-target="Modal">{{index == 2 ? '关闭':'开启'}}</button>
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
				<button class="cu-btn bg-green shadow"  @click="start(3)" data-target="Modal">{{index == 3 ? '关闭':'开启'}}</button>
			</view>
		</view>
		
		<view class=" padding-xs flex align-center margin-top">
			<view class="flex-sub text-center">
				<view class=" text-df ">温馨提示</view>
				<view class="padding">手机需要设置打开
				<br/>
				 响铃时震动 或 静音时振动 否则无法振动
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	var _self;
	var timeId;
	export default {
		onLoad() {
			_self = this
			console.log("加载")
			_self.index = _self.$store.state.flashlightIndex
			_self.speed = _self.$store.state.flashlightSpeen 
		},
		watch: {
		   speed(){
			   if(_self.index == 3){
				   _self.close() 
				   timeId = setInterval(()=>{
				   	uni.vibrateLong({
				   		success: function () {
				   			console.log('success');
				   		}
				   	});
				   },_self.speed * 1000);
			   }
		   }
		},
		onUnload() {
			console.log("卸载")
			_self.$store.state.flashlightIndex = _self.index
			_self.$store.state.flashlightSpeen = _self.speed
		},
		data() {
			return {
				index: 0,
				speed: 1
			}
		},
		methods: {
			start(index){
				if(index == _self.index){
					_self.index = 0
					_self.close()
				}else{
					_self.index = index
					switch (index){
						case 1:
							_self.close()
							console.log("高频")
							 timeId = setInterval(()=>{
								uni.vibrateLong({
									success: function () {
										console.log('success');
									}
								});
							},200);
							break; 
						case 2:
							_self.close()
							 timeId = setInterval(()=>{
								uni.vibrateLong({
									success: function () {
										console.log('success');
									}
								});
							},500);
							break;
						case 3:
							_self.close()
							timeId = setInterval(()=>{
								uni.vibrateLong({
									success: function () {
										console.log('success');
									}
								});
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
