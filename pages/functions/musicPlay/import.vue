<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		<view class="cu-form-group " style="margin: 20rpx 20rpx;border-radius:18upx;">
			<textarea maxlength="-1" v-model="text" placeholder="仅支持网络路径MP3格式"></textarea>
		</view>
		<view class="padding-xl" >
			<button :disabled="text != '' ? false:true" class="cu-btn block lg bg-white" @click="tap()">
				<text class="cuIcon-command" ></text>开始导入</button>
		</view>
		<view @click="navto('/pages/functions/help/help?url=https://ppgjx.com/functions/course/musicplay')" style="text-align: right;margin-right: 20rpx;">
			<u-tag text="不会使用?" type="success" bg-color="#ffffff" border-color="#0081ff" color="#0081ff" />
		</view>
		<view class="cu-form-group " style="margin: 20rpx 20rpx;border-radius:18upx;">
			<view style="text-align: center;margin: 0px auto;">
				<view>单行导入格式</view>
				<view>https://www.baidu.com/1.mp3|歌名|歌手</view>
				<view>多行导入格式</view>
				<view>https://www.baidu.com/1.mp3|歌名|歌手</view>
				<view>https://www.baidu.com/2.mp3|歌名|歌手</view>
			</view>
		</view>
		
		<view style="margin: 0px auto;">
			<textarea v-model="con" auto-height></textarea>
		</view>
		
	</view>
	
</template>

<script>
	var _self
	export default {
		components: {
			
		},
		onLoad() {
			_self = this
		},
		onShow() {

		},
		onUnload(){

			
		},
		watch:{
			
		},
		data() {
			return {
				text: '',
				con:''
			}
		},
		methods: {
		timeFilter (seconds) {
		        var ss = parseInt(seconds)// 秒
		        var mm = 0// 分
		        var hh = 0// 小时
		        if (ss > 60) {
		          mm = parseInt(ss / 60)
		          ss = parseInt(ss % 60)
		        }
		        if (mm > 60) {
		          hh = parseInt(mm / 60)
		          mm = parseInt(mm % 60)
		        }
		        var result = ('00' + parseInt(ss)).slice(-2)
		        if (mm > 0) {
		          result = ('00' + parseInt(mm)).slice(-2) + ':' + result
		        } else {
		          result = '00:' + result
		        }
		        if (hh > 0) {
		          result = ('00' + parseInt(hh)).slice(-2) + ':' + result
		        }
		        return result
		},	
		async tap(){ 
			var arr =	_self.text.split("\n")
			_self.con = "处理中 请勿重复点击\n"
			for (var i = 0; i < arr.length; i++) {
				var data = arr[i].split("|")
				var index = i + 1
				_self.con = _self.con + "正在处理第" + index + "项\n"
				await _self.dispose(data[0],data[1],data[2])
			}
			 _self.con = _self.con + "导入完毕"
			 uni.hideLoading() 
		  },
		  dispose(url,name,singer){
			  return new Promise (function(resolve,reject){
				  uni.downloadFile({
				      url: url, //仅为示例，并非真实的资源
				      success: (res) => {
				          if (res.statusCode === 200) {
				              console.log('下载成功');
							  plus.io.getAudioInfo({filePath:res.tempFilePath,success:function(e){
								  console.log(e)
								  var info = e
								  console.log(info)
								  plus.io.resolveLocalFileSystemURL('_doc/music', function( ent ) {
										console.log('获取目录对象成功');
										var dc = ent
										
										var filePath = res.tempFilePath
										console.log("文件路径：" + filePath);
										plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
											entry.copyTo(dc,  _self.$u.guid() + entry.name, function(e) {
												console.log('移动文件成功' + e.fullPath);
												var epath = '_doc/music/' + e.name
												var guid = _self.$u.guid()
												var img = "http://ppgjx.com/static/images/logo.jpg"
												plus.sqlite.executeSql({   
													name: 'ppgjx', 
													sql: "insert into music values('" + guid + "','"  + name + "','" + epath + "','" + singer  + "','" +  img + "','" + "default" + "','" + _self.$u.date(Date.now(), 'yyyy-mm-dd MM:ss') + "')", 
													success: function(e){   
														_self.con = _self.con + '导入成功' + '\n'
														console.log('插入成功' + guid); 
														resolve()
													},
													fail: function(e){  
														console.log('executeSql failed: '+JSON.stringify(e));
														resolve()
													} 
												}); 	
											}, function(e) { 
												_self.con = _self.con + "移动文件失败" + '\n'
												console.log('移动文件失败');
												console.log(e);
												resolve()
											})
										  }                                                                                                                                                                                                                   , function(e) {
											_self.con = _self.con + "移动文件失败" + '\n'
										
											resolve()
										});
									}, function ( e ) {
										resolve()
										console.log( "Request file system failed: " + e.message );
								  } );
							  },fail:function(e){
									 _self.con = _self.con + "获取音乐信息失败" + '\n'
								   resolve()
							  }});
				          }else{
							  _self.con = _self.con + "下载失败" + '\n'
							 resolve()
						 }
				      },fail:function(){
				      	_self.con = _self.con + "下载失败" + '\n'
				      	resolve()
				      }
				  });
			  });
		  }
		  
		}
	}
</script>

<style scoped>
	.cu-list.menu-avatar>.cu-item:after, .cu-list.menu>.cu-item:after {
		border-bottom: 0px none #ddd;
	}
</style>
