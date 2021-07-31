<!-- 
	2021/7/27
	liubin
	820565510@qq.com 
-->
<template>
	<view>
		<z-calendar :dateTag="dateTag" howManyMonth="12" @changeDate="changeDate" :defaultSelect="defaultSelectDate"
			mode="1">
		</z-calendar>
		<view v-if="isShow" class="cu-form-group">
			<textarea placeholder-style="color:#ff7df2" style="min-height: 20vh;" maxlength="-1" v-model="remark"
				placeholder="备注信息"></textarea>
		</view>
		<view v-if="isShow" class="padding flex flex-direction bg-white top">
			<button style="background-color:#ff7df2 ;" class="cu-btn  bg-blue margin-tb-sm lg" @tap="save">保存</button>
		</view>
	</view>
</template>

<script>
	import zCalendar from "@/components/njzz-calendar/njzz-calendar.vue"
	export default {
		components: {
			zCalendar
		},
		data() {
			return {
				dateTag: [],
				selectDate: '',
				remark: '',
				allData: [],
				today:'',
				isInit:false,
				isShow:true
			};
		},
		computed: {
			defaultSelectDate() {
				if(this.isInit){
					return;
				}else{
					return this.getDate();
				}
			},
		},
		onLoad() {
			this.isShow=false;
			this.selectData();
		},
		methods: {
			changeDate(data) {
				var that = this;
				that.isShow=true;
				this.selectDate = data.date;
				var allData = that.allData;
				for (let index in that.allData) {
					var item = allData[index];
					if (item.date == data.date) {
						that.remark = item.remark;
						that.isShow=true;
						break;
					}else{
						that.remark = '';
					}
				}
				if (data.tag) {
					return;
				}
				if(data.date>that.today){
					that.isShow=false;
					return;
				}
				uni.showActionSheet({
					itemList: ['姨妈来了', '姨妈走了'],
					success: function(res) {
						var index = res.tapIndex;
						data.tag = index == 0 ? '姨妈来了' : '姨妈走了';
						data.remark = '';
						that.createData(data);
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			createData(data) {
				var _self = this;
				var guid = _self.$u.guid()
				plus.sqlite.executeSql({
					name: 'ppgjx',
					sql: "insert into womanRecord values('" + guid + "','" + data.date + "','" + data.tag + "','" +
						data.remark + "','" + _self.$u.date(Date.now(), 'yyyy-mm-dd MM:ss') + "')",
					success: function(e) {
						_self.selectData();
						uni.showToast({
							title: '添加成功',
							duration: 2000
						});
					},
					fail: function(e) {
						console.log(e)
					}
				});
			},
			selectData() {
				var that = this;
				plus.sqlite.selectSql({
					name: 'ppgjx',
					sql: 'select * from womanRecord',
					success: function(data) {
						that.dateTag = data;
						that.allData = data;
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
			},
			updateData() {
				var that = this;
				var data = {
					date: that.selectDate,
					remark: that.remark
				}
				console.log(data)
				plus.sqlite.selectSql({
					name: 'ppgjx',
					sql: "update womanRecord set remark='" + data.remark + "' " + "where date='" + data.date +
						"';",
					success: function(data) {
						that.selectData();
						uni.showToast({
							title: '保存成功',
							duration: 2000
						});
					},
					fail: function(e) {
						console.log('selectSql failed: ' + JSON.stringify(e));
					}
				});
			},
			save() {
				this.updateData()
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				this.selectDate = `${year}-${month}-${day}`;
				this.today = `${year}-${month}-${day}`;
				var data = {
					date: this.selectDate,
					tag: '-1'
				};
				this.changeDate(data);
				this.isInit=true;	
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>

</style>
