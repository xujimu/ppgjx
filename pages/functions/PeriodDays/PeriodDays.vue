<!-- 
	2021/7/27
	liubin
	820565510@qq.com 
-->
<template>
	<view>
		<view class="cu-form-group">
			<view class="title">开始时间:</view>
			<picker mode="date" :value="startDate" :start="startTime" @change="startBindDateChange">
				<view class="uni-input">{{startDate}}</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">结束时间:</view>
			<picker mode="date" :value="endDate" :start="startTime" @change="endBindDateChange">
				<view class="uni-input">{{endDate}}</view>
			</picker>
		</view>
		<view class="padding flex flex-direction bg-white top">
			<button class="cu-btn  bg-blue margin-tb-sm lg" @tap="count">计算</button>
		</view>
		<view class="cu-form-group">
			<textarea maxlength="-1" v-model="res" placeholder="计算结果"></textarea>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				startDate: currentDate,
				endDate: currentDate,
				res: ''
			}
		},
		computed: {
			startTime() {
				return this.getDate('start');
			},
		},
		onLoad() {

		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			startBindDateChange(e) {
				this.startDate = e.target.value
			},
			endBindDateChange(e) {
				this.endDate = e.target.value
			},
			count() {
				var startDate = Date.parse(this.startDate);
				var endDate = Date.parse(this.endDate);
				var dateSpan = startDate - endDate;
				var dateSpan = Math.abs(dateSpan);
				var iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
				this.res=this.startDate+"与"+this.endDate+"相距"+iDays+"天";
			}
		}
	}
</script>

<style>

</style>
