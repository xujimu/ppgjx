<template>
	
	<view>
		<view class="cu-bar bg-white" style="margin-bottom: 20rpx;">
			<view class='action' >
				<text class='cuIcon-title text-blue' ></text>公式：{{formulaValue}}
			</view>
		</view>
		<view class="bg-white" v-for="(item,index) in data">
			<u-field v-if="data[index].type == 0" :label="data[index].name" v-model="data[index].value" :placeholder="data[index].placeholder"></u-field>
			<view  class="cu-form-group bg-white" style="margin-bottom: 3rpx;"  v-if="data[index].type == 1">
				<view class="title">符</view>
				<picker @change="symbolF($event,index)" :value="data[index].symbolIndex" :range="symbol" range-key="value">
					<view class="picker">
						{{symbol[data[index].symbolIndex].value}}
					</view> 
				</picker>
			</view>
			
			<view v-if="data[index].type == 2" >
				<u-field view v-for="(item1,index1) in data[index].data.list" :label="data[index].data.list[index1].name" v-model="data[index].data.list[index1].value" :placeholder="data[index].data.list[index1].placeholder"></u-field>
			</view>
			
		</view>
		<u-select mode="single-column" v-model="formulaShow" :list="formula" @confirm="confirm"></u-select>
		<view class="padding flex flex-direction bg-white top">
			<button class="cu-btn  bg-blue margin-tb-sm lg" :disabled="data == ''?true:false" @click="tap">计算</button>
		</view>
		
		<view class="cu-form-group " style="margin: 20upx 20upx;border-radius:18upx;">
			<textarea maxlength="-1" v-model="res" placeholder="计算结果"></textarea>
		</view>
		<view @click="help()" style="text-align: right;margin-right: 20rpx;">
			<u-tag text="不会使用?" type="success" bg-color="#ffffff" border-color="#0081ff" color="#0081ff" />
		</view>
	</view>
	
	
</template> 

