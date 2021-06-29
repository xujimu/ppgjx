<template>
	<view>
		<view style="background-color: #FFFFFF;height: 80upx;"></view> 
		<view   class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" @click="skip()">
		<!-- <view   class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" > -->
			<view class="u-m-r-10">
				<u-avatar :src="$store.state.user ? $store.state.user.icon:'../../static/images/logo.jpg'" style="margin-right: 20upx;" mode="square" size="110"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view  class="u-font-18 u-p-b-20">{{$store.state.user ? $store.state.user.name:'未登录'}}</view>
				<view class="u-font-14 u-tips-color">皮皮号:{{$store.state.user ? $store.state.user.account:''}}</view> 
				<!-- <view  class="u-font-18 u-p-b-20">皮皮工具箱</view>
				<view class="u-font-14 u-tips-color">一分耕耘 一分收获</view> -->
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view> 
		
		<view class="u-m-t-18" >
			<u-cell-group>
				<u-cell-item icon="gift" title="期望功能"  @click="navto('/pages/index/function')"></u-cell-item>
				<u-cell-item  icon="order" title="BUG反馈" @click="navto('/pages/index/feedback')"></u-cell-item>
				<u-cell-item icon="thumb-up" title="App Store评分" @click="appStore()" v-if="ios"></u-cell-item>
				 <u-cell-item  icon="setting" title="设置" @click="navto('/pages/index/setting/setting')"></u-cell-item>
			</u-cell-group>
		</view>
		
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				ios: false
			}
		},
		onLoad() {
			_self = this
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					break;
				case 'ios':
				     _self.ios = true
					console.log('运行iOS上')
					break;
				default:
					console.log('运行在开发者工具上')
					break;
			}
		},
		onShow() {  

		},
		methods: {
			skip:function(){
				if(_self.$store.state.user == null){
					_self.navto('/pages/index/login')
				}else{
					_self.navto('/pages/index/user')
					console.log("已登录") 
				}
			},
			appStore(){
				let appleId=1540607796 //app的appleId
				
				plus.runtime.launchApplication({
					action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
				}, function(e) {
					console.log('Open system default browser failed: ' + e.message);
				});
				 
				
			}
		}
	}
</script>

<style lang="scss">
	
page{
	background-color: #ededed;
}
.user-box{
	background-color: #fff;
}
</style>
