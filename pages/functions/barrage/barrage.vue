<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		<view class="cu-bar bg-white" >
			<view class='action' >
				<text class='cuIcon-title text-blue' ></text>弹幕文字
			</view>
		</view>
		<view class="cu-form-group align-start top" >
			<view class="title"></view>
			<textarea v-model="data.text[0]" placeholder="请输入弹幕"></textarea>
		</view>
		
		<view class="cu-form-group">
			<view class="title">背景颜色</view>
			<u-checkbox v-model="data.bgchecked">随机</u-checkbox>
			<button class='cu-btn bg-green shadow' @click="open('bgcolor')" :style="{backgroundColor: data.bgcolor}"></button>
		</view>
		
		<view class="cu-form-group">
			<view class="title">弹幕颜色</view>
			<u-checkbox v-model="data.dmchecked">随机</u-checkbox>
			<button class='cu-btn bg-green shadow ' @click="open('dmcolor')" :style="{backgroundColor: data.dmcolor}"></button>
		</view>
		
		
		<view class="cu-form-group ">
			<view class="title">弹幕大小: {{data.size}}</view>
			<view class="wrap" style="width: 200px;">
				<u-slider v-model="data.size" ></u-slider>
			</view>
		</view>
		
		<view class="cu-form-group ">
			<view class="title">滚动速度: {{data.speed}}</view>
			<view class="wrap" style="width: 200px;">
				<u-slider v-model="data.speed" ></u-slider>
			</view>
		</view>
		
		<view class="cu-form-group ">
			<view class="title">禁止滚动</view>
			<view class="wrap" >
				<u-switch v-model="data.roll" active-color="#0081ff"></u-switch>
			</view>
		</view>
		

		
		<view class="cu-form-group " v-if="data.bgchecked">
			<view class="title">背景变换速度: {{data.bgspeed}}</view>
			<view class="wrap" style="width: 200px;">
				<u-slider v-model="data.bgspeed" ></u-slider>
			</view>
		</view>
		
		<view class="cu-form-group "  v-if="data.dmchecked">
			<view class="title">弹幕变换速度: {{data.dmspeed}}</view>
			<view class="wrap" style="width: 200px;">
				<u-slider v-model="data.dmspeed" ></u-slider>
			</view>
		</view>
					
		<view class="padding flex flex-direction bg-white top">
			<button class="cu-btn  bg-blue margin-tb-sm lg" @click="start">开启</button>
		</view>
		<t-color-picker ref="colorPicker" :color="color" @confirm="confirm"></t-color-picker>
	</view>

</template>

<script>
	var _self
	import tColorPicker from '@/components/t-color-picker/t-color-picker.vue'
	
	export default {
		onLoad() {
			_self = this
		},
		components: {
		    tColorPicker
		},
		onShow() {
			plus.navigator.setFullscreen(false);
		},
		data() {
			return {
				index: '',
				color:{r: 255,g: 0,b: 0,a: 1},
				data:{
					text:['皮皮工具箱'],
					bgcolor:"rgb(255,255,255)",
					dmcolor:"rgb(0,0,0)",
					speed: 50,
					bgchecked:false,
					dmchecked:false,
					bgspeed:50,
					dmspeed:50,
					size:50,
					roll: false
				},
				
			}
		},
		methods: {
			open(item) {
				_self.index = item
			    // 打开颜色选择器
			    _self.$refs.colorPicker.open();
			}, 
			confirm(e){
				var data = e.rgba 
				console.log("选择" + _self.index)
				_self.data[`${_self.index}`] = "rgb(" + data.r + "," + data.g + "," + data.b + ")"
				
				
			},
			start(e){ 
				_self.navto('/pages/functions/barrage/start?data=' + JSON.stringify(_self.data));
			}
		}
	}
</script>

<style scoped lang="scss">

.top{
	margin-top: 2rpx;
}

button{
	border-radius: 0;
}


</style>