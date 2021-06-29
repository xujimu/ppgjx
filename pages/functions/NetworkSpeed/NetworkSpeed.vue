<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view class="qiun-columns bg-white">
		<view class="qiun-charts" >
			<canvas canvas-id="canvasGauge" id="canvasGauge" class="charts"></canvas>
		</view>
		<view >
			<view>
				<view class="cu-capsule" >
					<view class='cu-tag bg-blue '>
						最大速度
					</view>
					<view class="cu-tag line-blue">
						{{(max/1024/1024).toFixed(3)}} M
					</view>
				</view>
			</view>
			<view>
				<view class="cu-capsule ">
					<view class='cu-tag bg-blue '>
						下载速度
					</view>
					<view class="cu-tag line-blue">
						{{(speed/1024/1024).toFixed(3)}} M
					</view>
				</view>
				
			</view>
			<view>
				<view class="cu-capsule " >
					<view class='cu-tag bg-blue '>
						最小速度
					</view>
					<view class="cu-tag line-blue">
						{{(min/1024/1024).toFixed(3)}} M
					</view>
				</view>
			</view>
			<view>
				<view class="cu-capsule" style="text-align: right;" >
					<view class='cu-tag bg-blue '>
						平均速度
					</view>
					<view class="cu-tag line-blue">
						{{(average/1024/1024).toFixed(3)}} M
					</view>
				</view>
			</view>
		</view>
		
		<view class="padding flex flex-direction bg-white ">
			<button class="cu-btn  bg-blue margin-tb-sm lg" @click="start()" :disabled="buttonName == '测速' ? false : true">{{buttonName}}</button>
		</view>
		
		
		
		
		
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaGauge=null;
    var timeId;
	var downloadTask;
	export default {
		data() {
			return {
				average:0,
				speed: 0,
				buttonName: '测速',
				lastBytesWritten: 0,
				totalBytesWritten: 0,
				totalBytesExpectedToWrite: 0,
				count: 0,
				max: 0,
				min: 0,
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				gaugeWidth:15,
				data: {
					"categories": [{
						"value": 0.1,
						"color": "#1890ff"
					}, {
						"value": 0.8,
						"color": "#2fc25b"
					}, {
						"value": 1,
						"color": "#f04864"
					}],
					"series": [{
						"name": "",
						"data": 0
					}]
				},
				unload: false

			}
		},
		onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		onHide() {
			
		},
		onUnload() {
			_self.unload = true
			_self.clear()
		},
		methods: {
			cal(e){
				return e/2048
			},
			init(){ 
				_self.average = 0
				_self.max = 0;
				_self.min = 0;
				_self.speed = 0;
				_self.count = 0;
				_self.totalBytesWritten = 0
				_self.totalBytesExpectedToWrite = 0
				_self.lastBytesWritten = 0
				_self.clear()
				_self.data.series[0].data = 0
			},
			start(){
				if(_self.buttonName == '测速'){
					_self.buttonName = '测速中'
					_self.init()
					 downloadTask = uni.downloadFile({
						url: 'https://ppgjx.com/functions/index/reg', //仅为示例，并非真实的资源
						success: (res) => {
							console.log(res.statusCode)
							if (res.statusCode === 200) {
								
							}else{
								_self.clear()
								_self.buttonName = '测速'
								console.log("网络错误");
								_self.code("网络错误,请检查网络是否开启",true)	
							}
						},fail:(err) =>{
							console.log(err)
							if(err.errMsg != "downloadFile:fail abort"){
								if(!_self.unload){
									_self.code("网络错误,请检查网络是否开启",true)
								}
							}
							_self.clear()
							_self.buttonName = '测速'
							console.log("测速失败");
						} ,
					});
					
					
					downloadTask.onProgressUpdate((res) => {
						if(_self.totalBytesWritten == 0){
							timeId = setInterval(()=>{
								console.log(_self.count)
								if(_self.count < 10 ){
									//每秒下载速度
									var speed = _self.totalBytesWritten - _self.lastBytesWritten
									_self.speed = speed
									 //最大速度
									 if(speed  > _self.max){
										 _self.max =  speed
									 }
									 //最小速度
									 if(_self.min != 0){
										 if(speed < _self.min){
											 _self.min =  speed
										 }
									 }else{
										 _self.min =  speed
									 }
									 console.log("最大下载速度:" + _self.max)
									 console.log("最小下载速度:" + _self.min)
									 console.log("本次速度:" + speed)
									
									 //上次下载大小
									_self.lastBytesWritten = _self.totalBytesWritten
									_self.count = _self.count + 1								
									 _self.data.series[0].data = _self.count / 10
									 _self.showGauge("canvasGauge",_self.data);
								}else{
									 _self.buttonName = '测速'
									 _self.clear()
									 console.log("最大下载速度:" + _self.max)
									 console.log("最小下载速度:" + _self.min)
									 _self.average = _self.totalBytesWritten/10
									 console.log("平均速度:" + _self.totalBytesWritten/10)
								} 
								//_self.showGauge("canvasGauge",_self.Gauge);
							},1000);
						}
						_self.totalBytesWritten = res.totalBytesWritten
						_self.totalBytesExpectedToWrite = res.totalBytesExpectedToWrite
					    // console.log('下载进度' + res.progress);
					    // console.log('已经下载的数据长度' + res.totalBytesWritten);
					    // console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
					    
					});
				}
			},
			clear(){
				
				clearInterval(timeId)
				if(downloadTask){
					downloadTask.abort()
				}
			},
			getServerData(){
				_self.showGauge("canvasGauge",_self.data);
			},
			showGauge(canvasId,chartData){
				canvaGauge = new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'gauge',
					fontSize:11,
					legend:false,
					title: {
						name: Math.round(chartData.series[0].data*100)+'%',
						color: chartData.categories[1].color,
						fontSize: 25*_self.pixelRatio,
						offsetY:50*_self.pixelRatio,//新增参数，自定义调整Y轴文案距离
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#666666',
						fontSize: 15*_self.pixelRatio,
						offsetY:-50*_self.pixelRatio,//新增参数，自定义调整Y轴文案距离
					},
					extra: {
						gauge:{
							type:'progress',
							width: _self.gaugeWidth*_self.pixelRatio,//仪表盘背景的宽度
							startAngle:0.75,
							endAngle:0.25,
							startNumber:0,
							endNumber:200,
							splitLine:{
								fixRadius:0,
								splitNumber:10,
								width: _self.gaugeWidth*_self.pixelRatio,//仪表盘背景的宽度
								color:'#FFFFFF',
								childNumber:5,
								childWidth:_self.gaugeWidth*0.4*_self.pixelRatio,//仪表盘背景的宽度
							},
							pointer:{
								width: _self.gaugeWidth*0.8*_self.pixelRatio,//指针宽度
								color:'auto'
							}
						}
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
				});
			}
		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>

