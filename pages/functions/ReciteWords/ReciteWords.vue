<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange "></text>词库列表
			</view>
			<view class="action" >
				<button class="cu-btn bg-green shadow"   @click="open()" data-target="gridModal">{{statusValue}}</button>
			</view>
		</view>

		<view >
			<u-cell-group>
				<u-cell-item icon="clock" @click="WordRecord('/pages/functions/ReciteWords/WordRecord?type=4')" title="四级词汇" >
				</u-cell-item>
				<u-cell-item icon="clock" @click="WordRecord('/pages/functions/ReciteWords/WordRecord?type=6')"  title="六级词汇" >
				</u-cell-item>
			</u-cell-group> 
		</view>
		
		<view class="cu-form-group">
			<view class="title">起始时间</view>
			<picker mode="time" :value="startTime"  @change="startTimeChange">
				<view class="picker">
					{{startTime}}
				</view> 
			</picker>
		</view>
		
		<view class="cu-form-group">
			<view class="title">结束时间</view>
			<picker mode="time" :value="endTime"   @change="endTimeChange">
				<view class="picker">
					{{endTime}}
				</view> 
			</picker>
		</view>
		
		<view class="cu-form-group">
			<view class="title">间隔时间</view> 
			<picker @change="intervalTimeF" :value="intervalTime" :range="interval">
				<view class="picker">
					{{interval[intervalTime]}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">词汇选择</view> 
			<picker @change="selectWordF" :value="selectWordV" :range="selectWord">
				<view class="picker">
					{{selectWord[selectWordV]}}
				</view>
			</picker>
		</view>
		
		<view class=" padding-xs flex align-center  margin-top">
			<view class="flex-sub text-center">
				<text class="text-black text-bold">使用说明</text>
				<view class="padding">开启后每天都会在指定时间推送一个单词,比如开启后每天的9点至21点每5分钟推送一个单词</view>
			</view>
		</view>
		
		<view class=" padding-xs flex align-center  margin-top">
			<view class="flex-sub text-center">
				<text class="text-black text-bold">当前状态:{{statusValue == "开启"?"已关闭":"已开启"}}</text>
				<view class="padding">{{statusValue == "关闭"?"每天" + info.start_time + "至" + info.end_time + "每隔" + info.interval_time + "分钟推送一个单词":""}}</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>   
	var _self;
	export default {
		onShow() {

			_self.load()
		},
		onLoad (){
			_self = this
			switch(_self.$store.state.platform){
			    case 'android':
			       console.log('运行Android上') 
				   // Vue.prototype.requestAndroidPermission("android.permission.CAMERA","相机")
				   _self.code("安卓暂未统一推送,暂时无法使用该功能",true)
			       break;
			    case 'ios':
				   Vue.prototype.requestIosPermission("push","通知")
			       console.log('运行iOS上')
			       break;
			    default:
			       console.log('运行在开发者工具上')
			       break;
			}
			
		},
		data() {
			return {
				startTime: '09:00',
				endTime: '21:00',
				interval:[1,5,10,15,30,60],
				intervalTime:1,
				selectWord:["四级词汇","六级词汇"],
				selectWordV:0,
				statusValue:"开启",
				info:{}
				
			}
		}, 
		methods: {
			WordRecord(e){
				uni.navigateTo({
					url: e
				});
			},
			load(){
				//console.log(_self.$store.state.user.user_id)
				uni.showLoading({
				    title: '加载中'
				});
				
				
				_self.xhttp.request({
					url: "/functions/ReciteWords/v1/getPushStatus", //仅为示例，并非真实接口地址。
					method:"POST",
					data: {
					},
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(res => { 
					console.log(res)
					if(res.data.code == 0 ){
						if(res.data.data != null){
							if(res.data.data.status == 0){
								_self.statusValue = "开启"
							}else{
								_self.statusValue = "关闭"
							}
							_self.info = res.data.data
						}else{
							_self.statusValue = "开启"
							 _self.info.status = 0
						}
					}	
					uni.hideLoading(); 
				}).catch(err => {
					uni.hideLoading(); 
				})
				
			},
			open(){
				
				uni.showLoading({
				    title: '执行中'
				});
				var status;
		        var type;
				
				if(_self.info.status == 1){
					status = 0
				}else{
					status = 1
				}
				
				switch (_self.selectWord[_self.selectWordV]){
					case "四级词汇":
						type=4
						break;
					case "六级词汇":
						type=6
						break;
				}
				
				_self.xhttp.request({
					url: "/functions/ReciteWords/v1/updateStatus", //仅为示例，并非真实接口地址。
					method:"POST",
					data: {
						// user_id:_self.$store.state.user.user_id,
						platform:_self.$store.state.platform,
						status:status,
						start_time:_self.startTime,
						end_time:_self.endTime,
						interval_time:_self.interval[_self.intervalTime],
						type:type
				    },
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(res => {
					if(res.data.code == 0){
						_self.load();
					}
					
					uni.hideLoading(); 
				}).catch(err => {
					uni.hideLoading(); 
				})
			},
			startTimeChange(e) {
				this.startTime = e.detail.value
			    console.log("起始时间" + this.startTime)
			},
			endTimeChange(e) {
				//数组["09","01"]
				var start = this.startTime.split(":");
				//数组["09","01"]
				var end = e.detail.value.split(":");
				var startxs;
				var endxs;
				if(start[0].split("")[0] == "0"){
					startxs = start[0].split("")[1]
				}else{
					startxs = start[0]
				}
				if(end[0].split("")[0] == "0"){
					endxs = end[0].split("")[1]
				}else{
					endxs = end[0]
				}
				 
				if(endxs - startxs < 1){
					plus.nativeUI.alert("结束时间应该在起始时间之后最少1小时!", function(){
						}, "提示", "好的");
				}else{
					this.endTime = e.detail.value
				}
				console.log("结束时间" + this.endTime)
			},
			intervalTimeF(e){
				console.log("间隔时间" + e.detail.value) 
				this.intervalTime = e.detail.value
			},
			selectWordF(e){
				console.log("词汇选择" + e.detail.value)
				this.selectWordV = e.detail.value
			}
			
		}
	}
</script>

<style>
	
</style>
