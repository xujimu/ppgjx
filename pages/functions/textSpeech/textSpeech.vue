<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		<view class="cu-bar bg-white" @click="downmp4">
			<view class='action' >
				<text class='cuIcon-title text-blue' ></text>配音文字
			</view>
		</view>
		<view class="cu-form-group align-start top" >
			<view class="title"></view>
			<textarea maxlength="300"  @input="textareaBInput" placeholder="规范使用标点符号,配音更准确,请注意英文场景无法合成中文"></textarea>
			<view class="action">
				{{textleng}}/300
			</view>
		</view>
		
		<view class="cu-form-group "> 
			<view class="title ">选择发音人</view>
			<view :class="playIcon" @click="playIconF"></view>
			<picker @change="voiceF" :value="voiceIndex" :range="voiceV" range-key="name">
				<view class="picker">
					{{voiceV[voiceIndex].name}}
				</view> 
			</picker>
		</view>

	
		<view class="cu-form-group ">
			<view class="title">音量: {{volume}}</view>
			<view class="wrap" style="width: 400rpx;">
				<u-slider v-model="volume" ></u-slider>
			</view>
		</view>
		
		<view class="cu-form-group ">
			<view class="title">语速: {{speech_rate}}</view>
			<view class="wrap" style="width: 400rpx;">
				<u-slider v-model="speech_rate"  ></u-slider>
			</view>
		</view>
		 
		<view class="cu-form-group ">
			<view class="title">语调: {{pitch_rate}}</view>
			<view class="wrap" style="width: 400rpx;">
				<u-slider v-model="pitch_rate"  ></u-slider>
			</view>
		</view>
		
		
			
		<view class="padding flex flex-direction bg-white top">
			<button class="cu-btn  bg-blue margin-tb-sm lg" :disabled="text == ''?true:false" @click="tap">开始合成</button>
			<button v-if = "url" class="cu-btn bg-green margin-tb-sm lg " @click="test" :loading="load">试听</button>
			<button v-if = "url" class="cu-btn bg-green margin-tb-sm lg" @click="copy">复制下载链接</button>
		</view>
		
	</view>
</template>

