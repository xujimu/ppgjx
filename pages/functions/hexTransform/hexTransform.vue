<template>
	<view>
		<view class="cu-form-group ">
			<view class="title">类型</view>
			<picker @change="typeF" :value="typeIndex" :range="type" range-key="value">
				<view class="picker">
					{{type[typeIndex].value}}
				</view> 
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">进制:</view>
			<input maxlength="-1"  @input="onInput" v-model="text" placeholder="请输入进制数" style="text-align:right" ></input>
		</view>
		<u-divider >转换结果</u-divider>
		<view style="background-color: #FFFFFF;">
			<view class="cu-form-group"  :label="item.value"  v-for="(item, index) in type" v-if="[2,4,8,10,16,18,32].indexOf(item.id) != -1?true:false">
				<view  class="title">{{item.value}}</view>
				<input maxlength="-1" v-model="item.hex" style="text-align:right" ></input>
			</view>
		</view> 
		
		<view class="cu-form-group ">
			<view class="title">指定进制结果:&nbsp;&nbsp;{{type[resIndex].hex}}</view>
			<picker @change="resF" :value="resIndex" :range="type" range-key="value">
				<view class="picker">
					{{type[resIndex].value}}
				</view> 
			</picker>
		</view>
	</view>
</template>


<script>
	var _self;
	export default {
		onLoad() {
			_self = this
		},
		data() {
			return {
				resIndex: 34,
				text:'',
				typeIndex: 8,
				type: [
					{'id': 2,'value':'二进制',hex: 0},
					{'id': 3,'value':'三进制',hex: 0},
					{'id': 4,'value':'四进制',hex: 0},
					{'id': 5,'value':'五进制',hex: 0},
					{'id': 6,'value':'六进制',hex: 0},
					{'id': 7,'value':'七进制',hex: 0},
					{'id': 8,'value':'八进制',hex: 0},
					{'id': 9,'value':'九进制',hex: 0},
					{'id': 10,'value':'十进制',hex: 0},
					{'id': 11,'value':'十一进制',hex: 0},
					{'id': 12,'value':'十二进制',hex: 0},
					{'id': 13,'value':'十三进制',hex: 0},
					{'id': 14,'value':'十四进制',hex: 0},
					{'id': 15,'value':'十五进制',hex: 0},
					{'id': 16,'value':'十六进制',hex: 0},
					{'id': 17,'value':'十七进制',hex: 0},
					{'id': 18,'value':'十八进制',hex: 0},
					{'id': 19,'value':'十九进制',hex: 0},
					{'id': 20,'value':'二十进制',hex: 0},
					{'id': 21,'value':'二十一制',hex: 0},
					{'id': 22,'value':'二十二制',hex: 0},
					{'id': 23,'value':'二十三制',hex: 0},
					{'id': 24,'value':'二十四制',hex: 0},
					{'id': 25,'value':'二十五制',hex: 0},
					{'id': 26,'value':'二十六制',hex: 0},
					{'id': 27,'value':'二十七制',hex: 0},
					{'id': 28,'value':'二十八制',hex: 0},
					{'id': 29,'value':'二十九制',hex: 0},
					{'id': 30,'value':'三十进制',hex: 0}, 
					{'id': 31,'value':'三十一进制',hex: 0},
					{'id': 32,'value':'三十二进制',hex: 0},
					{'id': 33,'value':'三十三进制',hex: 0},
					{'id': 34,'value':'三十四进制',hex: 0},
					{'id': 35,'value':'三十五进制',hex: 0},
					{'id': 36,'value':'三十六进制',hex: 0}
				],
			}
		},
		methods: {
			typeF(e){
				_self.typeIndex = e.detail.value
				_self.onInput()
				console.log(_self.typeIndex)
			},
			resF(e){
				_self.resIndex = e.detail.value
				
				console.log(_self.resIndex)
			},
			onInput(e){
				var id =  _self.type[_self.typeIndex].id
				var value =  _self.text
				var hex10 = parseInt(value,id)
				
				console.log("进制值" + value+ " 类型" + id)
				console.log("十进制" + hex10)
				_self.type.forEach(function(item,index){
					_self.type[index].hex = hex10.toString(item.id)
				})
			}
		}
	}
</script>

<style>

</style>
