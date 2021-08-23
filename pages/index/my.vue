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
				<u-cell-item  icon="github-circle-fill" title="开发者协作计划" @click="navto('/pages/index/github')"></u-cell-item>
				<u-cell-item  icon="server-man" title="观看广告支持作者" @click="showAd()"></u-cell-item>
			</u-cell-group>
		</view>
		
	</view>
</template>

<script>
	
	import AD from "../../static/js/ad.js"
	
	var _self;
	var rewardedVideoAd;
	export default {
		data() {
			return {
				ios: false
			}
		},
		onReady() {
			 //  rewardedVideoAd = uni.createRewardedVideoAd({ adpid: '1507000689' }) // 仅用于HBuilder基座调试 adpid: '1507000689'
			 //  rewardedVideoAd.onLoad(() => {
				// console.log('onLoad event')
				// // 当激励视频被关闭时，默认预载下一条数据，加载完成时仍然触发 `onLoad` 事件
			 //  })
			 //  rewardedVideoAd.onError((err) => {
				// console.log('onError event', err)
			 //  })
			 //  rewardedVideoAd.onClose((res) => {
				// console.log('onClose event', res)
			 //  })
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
			// if(_self.$store.state.user){
			// 	_self.xhttp.request({
			// 		url: "/user/user/v1/updateUserInfo", //仅为示例，并非真实接口地址。
			// 		header:{
			// 			'Content-Type':'application/x-www-form-urlencoded'
			// 		}
			// 	}).then(res => {
			// 		console.log(res)
			// 		if(res.data.code == 0){
			// 			uni.setStorageSync('user', res.data.data);
			// 			_self.$store.state.user = res.data.data 
			// 		}
					 
			// 	}).catch(err => {
					
			// 	})
			// }
		}, 
		methods: { 
			showAd(){
				
				if(_self.$store.state.user){
					var userId = _self.$store.state.user.user_id
					// 调用后会显示 loading 界面
					AD.show({
					  adpid: '', // HBuilder 基座测试广告位
					  adType: "RewardedVideo",
					  urlCallback: {  
						 userId: userId + ""
					  } 
					}, (res) => {
					  // 用户点击了【关闭广告】按钮
					  if (res && res.isEnded) {
						  console.log(res)
						  plus.nativeUI.toast("感谢您的支持");
						 console.log("onClose " + res.isEnded);
					  } else {
						   plus.nativeUI.toast("广告中途退出,本次观看广告将不会计入排行榜");
						// 播放中途退出
						console.log("onClose " + res.isEnded);
					  }
					}, (err) => {
					  // 广告加载错误
					  console.log(err)
					  if(err.code == -5005){
						  plus.nativeUI.toast("今日广告次数已到上限,请明天再来吧");
					  }else{
						  plus.nativeUI.toast("广告加载失败");
					  }
					})
				}else{
					plus.nativeUI.alert('请先登录', function(){
						}, "提示", "好的");
						uni.switchTab({
							url: '/pages/index/my'
						});
				}
				
				
			},
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