<script>
	var _self;
	const innerAudioContext = uni.createInnerAudioContext();
	
	export default {
		onLoad() {
			_self = this
			innerAudioContext.onPlay(() => {
			  console.log('开始播放');
			 
			
			})
			innerAudioContext.onEnded(() => {
			  _self.playIcon = 'cuIcon-playfill'
			  console.log('结束');
			  _self.load = false
			})
		},
		onUnload() {
			innerAudioContext.stop();
		  },
		data() { 
			return {
				playIcon: 'cuIcon-playfill',
				volume:50,
				speech_rate:50,
				pitch_rate:50,
				text:"",
				textleng:0,
				voiceV:[
					{name:"标准女声-通用场景-小云",value:"Xiaoyun",type:"aliyun"},
					{name:"标准男声-通用场景-小刚",value:"Xiaogang",type:"aliyun"},
					{name:"温柔女声-通用场景-若兮",value:"Ruoxi",type:"aliyun"},
					{name:"温柔女声-通用场景-思琪",value:"Siqi",type:"aliyun"},
					{name:"标准女声-通用场景-思佳",value:"Sijia",type:"aliyun"},
					{name:"标准男声-通用场景-思诚",value:"Sicheng",type:"aliyun"},
					{name:"温柔女声-通用场景-艾琪",value:"Aiqi",type:"aliyun"},
					{name:"标准女声-通用场景-艾佳",value:"Aijia",type:"aliyun"},
					{name:"标准男声-通用场景-艾诚",value:"Aicheng",type:"aliyun"},
					{name:"标准男声-通用场景-艾达",value:"Aida",type:"aliyun"},
					{name:"标准女声-通用场景-宁儿",value:"Ninger",type:"aliyun"},
					{name:"标准女声-通用场景-瑞琳",value:"Ruilin",type:"aliyun"},
					{name:"温柔女声-客服场景-思悦",value:"Siyue",type:"aliyun"},
					{name:"严厉女声-客服场景-艾雅",value:"Aiya",type:"aliyun"},
					{name:"亲和女声-客服场景-艾夏",value:"Aixia",type:"aliyun"},
					{name:"甜美女声-客服场景-艾美",value:"Aimei",type:"aliyun"},
					{name:"自然女声-客服场景-艾雨",value:"Aiyu",type:"aliyun"},
					{name:"温柔女声-客服场景-艾悦",value:"Aiyue",type:"aliyun"}, 
					{name:"严厉女声-客服场景-艾婧",value:"Aijing",type:"aliyun"},
					{name:"甜美女声-客服场景-小美",value:"Xiaomei",type:"aliyun"},
					{name:"浙普女声-客服场景-艾娜",value:"Aina",type:"aliyun"},
					{name:"浙普女声-客服场景-伊娜",value:"Yina",type:"aliyun"},
					{name:"严厉女声-客服场景-思婧",value:"Sijing",type:"aliyun"},
					{name:"儿童音-童声场景-思彤",value:"Sitong",type:"aliyun"},
					{name:"萝莉女声-童声场景-小北",value:"Xiaobei",type:"aliyun"},
					{name:"儿童音-童声场景-艾彤",value:"Aitong",type:"aliyun"},
					{name:"萝莉女声-童声场景-艾薇",value:"Aiwei",type:"aliyun"},
					{name:"萝莉女声-童声场景-艾宝",value:"Aibao",type:"aliyun"},
					{name:"英音男声-英文场景-Harry-仅支持英语",value:"Harry",type:"aliyun"},
					{name:"美音女声-英文场景-Abby-仅支持英语",value:"Abby",type:"aliyun"},
					{name:"美音男声-英文场景-Andy-仅支持英语",value:"Andy",type:"aliyun"},
					{name:"英音男声-英文场景-Eric-仅支持英语",value:"Eric",type:"aliyun"},
					{name:"英音女声-英文场景-Emily-仅支持英语",value:"Emily",type:"aliyun"},
					{name:"英音女声-英文场景-Luna-仅支持英语",value:"Luna",type:"aliyun"},
					{name:"英音男声-英文场景-Luca-仅支持英语",value:"Luca",type:"aliyun"},
					{name:"英音女声-英文场景-Wendy-仅支持英语",value:"Wendy",type:"aliyun"},
					{name:"英音男声-英文场景-William-仅支持英语",value:"William",type:"aliyun"},
					{name:"英音女声-英文场景-Olivia-仅支持英语",value:"Olivia",type:"aliyun"},
					{name:"粤语女声-方言场景-姗姗",value:"Shanshan",type:"aliyun"},
					{name:"四川话女声-方言场景-小玥",value:"Xiaoyue",type:"aliyun"},
					{name:"英中双语女声-英文场景-Lydia",value:"Lydia",type:"aliyun"},
					{name:"自然男声-客服场景-艾硕",value:"Aishuo",type:"aliyun"},
					{name:"台湾话女声-方言场景-青青",value:"Qingqing",type:"aliyun"},
					{name:"东北话女声-方言场景-翠姐",value:"Cuijie",type:"aliyun"},
					{name:"湖南重口音男声-方言场景-小泽",value:"Xiaoze",type:"aliyun"},
					{name:"日语女声-文学场景-智香",value:"Tomoka",type:"aliyun"},
					{name:"日语男声-文学场景-智也",value:"Tomoya",type:"aliyun"},
					{name:"美语女声-文学场景-Annie-仅支持英语",value:"Annie",type:"aliyun"}
				],
				voiceIndex:0,
				url:"",
				load:false
				 
			}
		},
		methods: {
			playIconF(){
				if(_self.playIcon == 'cuIcon-playfill'){
					_self.load = false
					_self.playIcon = 'cuIcon-stop'
					innerAudioContext.src = _self.domain + '/static/audio/text_speech/' +  _self.voiceV[_self.voiceIndex].value + '.mp3';
					innerAudioContext.play()
				}else{
					_self.load = false
					_self.playIcon = 'cuIcon-playfill'
					innerAudioContext.stop()
				}
			},
			textareaBInput(e){
				console.log(e.detail.value)
				_self.text = e.detail.value
				_self.textleng = _self.text.length
			},
			downmp4(){
				_self.show = true
			},
			voiceF(e){
				_self.voiceIndex = e.detail.value
			},
			test(){
				_self.load = true
				_self.playIcon = 'cuIcon-playfill'
				innerAudioContext.autoplay = true;
				innerAudioContext.src = _self.url;
				innerAudioContext.play()
			},
			copy(){
				uni.setClipboardData({
				    data: _self.url,
				    success: function () {
				        uni.showToast({
				        	title: '已复制',
				        	duration: 2000
				        });
				    }
				});
			},
			tap(){
				var value = _self.text
				var voice = _self.voiceV[_self.voiceIndex].value;
				var volume = _self.volume
				var speech_rate = (_self.speech_rate - 50) * 10 
				var pitch_rate = (_self.pitch_rate - 50) * 10  
				console.log("开始合成:发音人:" + voice + "音量:" + volume + "语速:" + speech_rate + "语调:" + pitch_rate )
				innerAudioContext.stop()
				_self.load = false
				_self.url = ""
				uni.showLoading({
				    title: '合成中'
				});
				_self.xhttp.request({
					url: "/functions/tts/v1/textSpeech", //仅为示例，并非真实接口地址。
					method:"POST",
					data: {
						value:value,
						voice:voice,
						volume:volume, 
						speech_rate:speech_rate,
						pitch_rate:pitch_rate,
						type:1
					},
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(res => {
					console.log(res)
					if(res.data.code == 0){
						_self.url = res.data.data
					}
					uni.hideLoading(); 
				}).catch(err => {
					uni.hideLoading(); 
				})
			}
		}
	}
</script>

<style scoped lang="scss">

.top{
	margin-top: 2rpx;
}

button{
	border-radius: 0;
}


</style>
