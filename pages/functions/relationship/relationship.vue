<template>
	<view style="margin: 0px;">
		
		<view class="cu-bar  bg-white mag">
			<view class="action">
				<text class="text-blue"></text>计算类型
			</view>
			<view class="action">
				<radio-group  @change="typeChe()">
					<text class="uni-title ">找称呼</text>
					<radio class="form-radio"  checked="true"/>
					<text>找关系</text>
					<radio class="form-radio" />
				</radio-group>
			</view>
		</view>
		
		<view class="cu-bar  bg-white mag">
			<view class="action">
				<text class="text-blue"></text>我的性别
			</view>
			<view class="action">
				<radio-group  @change="sexChe()">
					<text class="uni-title ">男</text>
					<radio class="form-radio"   checked="true"/>
					<text>女</text>
					<radio class="form-radio"  />
				</radio-group>
			</view>
		</view>
		
		<view class="cu-bar  bg-white mag">
			<view class="action">
				<text class="text-blue"></text>称呼方式
			</view>
			<view class="action">
				<radio-group  @change="reverseChe()">
					<text class="uni-title ">我称呼对方</text>
					<radio class="form-radio" checked="true"/>
					<text>对方称呼我</text>
					<radio class="form-radio" />
				</radio-group>
			</view>
		</view>
		
		<view class="cu-form-group mag">
			<textarea   maxlength="-1"  v-model="data.text"  placeholder="称谓之间请使用'的'字分开"></textarea>
		</view>
		 
		<view class="cu-form-group">
			<textarea   maxlength="-1"  v-model="res" placeholder="计算结果"></textarea>
		</view>
		
		 
		<view style="position: fixed;bottom: 0px;width: 100%;font-size: 0px;background-color: #FFFFFF;">
			
			<button class="div_button" @click="select('爸爸')">爸爸</button>
			<button class="div_button" @click="select('妈妈')">妈妈</button>
			<button class="div_button" @click="select('儿子')">儿子</button>
			<button class="div_button" @click="select('女儿')">女儿</button>
			<button class="div_button" @click="select('姐姐')">姐姐</button>
			<button class="div_button" @click="select('妹妹')">妹妹</button>
			<button class="div_button" @click="select('老公')">老公</button>
			<button class="div_button" @click="select('老婆')">老婆</button>
			<button class="div_button" @click="select('哥哥')">哥哥</button>
			<button class="div_button" @click="select('弟弟')">弟弟</button>
			<button class="div_button" @click="rollback()"><text class="cuIcon-forward"></text></button>
			<button class="div_button" @click="reset()"><text class="cuIcon-refresh"></text></button>	
		</view>
		 
		
	</view>
</template> 

<script>
	var _self;
	let rela = require('@/static/js/relationship.min.js');
	export default {
		onLoad() {
			_self = this
		},
		data() {
			return {
				data:{
					text:'',		//输入的文本
					sex:1,			//自己的性别：0女性,1男性
					type:'default',		//转换类型：'default'算称谓,'chain'算关系(此时reverse无效)
					reverse:false,		//称呼方式：true对方称呼我,false我称呼对方
				},
				res:''
			} 
		},  
		watch:{
			data: {
				handler(newValue, oldValue){
					if(newValue.text == ""){
						_self.res = ""
					}else{
						_self.calculate()
					}
					console.log("触发")
				},
				deep:true
			}
		},
		methods: {
			typeChe(){
				if(_self.data.type == 'default'){
					_self.data.type = 'chain'
				}else{
					_self.data.type = 'default'
				}
				console.log(_self.data.type)
			},
			sexChe(){
				if(_self.data.sex == 1){
					_self.data.sex = 0
				}else{
					_self.data.sex = 1
				}
				console.log(_self.data.sex)
			},
			reverseChe(){
				if(_self.data.reverse == true){
					_self.data.reverse = false
				}else{
					_self.data.reverse = true
				}
				console.log(_self.data.reverse)
			},
			select(e){
				if(_self.data.text == ""){
					_self.data.text = e
				}else{
					_self.data.text = _self.data.text + "的" + e
				}  
			},
			calculate(){
				console.log("触发")
				 _self.res =  rela(_self.data)
				 if(_self.res == ''){
					 _self.res = '无法计算！'
					 
				 }
			},
			rollback(){
				_self.data.text = _self.data.text.slice(0, -3); 
			},
			reset(){
				_self.data.text = ""
				_self.res = ""
			}
		}
	}
</script>

<style>
	.mag{
		margin-bottom: 10upx;
	}
	.form-radio{
		transform:scale(0.8);
		margin: 0px 10upx;
		vertical-align: 1upx;
	}.div_button{
		display: inline-block;
		width: 25%; 
		background-color: #FFFFFF;
		border-radius:  0px;
	}
	button::after{
		border-radius:  0px;
		border: none; 
	}  
	button:active {
            background-color: #DDDDDD; 
        }
</style>
