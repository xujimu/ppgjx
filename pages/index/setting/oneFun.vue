<template>
	<view>

		
		<view  class="cu-list menu sm-border" style="margin-top: 0px;margin-bottom: 1px;">
			<view class="cu-item">
				<view class="content ">
					<view><text class="text-blue margin-right-xs"></text>状态</view>
				</view>
				<view class="action">
					<u-switch v-model="oneFun.status" active-color="#39b54a"></u-switch>
				</view>
			</view>
		</view>
		
		<view class="cu-form-group ">
			<view><text class="text-blue margin-right-xs"></text>功能</view>
			<picker @change="change" :value="oneFun.index" :range="$store.state.funlist" range-key="title">
				<view class="picker">
					{{$store.state.funlist[oneFun.index].title}}
				</view> 
			</picker>
		</view>
		 
		 <view class=" padding-xs flex align-center  margin-top">
		 	<view class="flex-sub text-center">
		 		<text class="text-black">使用说明</text>
		 		<view class="padding">开启后下次启动软件直接跳转至指定功能页面</view>
		 	</view>
		 </view>
	</view>
</template>

<script>
	var _self;
	export default {
		watch: {
			oneFun:{ // plan1.0
				handler(newName, oldName) {
					 console.log("触发")
					 uni.setStorageSync('oneFun',newName)
				},
				deep: true
			}
		},
		onLoad() {
			_self = this
			var oneFun = uni.getStorageSync('oneFun')
			if(oneFun){
				_self.oneFun = oneFun
			}
		},
		data() {
			return {
				oneFun: {'status': false,'index':0 ,'path': ''}
			} 
		},
		methods: {
			change(e){
				_self.oneFun.index = e.detail.value
				_self.oneFun.path =  _self.$store.state.funlist[_self.oneFun.index].name
				console.log(_self.oneFun.index)
			},
		}
	}
</script>

<style>

</style>
