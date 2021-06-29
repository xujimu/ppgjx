<template>
	<view >
		<u-navbar back-text="退出"  :custom-back="customBack" title="" >
			<view class="navbar-right" slot="right" >
				<text @click="importF" style="margin-right: 20rpx;">导入</text>
				<text @click="updatePd" style="margin-right: 20rpx;">修改密码</text>
			</view>
		</u-navbar> 
		<view class="u-page" style="font-size: 0px;" > 
		<!-- 	<view class="box">
				<image v-for="(item,index) in list"  :src="item.url" ></image>
			</view> -->
			
			<image v-for="(item, index) in list"  class="box"  @load="ok()" mode="aspectFill"  @tap="tap(item,index)"    :src="item.url"></image>
			 <u-empty  v-if="list == ''?true:false" text="没有任何照片,快去导入吧" style="margin-top: 20rpx;" mode="favor"></u-empty>
			
		</view> 
	</view>
</template>

<script>
	var _self;
 
	export default {
		 components: {  }, 
		onLoad() { 
			_self = this
			_self.hint("photoBoxHint","为了保证用户隐私安全,本功能完全离线,密码及照片由本地存储,如果您卸载了软件或忘记密码,所导入的图片将无法找回")
			switch(_self.$store.state.platform){
				case 'android':
				   console.log('运行Android上') 
				   Vue.prototype.requestAndroidPermission("android.permission.CAMERA")
				   break;
				case 'ios':
				   Vue.prototype.requestIosPermission("camera","摄像头")
				   Vue.prototype.requestIosPermission("photoLibrary","相册")
				   console.log('运行iOS上')
				   break;
				default:
				   console.log('运行在开发者工具上')
				   break;
			}
			plus.sqlite.selectSql({
				name: 'ppgjx',
				sql: 'select * from photo',
				success: function(data){
					console.log('selectSql success: ');
					for(var i in data){
						console.log(data)
						_self.list.push({"url": data[i].path,"guid": data[i].guid}) 
					}
				},
				fail: function(e){
					console.log('selectSql failed: '+JSON.stringify(e));
				}
			});
			
		},
		onBackPress(){
			console.log("返回")
			uni.switchTab({
			    url: '/pages/index/index'
			});	
			return true
		},
		onUnload() {
			
		},
		data() {
			return {
				list:[
				]
			}
			
		},
		methods:{
			updatePd(){
				
				plus.nativeUI.prompt("必须是6位纯数字哦！", function(e){
						if(e.index==0){
							console.log("取消")
							
						}else{
							console.log("确定")
							if(_self.$u.test.digits(e.value) && e.value.length == 6){
								uni.setStorageSync('photoBoxPassword',e.value);
								plus.nativeUI.alert("设置成功,下次进入生效", function(){
								}, "提示", "好的"); 
							}else{
								plus.nativeUI.alert("必须为6位纯数字哦", function(){
								}, "提示", "好的"); 
							}
							
						}
						
					}, "提示", "请输入新密码", ["取消","确定"]);
				
				
			},
			ok(){
				// console.log("加载完毕" ) 
			},
			dele(item,index){
				console.log(index)
				plus.sqlite.executeSql({
						name: 'ppgjx',
						sql: "delete from photo where guid = '" + item.guid  + "'",
						success: function(e){
							console.log('executeSql success!' + index);
							_self.list.splice(index, 1);
							
							_self.removeFile(item.url)
						},  
						fail: function(e){
							console.log('executeSql failed: '+JSON.stringify(e));
						}
				}); 
			},
			restore(item,index){
				uni.saveImageToPhotosAlbum({
				   filePath: item.url,
				   success: function (res) {
					 console.log("保存成功")
					uni.showToast({
						icon: "success",
						title: '保存成功',
						duration: 1000
					});
				   },fail: (err) => {
					console.log("保存失败")
					console.log(err)
					uni.showToast({
						icon: "none",
						title: '保存失败', 
						duration: 1000
					});
				   } 
				 });
			},
			tap(item,index){
				console.log("图片信息")
				console.log(item)
				console.log(index)
				plus.nativeUI.actionSheet(
					{title:"操作",
					cancel:"取消",
					buttons:[ 
						{
							title:"保存到相册"
						},{
							title:"删除"
						}
					]},
					function(e){
						switch(e.index){
							case 1:
								_self.restore(item,index)
								break;
							case 2:
								_self.dele(item,index)
								break
						}
						console.log("选择: "+e.index);
					}
				);
				
			},
			customBack(){
				console.log("手动调回")
				uni.switchTab({
				    url: '/pages/index/index'
				});	
			},
			importF(){
			  
			 uni.chooseImage({
			      count: 1000, //默认9
			      sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
			      success: function (res) {
					  plus.io.resolveLocalFileSystemURL('_doc/photo', function( ent ) {
					  		console.log('获取目录对象成功');
							var dc = ent
							for(var i = 0; i < res.tempFilePaths.length; i++){
								var filePath = res.tempFilePaths[i]
								console.log("文件路径：" + filePath);
								plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
									entry.copyTo(dc,  _self.$u.guid() + entry.name, function(e) {
										console.log('移动文件成功' + e.fullPath);
										var epath = '_doc/photo/' + e.name
										var guid = _self.$u.guid()
										plus.sqlite.executeSql({   
											name: 'ppgjx', 
											sql: "insert into photo values('" + guid + "','" + epath + "','" + _self.$u.date(Date.now(), 'yyyy-mm-dd MM:ss') + "')", 
											success: function(e){   
												console.log('插入照片成功' + guid); 
												_self.list.push({"url": epath,"guid": guid})
											},
											fail: function(e){  
												console.log('executeSql failed: '+JSON.stringify(e));
											} 
										}); 	
									}, function(e) { 
										console.log('移动文件失败');
										console.log(e);
									})
								}                                                                                                                                                                                                                   , function(e) {
									console.log('移动文件失败');
								});
							}
					  	}, function ( e ) {
					  		console.log( "Request file system failed: " + e.message );
					  } );
			      }
			  });
			}
		}
	}
</script>



<style  scoped>
	
	.box{
		border-style: solid; 
		border-top-width: 5rpx;
		border-left-width: 5rpx;
		border-right-width: 5rpx;
		border-bottom-width: 5rpx;
		border-color: #FFFFFF;
		
		width: 250rpx;
		height: 250rpx;
		
	}

</style>