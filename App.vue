<script>
	var _self
	let base = require('@/static/js/base64.js');
	import permision from "@/components/wa-permission/permission.js"
	import md5Libs from "uview-ui/libs/function/md5";
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			
			_self = this
			console.log('App Launch')
			_self.$store.state.platform = uni.getSystemInfoSync().platform
			//区分平台
			for (var i=0;i<_self.$store.state.funlist.length;i++)
			{ 
			    switch (_self.$store.state.platform){	 
					case 'android':
						if(_self.$store.state.funlist[i].platform == 1){
							_self.$store.state.funlist.splice(i,1)
							i--
						}
						break; 
					case 'ios': 
						if(_self.$store.state.funlist[i].platform == 2){
							_self.$store.state.funlist.splice(i,1)
							i--
						}
						break
					default:
						break;
				}
			}
			const user = uni.getStorageSync('user');
			if (user) {
				_self.$store.state.user = user
			}
			//判断单功能模式是否开启
			const onFun = uni.getStorageSync('oneFun');
			if(onFun.status){
				_self.navto(_self.$store.state.funlist[onFun.index].name)
			}
			//创建临时目录
			plus.io.resolveLocalFileSystemURL('_doc', function( ent ) {
					ent.getDirectory('temp', {create:true,exclusive:false}, function( dir ){
						console.log("创建目录成功 目录名: " + dir.name);
						plus.io.resolveLocalFileSystemURL('_doc/temp', function( ent ) {
								var directoryReader = ent.createReader(); //获取读取目录对象
								directoryReader.readEntries(function(entries){ //历遍子目录即可
									for(var i = 0; i < entries.length; i++){
											entries[i].remove( function ( entry ) {
												console.log("清理目录")
											}, function ( e ) {
												console.log("清理目录失败")
											} );
										}
									}
								)
							}, function ( e ) {
								console.log( "Request file system failed: " + e.message );
						} );
					}, function (e) {
						console.log("创建目录失败" +  e.message );
					} );
				}, function ( e ) {
					console.log( "Request file system failed: " + e.message );
			} );
			
			//创建音乐目录
			plus.io.resolveLocalFileSystemURL("_doc", function( ent ) {
					ent.getDirectory("music", {create:true,exclusive:false}, function( dir ){
						console.log("创建目录成功 目录名: " + dir.name);
						
					}, function (e) {
						console.log("创建目录失败" +  e.message );
					} );
				}, function ( e ) {
					console.log( "Request file system failed: " + e.message );
			} );
			
			//创建加密照片目录
			plus.io.resolveLocalFileSystemURL("_doc", function( ent ) {
					ent.getDirectory("photo", {create:true,exclusive:false}, function( dir ){
						console.log("创建目录成功 目录名: " + dir.name);
						
					}, function (e) {
						console.log("创建目录失败" +  e.message );
					} );
				}, function ( e ) {
					console.log( "Request file system failed: " + e.message );
			} );
			
			
			//app在线收到推送监听
			plus.push.addEventListener("receive", function(msg) {
				console.log("receive收到推送消息",msg)
				console.log(plus.push.getClientInfo())
				//这里消息载体是basr64编码
				var payload = JSON.parse(base.Base64.decode(msg.payload))
				console.log(payload)
				switch (_self.$store.state.platform){
					case 'android':
						break; 
					case 'ios':
						switch (payload.type){
							case "word":
								console.log("单词推送")
								if(msg.aps){
									plus.push.createMessage(msg.aps.alert.body,msg.payload,{title:msg.aps.alert.title})
								}
								break
							case "TakeAShot":
							     console.log("拍一拍推送")
								if(msg.aps){
									plus.push.createMessage(msg.aps.alert.body,msg.payload,{title:msg.aps.alert.title})
								}
								break;
						}
						break
					default:
						break;
				}
				 
			});  
			
			//离线推送点击会触法
			plus.push.addEventListener( "click", function(msg){
				console.log("click收到推送消息",msg)
			    var payload = JSON.parse(base.Base64.decode(msg.payload))
				
				 switch (_self.$store.state.platform){
				 	case 'android':
				 		
				 		break;
				 	case 'ios':
				 		switch (payload.type){
				 			case "TakeAShot":
				 				_self.navto("/pages/functions/TakeAshot/send?data=" + JSON.stringify(payload.user))
				 				break;
							case "word":
							    console.log("单词推送")
								break;
				 		}
				 		break
				 	default:
				 		break;
				 }
			}); 
			 
	
			
			//发送请求拦截前
			_self.xhttp.interceptors.request.use((config) => { // 可使用async await 做异步操作
			  var cid = plus.push.getClientInfo().clientid && plus.push.getClientInfo().clientid != 'null'  ? plus.push.getClientInfo().clientid : undefined;
			  config.header = {
			      ...config.header,
			     token: _self.$store.state.user ?  _self.$store.state.user.token : undefined ,
				 uid: _self.$store.state.user ? _self.$store.state.user.user_id : undefined ,
				 platform: _self.$store.state.platform ,
				 version: _self.$store.state.version ,
				 //这里返回值不是真正的null而是字符串null有点坑
				 cid: cid,
				 access: '' //服务器加密秘钥协作开发者无需修改
			  }
			  
			  console.log("发送请求拦截前",config)	
			  return config
			}, config => { // 可使用async await 做异步操作
			  console.log("请求配置",config)
			  return Promise.reject(config)
			})
		
			
			//发送请求拦截后 0成功 1系统提示错误如账号密码错误 2
			_self.xhttp.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
			  console.log("发送请求拦截后",response)
			  
			  if(response.data.code != 0){
				  //清除登录信息
				  if(response.data.code == 4){
					  _self.$store.state.user = null
					  uni.setStorageSync('user', null);
					  plus.nativeUI.alert(response.data.message, function(){
						}, "提示", "好的");
						uni.switchTab({
							url: '/pages/index/my'
						});
				  }else{
					  plus.nativeUI.alert(response.data.message, function(){
					  	}, "提示", "好的");
				  }
				  
			  } 
			  return response
			}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
			  console.log("请求失败",response)
			  plus.nativeUI.alert("操作失败!请检查网络", function(){
			 	}, "提示", "好的");
			  
			  return Promise.reject(response)
			})
			
	
			
		},
		onShow: function() {
			var pushStatus = 0
			//安卓应用内提示更新
			switch (_self.$store.state.platform) {
				case 'android':	
					uni.request({
						url: _self.domain + "/index/index/update", //仅为示例，并非真实接口地址。
						method: "POST",
						data: {
							version: _self.$store.state.version
						}, 
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							console.log(res.data);
			
							if (res.data.code == 0) {
								if (res.data.data != null) {
									var url = res.data.data
									uni.showModal({
										title: '提示',  
										content: res.data.message,
										success: function(res) {
											if (res.confirm) {
												plus.runtime.openURL(url)
											} else if (res.cancel) {
												console.log('用户点击取消');
											}
										}
									});
								}
							} else {
								plus.nativeUI.alert(res.data.message, function() {}, "提示", "好的");
							}
						},
						fail: (err) => {
							console.log(err)
						},
						complete: () => {
			
						}
					});
					break;
				case 'ios':
					if(permision.judgeIosPermission("push") === 2){
						pushStatus = 0
					}else{
						pushStatus = 1
					}
					console.log('运行iOS上')
					break;
				default:
					console.log('运行在开发者工具上')
					break;
			}
			//如果用户登录 则上报
			if(_self.$store.state.user){
				//上报状态
				_self.xhttp.request({
					url: "/user/user/v1/push", //仅为示例，并非真实接口地址。
					method:"POST",
					data: {
						pushStatus:pushStatus
					},
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(res => {
				
				}).catch(err => {
				})
			}
			plus.sqlite.openDatabase({
				name: 'ppgjx',
				path: '_doc/ppgjx.db',
				success: function(e){
					console.log('openDatabase success!');
					plus.sqlite.executeSql({
							name: 'ppgjx',
							sql: 'create table if not exists photo(guid text PRIMARY KEY,path text,create_time text)',
							success: function(e){
								console.log('executeSql success!');
							}, 
							fail: function(e){
								console.log('executeSql failed: '+JSON.stringify(e));
							}
					});
					plus.sqlite.executeSql({
							name: 'ppgjx',
							sql: 'create table if not exists div_calculate(guid text PRIMARY KEY,name text,data text,remark text,create_time text)',
							success: function(e){
								console.log('executeSql success!');
							}, 
							fail: function(e){ 
								console.log('executeSql failed: '+JSON.stringify(e));
							}
					});
					plus.sqlite.executeSql({
							name: 'ppgjx',
							sql: 'create table if not exists music(guid text PRIMARY KEY,title text,src text,singer text,coverImgUrl text,type text,create_time text)',
							success: function(e){
								console.log('executeSql success!');
							}, 
							fail: function(e){ 
								console.log('executeSql failed: '+JSON.stringify(e));
							}
					});
					plus.sqlite.executeSql({
							name: 'ppgjx',
							sql: 'create table if not exists womanRecord(guid text PRIMARY KEY,date text,tag text,remark text,create_time text)',
							success: function(e){
								console.log('executeSql success!');
							}, 
							fail: function(e){ 
								console.log('executeSql failed: '+JSON.stringify(e));
							}
					});
				},
				fail: function(e){
					console.log('openDatabase failed: '+JSON.stringify(e));
				}
			});
			console.log('App Show')

		},
		onHide: function() {
			console.log('App Hide')
			plus.sqlite.closeDatabase({
					name: 'ppgjx',
					success:  function(e){
						console.log('closeDatabase success!');
					},
					fail: function(e){
						console.log('closeDatabase failed: '+JSON.stringify(e));
					}
			});
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss"; 
	@import "colorui/main.css";
	@import "colorui/icon.css";

	@import url("static/css/icon/iconfont.css");
	/*每个页面公共css */

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}

	.text-light {
		font-weight: 300;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}
</style>
<style>
	
</style>
