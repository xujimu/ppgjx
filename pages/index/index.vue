<template>
	<view style="padding-top: 50upx;" >
		<scroll-view scroll-y class="page" bgColor="bg-gradual-blue">
			<view class="nav-list">
<!-- 				<navigator hover-class='none' :url="item.name" class="nav-li" navigateTo  style="color: #FFFFFF;background-color: #0081ff;" v-if="item.display"
				 v-for="(item,index) in $store.state.funlist" :key="index"> -->
				 <navigator hover-class='none' :url="item.name" class="nav-li" navigateTo :style="{'background-color': colorF(item, index)}"  style="color: #FFFFFF;" v-if="item.display"
				  v-for="(item,index) in $store.state.funlist" :key="index">
					<view>{{item.title}}</view>
					<view class="nav-name">{{item.describe}}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	var _self
	//颜色重新渲染
	var count = 0;
	export default {
		onReady(){
			plus.navigator.closeSplashscreen()
		},
		watch: {
			'$store.state.funlist': { // plan1.0
				handler(newName, oldName) {
					count = 0
				},
				deep: true
			}
		},
		onLoad() {
			_self = this
			//判断有没有设置隐藏功能
			var funlist = uni.getStorageSync('funlist');
			if (funlist) {
				console.log("有隐藏常用功能")
				_self.$store.state.funlist = funlist
				//兼容以前的版本的设备
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
			} else {
				console.log("无隐藏常用功能")
			}
		},
		onShow() {
			console.log("显示")
		},
		data() {
			return {
				color: [
					'#6739b6', 
					'#6739b6',
					'#e03997',
					'#e03997',
					'#e54d42',
					'#e54d42',
					'#8799a3',
					'#8799a3',
					'#fbbd08',
					'#fbbd08',
					'#f37b1d',
					'#f37b1d',
					'#39b54a',
					'#39b54a',
					'#1cbbb4',
					'#1cbbb4',
					'#a5673f',
					'#a5673f',
					'#8dc63f',
					'#8dc63f',
					'#9c26b0',
					'#9c26b0',
					"#0081ff",
					"#0081ff",
					"#1cbbb4",
					"#1cbbb4",
					"#e03997",
					"#e03997",
					"#6739b6",
					"#6739b6"

				]
			};
		},
		methods: {
			colorF(item, index) {
				if (item.display) {
					var color = _self.color[count]
					count = count + 1
					return color
				}

			}
		}
	}
</script>

<style>

</style>
