<template>
	<view>
		<u-tag v-if="isShow"  style="width: 100%;text-align: center;"  text="您未开启通知 即使打开在线状态 也不会在列表中看到您"   type="warning" ></u-tag>
		<u-tag v-if="onlineStatus"  style="width: 100%;text-align: center;"  text="您的在线状态未打开 将不会在列表中看到您"   type="warning" ></u-tag>
		<view class="cu-list menu-avatar">
			<view class="cu-item " v-for="(item,index) in list" @click="send(index)">
				<view class="cu-avatar radius lg" :style="{'background-image':'url(' + list[index].icon + ')'}"></view>
				<view class="content">
					<view class="text-black">
						<view class="text-cut">{{list[index].name}}</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">皮皮号:{{list[index].account}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self
	import permision from "@/components/wa-permission/permission.js"
	export default {
		components: {

		},
		onNavigationBarButtonTap(e) {
			_self.navto("/pages/functions/TakeAshot/setting")
		},
		onLoad() {
			_self = this

			switch (_self.$store.state.platform) {
				case 'android':
					console.log('运行Android上')
					// Vue.prototype.requestAndroidPermission("android.permission.CAMERA","相机")
					_self.code("安卓暂未统一推送,暂时无法使用该功能", true)
					break;
				case 'ios':
					Vue.prototype.requestIosPermission("push", "通知")
					console.log('运行iOS上')
					break;
				default:
					console.log('运行在开发者工具上')
					break;
			}
			
		},
		onReachBottom() {
			uni.showLoading({
				title: '加载中'
			});
			_self.xhttp.request({
				url: "/functions/TakeAShot/v1/getOnline", //仅为示例，并非真实接口地址。
				method: "POST",
				data: {
					offset: _self.list.length
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(res => {
				console.log(res)
				if(res.data.code == 0){
					_self.list = _self.list.concat(res.data.data.list)
					_self.onlineStatus = res.data.data.take.status == '1' ? false : true
				}
			
				uni.hideLoading();
			}).catch(err => {
				uni.hideLoading();
			})
		},
		onPullDownRefresh() {
			_self.init()
		},
		onShow() {
			_self.init(true)
			_self.isShow = 0
			//判断是否开启通知
			switch (_self.$store.state.platform) {
				case 'android':	
					break;
				case 'ios':
					if(permision.judgeIosPermission("push") === 2){
						_self.isShow = true
					}else{
						_self.isShow = false
					}
					console.log('运行iOS上')
					break;
				default:
					console.log('运行在开发者工具上')
					break;
			}
		},
		onUnload() {


		},
		watch: {

		},
		data() {
			return {
				list: [

				],
				offset: 0,
				isShow: false,
				onlineStatus: false
			}
		},
		methods: {
			send(index) {
				console.log(index)
				_self.navto("/pages/functions/TakeAshot/send?data=" + JSON.stringify(_self.list[index]))
			},
			init(isload){
				if(isload){
					uni.showLoading({
						title: '加载中'
					});
				}
			
				_self.xhttp.request({
					url: "/functions/TakeAShot/v1/getOnline", //仅为示例，并非真实接口地址。
					method: "POST",
					data: {
						offset: 0
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if(res.data.code == 0){
						_self.list = res.data.data.list
						_self.onlineStatus = res.data.data.take.status == '1' ? false : true
					}
					uni.stopPullDownRefresh()
					uni.hideLoading();
				}).catch(err => {
					uni.stopPullDownRefresh()
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style scoped>

</style>
