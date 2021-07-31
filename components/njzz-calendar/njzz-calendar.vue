<template>
	<view class="calendar">
		<view class="calenHead-tradition" v-if="mode=='2'">
			<picker class="dateBox" mode="multiSelector" :range="pickerData.list" :value="pickerData.indexList" @change="bindPickerChange">
				<text class="font-big">{{nowMonth.month}}月</text>
				<text class="font-small">{{nowMonth.year}}年</text>
				<uni-icons type="arrowdown" size="10"></uni-icons>
			</picker>
			<text class="reset" @tap="reset">重置</text>
		</view>
		<scroll-view class="calenHead" scroll-x v-if="mode=='1'">
			<view class="headItem" v-for="(date,index) in monthList" v-bind:key="index" :class="[current==index?'active':'']" @tap="headItemTap(index)">
				<text>{{date.getMonth()+1}}月</text>
			</view>
		</scroll-view>
		<view class="weekBar">
			<view class="weekItem" v-for="(item,index) in weekSort" v-bind:key="index">
				{{item}}
			</view>
		</view>
		<view class="dayBox">
			<view class="day" v-for="(item,index) in space" v-bind:key="index+999"  @tap="selectDate(item)"></view>
			<view class="day" :class="[getDateStr(item.date)==getDateStr(dayActive.date)?'active':'']" v-for="(item,index) in dayList" v-bind:key="index" @tap="selectDate(item)">
				<view :class="[isToday(item.date)?'today':'',item.tag?'tag-tag':'']">{{isToday(item.date) ? "今天" : item.date.getDate()}}</view>
				<view class="calen-text-orange">{{item.tag?item.tag:''}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "../uni-icons/uni-icons.vue"
	/* import {uniIcons} from "../../components/uni-icons" */
	export default{
		components:{uniIcons},
		name:"Zcalendar",
		props:{
			themeColor:{ //主题色  并没有用到  留给以后用吧
				type:String,
				default:"#ff7df2"
			},
			dateTag:{ 
				type:Array,
				default:()=>[]
			},
			howManyMonth:{ //包含当月共显示几个月
				type:String,
				default:"6"
			},
			defaultSelect:{  //默认选择的日期
				type:String,
				default:""
			},
			mode:{
				type:String,
				default:"1"    //1:固定月份列表  2:传统日历模式(自由选择日期)
			}
		},
		data(){
			return{
				today:{},//今天日期
				weekSort:["日","一","二","三","四","五","六"],
				current:0, //当前选中的月份下标  团期模式
				nowMonth:{},
				dayActive:false, //选中的日期  {date:date,tag:string}  date需要自己格式化  method提供了 getDateStr(date)
				monthList:[],//月份列表 明确的说是 存放的是date对象
				space:0//周几占位个数  例如 周二占位2个
 			}
		},
		mounted() {
			this.today = new Date();
			this.nowMonth = {
				year:this.today.getFullYear(),
				month:(this.today.getMonth()+1<10)?"0"+(this.today.getMonth()+1) : this.today.getMonth()+1
			}
			this.setMonthList()
		},
		updated() {
			if(this.defaultSelect != "" && !this.dayActive){
				this.dayActive = this.getDefaultData(this.defaultSelect)
			}
		},
		computed: { 
		    monthDateTag: function () {
				//过滤出 每个月份的团期价格list 并且按照对象内的价格排序  以用来显示当前月份xxxx金额起,用于mode1
				let map = {}
				let _that = this;
				this.monthList.forEach((date,i)=>{
					let list = _that.dateTag.filter(item=>new Date(item.date).getFullYear()==date.getFullYear() && new Date(item.date).getMonth()==date.getMonth()).sort(function(a,b){
						return a.tag - b.tag
					})
					map[i] = list
				})
				return map
		    },
			dayList:function(){
				let list = [];
				let _that = this;
				let date = this.mode == "1" ? this.monthList[this.current] : this.mode == "2"? new Date(this.nowMonth.year+"-"+this.nowMonth.month+"-01"): new Date();
				if(this.monthList.length){
					list = this.getEveryDay(date)
					let num = list[0].date.getDay();
					_that.space = num;
				}
				return list
			},
			pickerData:function(){
				let now = new Date().getFullYear();
				//可选择前/后多少年
				let beforeYears = 0;
				let afterYears = 10;
				let list = []; //用来选择的数据
				let indexList = []; //默认选中的下标list
				let yearList = [];
				let monthList = ["01","02","03","04","05","06","07","08","09","10","11","12"];
				for(let i = now-beforeYears;i<=now+afterYears;i++){
					yearList.push(i.toString())
				}
				list.push(yearList)
				list.push(monthList)
				indexList.push(yearList.indexOf(""+this.nowMonth.year))  //我也不知道为什么 .toString()报错
				indexList.push(monthList.indexOf(""+this.nowMonth.month))
				let map = {
					indexList:indexList,
					list:list
				}
				return map;
			}
		},
		methods:{
			headItemTap(index){
				this.current = index
			},
			getDefaultData(d){ //设置初始值
				let list = this.dateTag.filter(item=>item.date==d);
				let obj={};
				if(list.length>0){      //逻辑依旧是保证没有团期（价格）的不能选中
					obj = {
						date:new Date(list[0].date),
						tag:list[0].tag
					}
				}else{
					obj = false
				}
				return obj;
			},
			isToday(date){
				return date.getFullYear()==this.today.getFullYear() && date.getMonth()==this.today.getMonth() && date.getDate() == this.today.getDate()
			},
			getDateStr(date){   //当前年 月 日
				if(date){
					let year = date.getFullYear();
					let month =(date.getMonth() + 1).toString();
					let day = (date.getDate()).toString();
					if (month.length == 1) {
					  month = "0" + month;
					}
					if (day.length == 1) {
					  day = "0" + day;
					}
					let dateTime = year + "-" + month + "-" + day;
					return dateTime;
				}
			},
			getNextMonth(date,num) {  //获取下几个月 第一天
				let now = new Date(date);
				let ds = new Date(now.setDate(1))
					ds = new Date(ds.setMonth(ds.getMonth() + num));
				let year = ds.getFullYear();
				let mon = ds.getMonth() + 1;
				let day = ds.getDate();
				let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + "01";
				let newDate = new Date(s)
				return newDate;
			},
			setMonthList(){
				let list = []
				let now = new Date() //以当前月份为第一个月   如果需要自定义开始月份修改这个就行
				for(let i=0;i<this.howManyMonth;i++){
					let month = this.getNextMonth(now,i)
					this.monthList.push(month)
				}
			},
			getEveryDay(date) { //获取月份每一天 date对象
				let _that = this;
				let dayArry = [];
				let d = date;
				let lastDay = new Date(d.getFullYear(),d.getMonth()+1 <10 ? "0"+(d.getMonth()+1):d.getMonth()+1,0).getDate()
				for (let k = 1; k <= lastDay; k++) {
					let tag = 0;
					_that.dateTag.forEach(item=>{
						if(item.date == _that.getDateStr(new Date(date.getFullYear(),date.getMonth(),k))){
							tag = item.tag
						}
					})
					dayArry.push(
						{
							date:new Date(date.getFullYear(),date.getMonth(),k),
							tag:tag
						}
					);
				}
				return dayArry;
			},
			selectDate(data){ //选择日期
				//多选模式请在这改造
				/* this.$set(this.dayActive,"date",date) */
				if(data.tag){
					this.dayActive = {
						date:data.date,
						tag:data.tag
					}
					let map = this.getSelectData()
					this.$emit('changeDate',map)
				}else{
					this.dayActive = {
						date:data.date,
						tag:''
					}
					let map = this.getSelectData()
					this.$emit('changeDate',map)
				}
			},
			getSelectData(){ //获取最终结果
				let map = {
					date:this.getDateStr(this.dayActive.date),
					tag:this.dayActive.tag
				}
				return map;
			},
			bindPickerChange(e){
				//传统日历模式选择日期
				this.nowMonth.year = this.pickerData.list[0][e.detail.value[0]]
				this.nowMonth.month = this.pickerData.list[1][e.detail.value[1]]
			},
			reset(){
				//重置
				this.nowMonth.year = this.today.getFullYear()
				this.nowMonth.month = this.today.getMonth()+1
				this.dayActive = {}
				this.$emit('changeDate',{})
			}
		}
	}
</script>

<style lang="scss">
	.calendar{
		font-size: 22upx;
		color: #333333;
		border: 1px solid #d7d7d7;
		font-weight: 600;
		border-left: 0;
		border-right: 0;
		//日历中用到的小字体
		.calen-text-small{
			font-size: 16upx;
		}
		.calen-text-orange{
			color: #ff7df2;
		}
		.calenHead-tradition{
			position: relative;
			vertical-align: bottom;
			height: 80upx;
			line-height: 80upx;
			background: #f8f8f8;
			.dateBox{
				line-height: 80upx;
				display: inline-block;
				height: 80upx;
				padding: 0 40upx;
				 &:after{
					 border: 0;
				 }
				.font-big{
					font-size: 38upx;
					margin-right: 10upx;
				}
				.font-small{
					font-size: 18upx;
				}
			}
			.reset{
				color: #4a77e6; 
				font-weight: 400;
				float: right;
				padding: 0 30upx;
			}
		}
		.calenHead{
			display: flex;
			align-items: flex-start;
			white-space: nowrap;
			.headItem{
				display: inline-block;
				flex-shrink: 0;
				width: 215upx;
				height: 65upx;
				text-align: center;
				line-height: 65upx;
				position: relative;
				&.active{
					background-color: #e8e8e8;
					&:before{
						content: "";
						width: 16upx;
						height: 16upx;
						background: #ff7df2;
						transform: rotate(45deg);
						display: block;
						position: absolute;
						bottom: -8upx;
						left: 50%;
						margin-left: -8upx;
					}
				}
				&:after{
					content: "";
					width: 1px;
					height: 28upx;
					display: inline-block;
					background: #ff7df2;
					position: absolute;
					right: 0;
					top: 50%;
					margin-top: -14upx;
				}
			}
		}
		.weekBar{
			background-color: #ff7df2;
			display: flex;
			align-items: flex-start;
			.weekItem{
				height: 44upx;
				width: 14.28%;
				line-height: 44upx;
				text-align: center;
				color: #FFFFFF;
			}
		}
		.tag-tag{
			color: #ff7df2 !important;
		}
		.dayBox{
			display: flex;
			width: 100%;
			flex: 1;
			flex-direction: row;
			flex-wrap: wrap;
			.day{
				width: 14.285%;
				flex-wrap: nowrap;
				height: 106upx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				border-bottom: 1px solid #d7d7d7;
				margin-bottom: -1px;  /* 偷懒的方法  负边距使border重合*/
				&.active{
					background: #ff7df2 !important;
					color: #FFFFFF !important;
					view{
						color: #FFFFFF !important;
					}
				}
				.today{
					color: #ff7df2;
				}
				view{
					height: 30upx;
				}
			}
		}
	}
</style>
