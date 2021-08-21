<template>
	<view>
		<view class="grace-btdialog-shade" @touchmove.stop.prevent="" v-if="show">
			<view class="pickerView dialog" v-show="isPicker">
				<view class="pickerHeaderTitle">
					<view class="close" @click="closeDialog">取消</view>
					<view class="actionBtn">
						<view :class="['solar', lunar === 'solar' ? 'current' : '']" @click="tabCalendar('solar')">公历</view>
						<view :class="['lunar', lunar === 'lunar' ? 'current' : '']" @click="tabCalendar('lunar')">农历</view>
					</view>
					<view class="confirm" @click="confirm">确定</view>
				</view>
				
				<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" style="width:750upx; height: 400upx;">
					<picker-view-column>
						<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
					</picker-view-column>
					<picker-view-column v-if="isHourShow">
						<view class="item" v-for="(item,index) in hours" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column v-if="isMinShow">
						<view class="item" v-for="(item,index) in mins" :key="index">{{item}}分</view>
					</picker-view-column>
				</picker-view>
			</view>
			<view class="confirmView dialog" v-show="!isPicker">
				<view class="pickerHeaderTitle" style="text-align: center; color: rgb(201, 23, 35);">确认时间</view>
				<view style="background: #FFFFFF; padding: 20upx; text-align: center;">
					<view class="confirmSubTitle">请确认输入的时间是否正确</view>
					<view class="solar"><text>公(阳)历：</text>{{solarDate}}</view>
					<view class="lunar"><text>农(阴)历：</text>{{lunarDate}}</view>
					<view class="buttons">
						<view class="blak" @click.stop="blak">返回修改</view>
						<view class="confirm" @click.stop="confirmDialog">确认正确</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import render from './calendar-data/render.js';
	let date = new Date();
	export default {
		name: "quick-calendar",
		props: {
			show : {
				type : Boolean,
				default : false
			},
			date : {
				type : String,
				default : date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
			},
			time : {
				type : String,
				default : ''
			},
			isHourShow : {
				type : Boolean,
				default : false
			},
			isMinShow : {
				type : Boolean,
				default : false
			},
			lunarType : {
				type : String,
				default : 'number' //number or words
			}
		},
		data() {
			return {
				years: [],
				months: [],
				days: [],
				year: '',
				month: '',
				day: '',
				
				hours: [],
				mins: [],
				hour: '',
				min: '',
				
				value: [],//当前选择的五类下标【可以是3类、3类】

				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/80))}px;`,
				
				lunar: 'solar',
				isPicker: true,
				solarDate: "",//国历最后时间
				lunarDate: "",//农历最终时间
				returnDate: "",//返回页面的日期
				returnTime: "",//返回页面的时间
			}
		},
		created:function(){
			this.init();
		},
		watch: {
			isHourShow(){
				this.init();
			},
			isMinShow(){
				this.init();
			},
			lunarType(){
				this.init();
			}
		},
		methods: {
			init: function() {
				date = new Date(this.date + ' ' + this.time.replace("-", ":"));
				this.year = date.getFullYear();
				this.month = date.getMonth() + 1;
				this.day = date.getDate();
				if(this.isHourShow) this.hour = date.getHours();
				if(this.isMinShow) this.min = date.getMinutes();
				
				let solarCalendar = render.init(this.lunar, 1900, 2100, this.year, this.month, this.day, this.hour, this.min, this.isHourShow, this.isMinShow, false, this.lunarType);
				
				this.years = solarCalendar.years;
				this.months = solarCalendar.months;
				this.days = solarCalendar.days;
				this.hours = solarCalendar.hours;
				this.mins = solarCalendar.mins;
				
				this.year = solarCalendar.years[solarCalendar.yearIndex];
				this.month = solarCalendar.months[solarCalendar.monthIndex];
				this.day = solarCalendar.days[solarCalendar.dayIndex];
				this.hour = solarCalendar.hourIndex;
				this.min = solarCalendar.minIndex;
				this.value = [solarCalendar.yearIndex, solarCalendar.monthIndex, solarCalendar.dayIndex, solarCalendar.hourIndex, solarCalendar.minIndex];
			},
			bindChange: function(e) {
				this.year = this.years[e.detail.value[0]];
				this.month = this.months[e.detail.value[1]];
				this.day = this.days[e.detail.value[2]];
				this.hour = e.detail.value[3];
				this.min = e.detail.value[4];
				
				//因为天数可能会变化
				let solarCalendar = render.init(this.lunar, 1900, 2100, this.year, this.month, this.day, this.hour, this.min, this.isHourShow, this.isMinShow, false, this.lunarType);
			
				this.years = solarCalendar.years;
				this.months = solarCalendar.months;
				this.days = solarCalendar.days;
				this.hours = solarCalendar.hours;
				this.mins = solarCalendar.mins;
			},
			tabCalendar: function (tab) {
				if(this.lunar === tab) return false;//同类不能重复转换
				
				this.lunar = tab;
				
				let solarCalendar = render.init(this.lunar, 1900, 2100, this.year, this.month, this.day, this.hour, this.min, this.isHourShow, this.isMinShow, true, this.lunarType);

				this.years = solarCalendar.years;
				this.year = solarCalendar.years[solarCalendar.yearIndex];
				this.months = solarCalendar.months;
				this.month = solarCalendar.months[solarCalendar.monthIndex];
				this.days = solarCalendar.days;
				this.day = solarCalendar.days[solarCalendar.dayIndex];
				this.hours = solarCalendar.hours;
				this.hour = solarCalendar.hourIndex;
				this.mins = solarCalendar.mins;
				this.min = solarCalendar.minIndex;
				this.value = [solarCalendar.yearIndex, solarCalendar.monthIndex, solarCalendar.dayIndex, solarCalendar.hourIndex, solarCalendar.minIndex];
			},
			confirm: function() {
				this.isPicker = false;
				
				if(this.lunar === 'solar') {
					this.solarDate = this.year + '年' + this.month + '月' + this.day + '日';
					this.returnDate = this.year + '/' + this.month + '/' + this.day;
					
					if(this.isHourShow === true) this.solarDate += this.hours[this.hour];
					if(this.isMinShow === true) this.solarDate += this.min + '分';
					
					let toValues = render.submit(this.lunar, this.year, this.month, this.day, this.hour, this.min, this.isHourShow, this.isMinShow);
					this.lunarDate = toValues.text;
					this.returnTime = toValues.hour + '/' + toValues.min;
				}else{
					this.lunarDate = this.year + '年' + this.month + '月' + this.day + '日';
					if(this.isHourShow === true) this.lunarDate += this.hours[this.hour];
					if(this.isMinShow === true) this.lunarDate += this.min + '分';
					
					let toValues = render.submit(this.lunar, this.year, this.month, this.day, this.hour, this.min, this.isHourShow, this.isMinShow);
					this.solarDate = toValues.text;
					this.returnDate = toValues.year + '/' + toValues.month + '/' + toValues.day;
					this.returnTime = toValues.hour + '/' + toValues.min;
				}
			},
			blak: function() {
				this.isPicker = true;
				this.lunarDate = "";
				this.solarDate = "";
			},
			closeDialog: function() {
				this.$emit('closeDialog');
			},
			confirmDialog: function() {
				this.$emit('confirmDialog', {date:this.returnDate, time:this.returnTime});
			}
		}
	}
</script>

<style>
.grace-btdialog-shade{position:fixed; width:100%; height:100%; left:0; top:0; z-index:9991; background:rgba(0, 0, 0, 0.5);}
.grace-btdialog-shade .dialog{width:100%; height:auto; background:#FFFFFF; position:absolute; bottom:0; left:0;}
.pickerHeaderTitle {
	background: #FFFFFF;
	border-bottom: 1upx solid #E8E8E8;
	width: 710upx;
	height: 88upx;
	line-height: 88upx;
	padding: 0upx 20upx;
	font-size: 32upx;
}
.pickerHeaderTitle .close {
	width: 20%;
	float: left;
	text-align: left;
	color: rgb(153, 153, 153);
	cursor: pointer;
}
.pickerHeaderTitle .actionBtn {
	width: 60%;
	float: left;
	display: flex;
	flex-direction: row;
	justify-content: center;
}
.pickerHeaderTitle .actionBtn .solar{
	/* height: 40upx; */
	line-height: 40upx;
	margin-top: 10upx;
	padding: 10upx 30upx;
	border: 1upx solid rgb(201, 23, 35);
	border-top-left-radius: 10upx;
	border-bottom-left-radius: 10upx;
	color: rgb(201, 23, 35);
}
.pickerHeaderTitle .actionBtn .lunar{
	/* height: 40upx; */
	line-height: 40upx;
	margin-top: 10upx;
	padding: 10upx 30upx;
	border: 1upx solid rgb(201, 23, 35);
	border-top-right-radius: 10upx;
	border-bottom-right-radius: 10upx;
	color: rgb(201, 23, 35);
}
.pickerHeaderTitle .actionBtn .current {
	background: rgb(201, 23, 35);
	color: #FFFFFF;
}


.pickerHeaderTitle .confirm  {
	width: 20%;
	float: left;
	text-align: right;
	color: rgb(201, 23, 35);
	cursor: pointer;
}
.item {
	line-height: 80upx;
	text-align: center;
	font-size: 28upx;
}

.confirmSubTitle {font-size: 34upx; color: #000000; line-height: 48upx; margin-top: 48upx; padding-bottom: 20upx;}
.confirmView .solar, .confirmView .lunar {font-size: 34upx; color: rgb(163, 30, 26); line-height: 34upx; padding: 10upx 0upx;}
.confirmView .buttons {padding: 40upx 0upx; display: flex; flex-direction: row; justify-content: center; color: #FFFFFF; font-size: 34upx;}
.confirmView .buttons .blak {display: inline-block; padding: 20upx 40upx; border-radius: 10upx; background: #DDDDDD;}
.confirmView .buttons .confirm {display: inline-block; padding: 20upx 40upx; margin-left: 40upx; border-radius: 10upx; background: rgb(163, 30, 26);}
</style>
