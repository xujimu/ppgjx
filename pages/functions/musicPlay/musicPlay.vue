<template >
	<view class="content" >
		<zaudio theme="theme1"></zaudio>
	
		<view class="listbox" style="background-color: #FFFFFF;">
			<view style="padding:10px">音频列表:</view>
			<view v-for="(i, k) in audiolist" :key="k" class="list">
				{{ i.title }}
				<button size="mini" @click="dele(i,k)">删除</button>
				<button size="mini" @click="play(k)">{{ !paused && i.src === playinfo.src ? '暂停' : '播放' }}</button>
			</view>
		</view>
	
	
	</view>
</template>

<script>
import zaudio from '@/components/uniapp-zaudio/zaudio';
// import zaudio from 'uniapp-zaudio/zaudio'
export default {
	onNavigationBarButtonTap() {
		this.navto('/pages/functions/musicPlay/import')
	},
	data() {
		return {
			audiolist: this.$zaudio.audiolist, //当前音频列表
			playIndex: this.$zaudio.playIndex, //当前播放的索引
			paused: this.$zaudio.paused, //当前是否暂停
			playinfo: this.$zaudio.playinfo //当前播放的信息
		};
	},
	components: { zaudio: zaudio },
	onLoad(){
		this.hint("music","本功能数据为本地储存,如果您卸载了软件,您导入的音乐将会丢失")
		//注意: 不同的回调方法, 相同的业务函数方法名, 不会相互影响;
		this.$zaudio.on('stop', 'aaa', function(){
			console.log('我是强制暂停或关闭小程序音频浮窗触发的')
		})
		this.$zaudio.on('seek', 'aaa', function(time){
			console.log('进度拖动A', time)
		})
		//注意: 相同的回调方法, 且相同的业务函数方法名, 只作用于第一次注册的业务
		this.$zaudio.on('seek', 'aaa', function(time){
			console.log('进度拖动B', time)
		})
	},
	onShow() {
	     var that = this
		
		 plus.sqlite.selectSql({
		 	name: 'ppgjx',
		 	sql: 'select * from music',
		 	success: function(data){
		 		console.log('selectSql success: '); 	
				console.log(data)
				that.$zaudio.setAudio(data);		
					
		 	},
		 	fail: function(e){
		 		console.log('selectSql failed: '+JSON.stringify(e));
		 	}
		 });
		//实时渲染当前的播放状态
		that.$zaudio.syncRender()
		
		//实时获取当前播放状态
		that.$zaudio.syncStateOn('page-index-get-state', ({ audiolist, playIndex, paused, playinfo }) => {
			that.audiolist = audiolist;
			that.playIndex = playIndex;
			that.paused = paused;
			that.playinfo = playinfo;
		});	
		 

	},
	onHide() {
		//卸载不需要的业务和获取播放状态的业务,提高页面性能
		this.$zaudio.syncStateOff('page-index-get-state');
		this.$zaudio.off('seek', 'aaa');
		this.$zaudio.off('stop', 'aaa');
	},
	methods: {
		dele(item,index){
			console.log("删除")
			var that = this
			
			plus.sqlite.executeSql({
					name: 'ppgjx',  
					sql: "delete from  music where guid = '" + item.guid +  "'",  
					success: function(e){   
						console.log("删除成功",item.src)
						
						// plus.nativeUI.toast("删除成功");
						plus.sqlite.selectSql({
							name: 'ppgjx',
							sql: 'select * from music',
							success: function(data){
								console.log('查询成功'); 
								 console.log(data)
								 
								that.$zaudio.setAudio(data);	
								that.removeFile(item.src)			
							},
							fail: function(e){
								console.log('selectSql failed: '+JSON.stringify(e));
							}
						});
						console.log(e)
					},
					fail: function(e){  
						plus.nativeUI.toast("删除失败") 
						console.log(JSON.stringify(e))
					}  
			});
		},
		play(key) {
			//播放或暂停
			this.$zaudio.operate(key);
		},
		setRender(){
			this.$zaudio.setRender(1);
		},

		removeStop() {
			this.$zaudio.off('playing', 'recharge');
			this.$zaudio.operate();
		},

		logPlaying(action) {
			// 一个回调事件可以注册多次业务, action用于区分相同回调事件的不同业务
			//例: playing回调时注册 打印事件
			this.$zaudio.on('playing', action, info => {
				console.log('播放中----' + action, info);
			});
		},
		offPlaying(action) {
			//注意解除事件action必须与注册事件的action相同
			this.$zaudio.off('playing', action);
		},
		stepPlay(val) {
			this.$zaudio.stepPlay(val);
		}
	}
};
</script>

<style scoped lang="scss">

.listbox {
	margin: 20px 10px 10px;
	border: 1px solid rgba(0, 0, 0, 0.2);
	.list {
		line-height: 40px;
		border-top: 1px solid #ccc;
		padding: 0 10px;

		button {
			float: right;
			margin-top: 5px;
			margin-left: 5px;
		}
	}
}

.demo {
	margin-top: 20px;
	button {
		margin: 5px;
	}
}
</style>







<!-- <template>
	<view>
		<u-cell-group>
			<view  @longpress="logoTime(index)"  v-for="(item,index) in data" @tap="play(index)">
				<u-cell-item   :title="data[index].name" ></u-cell-item>
			</view>
		</u-cell-group> 
	</view> 
	
</template> -->

<!-- <script>
	var _self
	const bgAudioMannager = uni.getBackgroundAudioManager();
	export default {
		onNavigationBarButtonTap() {
			_self.navto('/pages/functions/musicPlay/import')
		},
		components: {
			       
		},
		onLoad() {
			_self = this
			bgAudioMannager.onPrev(function(e){
				 bgAudioMannager.stop()
				_self.play(_self.index + 1)
			})
		},
		onShow() {
			plus.sqlite.selectSql({
				name: 'ppgjx',
				sql: 'select * from music',
				success: function(data){
					console.log('selectSql success: '); 
					// _self.data = data
					_self.data = data
				},
				fail: function(e){
					console.log('selectSql failed: '+JSON.stringify(e));
				}
			});
		},
		onUnload(){
	
			
		},
		watch:{
			
		},
		data() {
			return {
				data:[],
				index:0
			}
		},
		methods: {
			play(index){
				console.log(_self.data[index])
				_self.index = _self.data[index]
				bgAudioMannager.title = _self.data[index].name;
				bgAudioMannager.singer = '暂无';
				bgAudioMannager.src =  _self.data[index].path;
				bgAudioMannager.play()
				plus.nativeUI.toast("开始播放");
			},
			logoTime(index){
				uni.showModal({
				    title: '提示',
				    content: '您确定要删除 ' + _self.data[index].name + " 吗?",
				    success: function (res) {
				        if (res.confirm) {
				           plus.sqlite.executeSql({
				           		name: 'ppgjx',  
				           		sql: "delete from  music where guid = '" + _self.data[index].guid +  "'",  
				           		success: function(e){   
									_self.removeFile(_self.data[index].path)
				           			plus.nativeUI.toast("删除成功");
									_self.data.splice(index,1)
				           			console.log(e)
				           		},
				           		fail: function(e){  
				           			plus.nativeUI.toast("删除失败") 
				           			console.log(JSON.stringify(e))
				           		}  
				           }); 
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style scoped>
	
button{
	border-radius: 0;
}

.bt{
	display: inline-block;
	width: 100vw;
}

</style> -->