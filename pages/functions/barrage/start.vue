<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view @tap="quitF()" >
		<view class="close" v-if="quit" @tap="exit()"></view>
		
		<view  v-if="!data.roll"  style="height: 100vh;width: 100vw;" :style="{'background-color': data.bgcolor}">
			<u-notice-bar class="marquee"   :color="data.dmcolor" 
			type="none" :font-size="data.size" padding="0px 0px" :speed="data.speed" :volume-icon = "false" :list="data.text"></u-notice-bar>
		</view>
		
		<view style="height: 100vh;width: 100vw;" v-if="data.roll"   :style="{'background-color': data.bgcolor}">
			<view style="text-align: center;" class="marquee"><text class="text-oneLine" :style="{'font-size':data.size + 'rpx','color': data.dmcolor}">{{data.text[0]}}</text></view>
		</view>
	</view>
	
</template>
 
<script>
	var _self 
	var bgtime
	var dmtime
	var time
	export default {
		onShow(option) {
			 
		},
		onLoad(option) {
			_self = this
			console.log("弹幕参数")
			_self.data = JSON.parse(option.data)
			
			console.log(_self.data )
			//还原比例
			_self.data.speed = _self.data.speed * 3
			console.log(_self.data.text.length)
			if(_self.data.roll){
				_self.data.size = _self.data.size * 7 / _self.data.text.length
			}else{
				_self.data.size = _self.data.size * 7
			}
			
			_self.data.bgspeed = 2000 - _self.data.bgspeed * 20
			
			_self.data.dmspeed = 2000 - _self.data.dmspeed * 20
			
			//随机模式
			if(_self.data.bgchecked){
				 bgtime = setInterval(()=>{	
				_self.data.bgcolor = _self.colorRound()
				},_self.data.bgspeed);
			}
			if(_self.data.dmchecked){
				dmtime = setInterval(()=>{
				 _self.data.dmcolor = _self.colorRound()
				},_self.data.dmspeed);
			}
			plus.navigator.setFullscreen(true);
		},
		onHide() {
			console.log("页面隐藏")
			// clearInterval(bgtime)
			// clearInterval(dmtime)
		},
		onUnload() {
			console.log("页面卸载")
			clearInterval(bgtime)
			clearInterval(dmtime)
			clearInterval(time)
		},
		data() {
			return {
				data: {
					text: ['皮皮工具箱'],
					bgcolor: "rgb(25,255,255)",
					dmcolor: "rgb(0,0,0)",
					speed: 50,
					bgchecked: false,
					dmchecked: false,
					bgspeed: 50,
					dmspeed: 50,
					size: 500,
					roll: false
				},
				quit: false
				
			}
		},
		methods: {
			colorRound(){
				 var r = Math.floor(Math.random()*255);
				 var g = Math.floor(Math.random()*255);
				 var b = Math.floor(Math.random()*255);
				 var color = 'rgba('+ r +','+ g +','+ b +',1)';
				 return color
			  },
			  quitF(){
				if(!_self.quit){
					  console.log("触发")
					  _self.quit = true
					  clearInterval(time)
					time =  setInterval(function(e){
						     _self.quit = false
						    console.log("结束")
					  },3000)
				  }
			  },
			  exit(){
				 console.log("退出")
				 plus.navigator.setFullscreen(false)
				 uni.navigateBack({
				     delta: 1
				 });
			  }
		}
	}
</script>

<style  scoped>
.marquee {
  width: 100vh; /* width based on screen height */
  transform:rotate(90deg) translateY(calc(-50% - 50vw)); /* rotate and center */
  transform-origin:top left;
}
 .text-oneLine{
		display:block;            /*内联对象需加*/
		word-break:keep-all;      /* 不换行 */
		white-space:nowrap;       /* 不换行 */
		overflow:hidden;          /* 内容超出宽度时隐藏超出部分的内容 */
  }
.close {
	z-index: 1;
    position: absolute;
    right: 25px;
    top: 25px;
    width: 50px;
    height: 50px;
    background: silver;
    border-radius: 25px;
    box-shadow: 0px 0px 0px 0px black;
    cursor: pointer;
}

.close:before {
    position: absolute;
    content: '';
    width: 30px;
    height: 10px;
    background: white;
    transform: rotate(45deg);
    top: 20px;
    left: 10px;
}
.close:after{
    content: '';
    position: absolute;
    width: 30px;
    height: 10px;
    background: white;
    transform: rotate(-45deg);
    top: 20px;
    left: 10px;
}
</style>