<script>
	var _self
	var sqldata
	export default {
		onNavigationBarButtonTap(e) {
			console.log("新增参数",e)
			switch (e.index){
				case 0:
					plus.nativeUI.actionSheet(
						{title:"操作",
						cancel:"取消",
						buttons:[ 
							{
								title:"添加参数"
							},{
								title:"添加运算符"
							},{
								title:"添加函数"
							}
						]},
						function(e){
							switch(e.index){
								case 1:
									plus.nativeUI.prompt("请输入名称：如 长 宽 高", function(e){
											console.log(e)
											if(e.index==0){
												console.log("取消")	
											}else{
												console.log("确定")
												if(e.index){
													_self.data.push({"name":e.value,"placeholder":"请输入",value:"",type: 0})
												}else{
													_self.code("名称不能为空哦！",true)
												}
												
											}
									}, "提示", "", ["取消","确定"]);
									break;
								case 2:
									_self.data.push({symbolIndex: 0,type: 1})
									break
								case 3:
									_self.formulaShow = true
									//_self.data.push({"name":e.value,"placeholder":"请输入" + e.value,value:"",type: 2})
							}
							console.log("选择: "+e.index);
						}
					);
					break;
				case 1:
					plus.nativeUI.prompt("请输入公式名", function(e){
							console.log(e)
							if(e.index==0){
								console.log("取消")	
							}else{
								console.log("确定")
								var guid = _self.$u.guid()
								var name =  e.value
								var data = JSON.stringify(_self.data)
								var remark = "无"
								var create_time = _self.$u.date(Date.now(), 'yyyy-mm-dd MM:ss')
								if(e.index){
									if(_self.type == 0){
										console.log("新增公式")
										plus.sqlite.executeSql({
												name: 'ppgjx', 
												sql: "insert into div_calculate values('" + guid + "','" + name + "','" + data + "','" + remark + "','" + create_time + "')", 
												success: function(e){   
													plus.nativeUI.toast("保存成功");
													uni.navigateBack({
														delta:1
													})
												},
												fail: function(e){  
													plus.nativeUI.toast("保存失败");
													console.log(JSON.stringify(e))
												}  
										}); 
										
									}else{
										console.log("保存",data)
										plus.sqlite.executeSql({
												name: 'ppgjx',  
												sql: "update div_calculate set name = '" + name + "' , data = '" + data + "' where guid = '" + sqldata.guid + "'",  
												success: function(e){   
													plus.nativeUI.toast("保存成功");
													console.log(e)
													uni.navigateBack({
														delta:1
													})
												},
												fail: function(e){  
													plus.nativeUI.toast("保存失败") 
													console.log(JSON.stringify(e))
												}  
										}); 
										
									}
								}else{
									_self.code("名称不能为空哦！",true)
								}
								
							}
					}, "提示", "", ["取消","确定"]);
					
						break;
					case 2:
						_self.data.pop()
						break;
			}			
		},   
		components: {
		
		},
		onLoad(option) {
			_self = this
			//判断是新增还是已有
			_self.type =  option.type 
			console.log(option.type)
			if(_self.type == 0){
				console.log("新增")
			}else{
				 sqldata = JSON.parse(option.data)
				_self.data = JSON.parse(sqldata.data)
				console.log("不新增")
			}
			
		},
		onShow() {
			
		}, 
		onUnload(){
			
		},
		watch:{
			data:{
				//解析公式
				handler(newName, oldName) {
					 _self.formulaValue = ""
					 _self.data.forEach(function(item,index){
						switch (item.type){
							case 0:
								console.log("参数",item)
								_self.formulaValue = _self.formulaValue + item.name + " "
								break;
							case 1:
								console.log("运算符",item)
								_self.formulaValue = _self.formulaValue + _self.symbol[item.symbolIndex].symbol + " "
								break;
							case 2:
								console.log("公式",item)
								item.data.list.forEach(function(item1,index1){
									console.log("list",item1)
									//开头加上开始括号
									if(index1 == 0){
										_self.formulaValue = _self.formulaValue + item.data.name + "("
									}
									//如果是最后一个参数就不加逗号
									if(index1 == item.data.list.length - 1){
										_self.formulaValue = _self.formulaValue + item1.name
									}else{
										_self.formulaValue = _self.formulaValue +  item1.name + ","
									}
									//结束加上括号
									if(index1 == item.data.list.length - 1){
										_self.formulaValue = _self.formulaValue + ") "
									}
								}) 
								break;
						}
					 })
				},
				deep:true
			}
		},
		data() {
			return {
				data:[
				
				],
				symbol:[
					{value:"加",symbol:"+"},
					{value:"减",symbol:"-"},
					{value:"乘",symbol:"*"},
					{value:"除以",symbol:"/"},
					{value:"(",symbol:"("},
					{value:")",symbol:")"}
				],
				symbolIndex: 0,
				formula:[
					{label: "幂函数",value:{name:"幂函数",func:"Math.pow",list:[{name:"底数",placeholder:"请输入底数",value:""},{name:"幂数",placeholder:"请输入幂数",value:""}]}},
					{label: "平方根函数",value:{name:"平方根函数",func:"Math.sqrt",list:[{name:"平方根",placeholder:"必须是大于等于 0 的数",value:""}]}},
				],
				formulaShow: false,
				formulaValue: '',
				res:'',
				type: 0
			}
		},
		methods: {
			help(){
				_self.navto('/pages/functions/divCalculate/help')
			},
			symbolF(e,index){
				console.log(e)
				console.log(index)
				_self.data[index].symbolIndex = e.detail.value
			},
			confirm(e) {
				_self.data.push({data:e[0].value,type:2})
			},
			tap(){
				var calculate = "";
				_self.data.forEach(function(item,index){
					console.log(item)
					
					switch (item.type){
						case 0:
							console.log("参数",item)
							calculate = calculate + item.value + " "
							break;
						case 1:
							console.log("运算符",item)
							calculate = calculate + _self.symbol[item.symbolIndex].symbol + " "
							break;
						case 2:
							console.log("公式",item)
							item.data.list.forEach(function(item1,index1){
								console.log("list",item1)
								//开头加上开始括号
								if(index1 == 0){
									calculate = calculate + item.data.func + "("
								}
								//如果是最后一个参数就不加逗号
								if(index1 == item.data.list.length - 1){
									calculate =calculate + item1.value
								}else{
									calculate = calculate +  item1.value + ","
								}
								//结束加上括号
								if(index1 == item.data.list.length - 1){
									calculate  = calculate + ") "
								}
							}) 
							break;
					}
				})
				console.log(calculate)
				
				try {
					
					_self.res = eval(calculate)
				  //运行代码
				
				} catch(err) {
					_self.code("计算错误,请检查公式是否正确或值是否填入",true)
				  //处理错误
				
				}
			}
		} 
	}
</script>

<style scoped>
	
</style>