import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

//请求工具
import Request from '@/components/luch-request/index.js' // 下载的插件
Vue.prototype.xhttp = new Request({
	baseURL: 'http://192.168.0.103'
});

//引入uView库
import uView from 'uview-ui';
Vue.use(uView);

//引入检查权限
import permision from "@/components/wa-permission/permission.js"


//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store

//全局域名
Vue.prototype.domain = "http://192.168.0.103"

//返回数据统一处理              json数据  是否只是弹出提示
Vue.prototype.code = function(data){
	
	plus.nativeUI.alert(data, function(){
		}, "提示", "好的");
	
}


//跳转
Vue.prototype.navto = function(e){
	uni.navigateTo({
		url: e
	});
}

//提示 						key 提示
Vue.prototype.hint = function(key,hint){
	var res = uni.getStorageSync(key);
	if(!res){
		plus.nativeUI.confirm(hint, function(e){
					console.log("Close confirm: "+e.index);
					if(e.index == 0){
						uni.setStorageSync(key,true)
					}
				},
				{"title":"温馨提示",
					"buttons":["不再提示","好的"],
					"verticalAlign":"center"
				}
		);
	}
}


Vue.prototype.toast = function(msg){
	plus.nativeUI.toast(msg);
}


//遍历目录文件 参数为目录名字 不遍历子目录
Vue.prototype.listDirectory = function(directoryName){
	console.log('遍历目录文件')
	plus.io.resolveLocalFileSystemURL(directoryName, function( ent ) {
			var directoryReader = ent.createReader(); //获取读取目录对象
			directoryReader.readEntries(function(entries){ //历遍子目录即可
				for(var i = 0; i < entries.length; i++){
						console.log("文件信息：" + entries[i].fullPath);
					}
				}
			)
		}, function ( e ) {
			console.log( "Request file system failed: " + e.message );
	} );
}



//删除文件
Vue.prototype.removeFile = function(fileName){
	plus.io.resolveLocalFileSystemURL(fileName , function( ent ) {
			console.log('获取目录对象成功');
			var dc = ent 
			dc.remove(function(e) {
				console.log('删除文件成功');
			}, function(e) { 
				console.log('删除文件失败');
			}) 
		}, function ( e ) {
			console.log( "Request file system failed: " + e.message );
	} );
}

Vue.prototype.requestAndroidPermission = async function (permisionID,name) {
		var result = await  permision.requestAndroidPermission(permisionID)
		var strStatus
		console.log(name + result)
		console.log("android权限名 " + name + " 结果 " + result)
		if (result == 1) { 
			strStatus = "已获得授权" 
		} else if (result == 0) {
			uni.showModal({
			    title: '提示',
			    content: '应用无法获取您' + name + '的权限,部分功能无法使用,是否前往设置手动给予权限?',
			    success: function (res) {
			        if (res.confirm) {
			            permision.gotoAppPermissionSetting()
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		} else {
			uni.showModal({
			    title: '提示',
			    content: '应用无法获取您' + name + '的权限,部分功能无法使用,是否前往设置手动给予权限?',
			    success: function (res) {
			        if (res.confirm) {
			           permision.gotoAppPermissionSetting()
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		}
}

Vue.prototype.requestIosPermission = function (permisionID,name) {
		var result = permision.judgeIosPermission(permisionID)
		console.log("ios权限名 " + name + " 结果 " + result)
		if(permisionID == 'location'){
			if(result){
				
			}else{
				uni.showModal({
				    title: '提示',
				    content: '应用无法获取您' + name + '的权限,部分功能无法使用,是否前往设置手动给予权限?',
				    success: function (res) {
				        if (res.confirm) {
				           permision.gotoAppPermissionSetting()
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}else if(permisionID == 'record'){
			if(result){
				
			}else{
				uni.showModal({
				    title: '提示',
				    content: '应用无法获取您' + name + '的权限,部分功能无法使用,是否前往设置手动给予权限?',
				    success: function (res) {
				        if (res.confirm) {
				           permision.gotoAppPermissionSetting()
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}else{
			if(result === 2){
				uni.showModal({
				    title: '提示',
				    content: '应用无法获取您' + name + '的权限,部分功能无法使用,是否前往设置手动给予权限?',
				    success: function (res) {
				        if (res.confirm) {
				           permision.gotoAppPermissionSetting()
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
		
		
}


//音频播放
Vue.config.productionTip = false

App.mpType = 'app'

import ZAudio from '@/components/uniapp-zaudio/index.js'
// import ZAudio from 'uniapp-zaudio' // npm引用方式

console.log(`ZAudio当前版本`,ZAudio.version)
let zaudio = new ZAudio({
	continuePlay: true, //续播
	autoPlay: false, //自动播放 部分浏览器不支持
})
 
Vue.prototype.$zaudio = zaudio


//模拟初始数据
var musicList = [
];


// 设置音频数据
zaudio.setAudio(musicList)

//渲染第一首音频
zaudio.setRender(0)


const app = new Vue({ 
    ...App,
	store
})
app.$mount()
