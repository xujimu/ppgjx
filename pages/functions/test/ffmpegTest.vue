<template>
	<view>
		<button @click="video()">选择视频</button>
		<button @click="img()">选择图片</button>
		<button @click="copy()">复制</button>
		<button @click="list()">遍历</button>
		<button @click="saveV()">保存视频</button>
	
		
		<button @click="saveI()">保存图片</button>
		<textarea v-model="input" style="width: 100%;" maxlength="1000000000" ></textarea>
		<textarea v-model="onput" style="width: 100%;" maxlength="1000000000" ></textarea>
		<textarea maxlength="1000000000" v-model="cmd"></textarea>
		<button @click="Texec">同步执行</button>
		<button @click="Yexec">异步执行</button>
		<textarea maxlength="1000000000" style="width: 100%;" v-model="log"></textarea>
		<textarea maxlength="1000000000" style="width: 100%;" v-model="list1"></textarea>
	</view>
</template>

<script>
	var _self
	var FFmpeg
	export default {
		components: {
			
		},
		onLoad() {
			_self = this
			
			_self.input = plus.io.convertLocalFileSystemURL('/static/1.mp4')
			                    //输出目录
			_self.onput = plus.io.convertLocalFileSystemURL("_doc")+new Date().getTime()+".mp4"
			//引入插件
			FFmpeg = uni.requireNativePlugin('pocaidao-fmpegcmdruns')
			//全局设置回调 
			FFmpeg.setStaticCallBack((data)=>{
				console.log("处理数据",data)
			
			},(log)=>{
				console.log("日志数据" , log)
				_self.log = _self.log + log.message
				
			})
			
		},
		onShow() {
			
		},
		onUnload(){

			
		},
		watch:{
			
		},
		data() {
			return {
				cmd: '-version',
				input: '',
				onput: '',
				log: '',
				list1: ''
			}
		},
		methods: {
			saveV(){
				uni.saveVideoToPhotosAlbum({
				                        filePath: _self.onput,
				                        success: function () {
				                            console.log('save success');
				                        }
				                    });
			},
			saveI(){
				 uni.saveImageToPhotosAlbum({
				            filePath: _self.onput,
				            success: function () {
				                console.log('save success');
				            }
				        });
			},
			list(){
				_self.listDirectory("_doc")
			},
			copy(){
				uni.setClipboardData({
						data: _self.onput
					});
			},
			video(){
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function (res) {
						_self.input = plus.io.convertLocalFileSystemURL(res.tempFilePath) ;
						uni.setClipboardData({
								data: _self.input
							});
					}
				});
			},
			img(){
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				       _self.input = plus.io.convertLocalFileSystemURL(res.tempFilePaths[0]) 
					   uni.setClipboardData({
					   		data: _self.input
					   	});
				    }
				});
			},
			Texec(){
				_self.log = ''
				var res =  FFmpeg.runCmdCodeSyncFunc({"cmd": _self.cmd})
				console.log("同步命令返回结果")
				console.log(res)
			},
			Yexec(){
				_self.log = ''
				FFmpeg.runCmdCodeAsyncFunc({"cmd": _self.cmd},(start)=>{
					console.log("异步命令id" + start)
				},(end)=>{
					console.log("异步命令结束" )
					console.log(end) 
				})
				
			}
		}
	}
</script>

<style scoped>
	
</style>