<template>
	
	<u-cell-group>
		<view  @longpress="logoTime(index)"  v-for="(item,index) in list" @tap="skip(list[index])">
			<u-cell-item   :title="list[index].name" ></u-cell-item>
		</view>
		
	</u-cell-group> 
	 
</template>

<script>
	var _self
	export default {
		onNavigationBarButtonTap(e) {
			console.log("触发")
			_self.navto('/pages/functions/divCalculate/add?data=' + e +'&type=0')
		},   
		components: {
		
		},
		onLoad() {
			_self = this
			_self.hint("divCalculate","本功能数据为本地储存,如果您卸载了软件,您制作的公式将会丢失")
		},
		onShow() {
			plus.sqlite.selectSql({
				name: 'ppgjx',
				sql: 'select * from div_calculate',
				success: function(data){
					console.log('selectSql success: ');
					_self.list = data
					console.log(data)
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
				list:[
					
				]
			}
		},
		methods: {
			skip(e){
				console.log("跳转之前data")
				console.log(e)
				_self.navto('/pages/functions/divCalculate/add?data=' + JSON.stringify(e) + '&type=1')
			},
			logoTime(index){
				uni.showModal({
				    title: '提示',
				    content: '您确定要删除 ' + _self.list[index].name + " 吗?",
				    success: function (res) {
				        if (res.confirm) {
				           plus.sqlite.executeSql({
				           		name: 'ppgjx',  
				           		sql: "delete from  div_calculate where guid = '" + _self.list[index].guid +  "'",  
				           		success: function(e){   
				           			plus.nativeUI.toast("删除成功");
									_self.list.splice(index,1)
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
	
</style>