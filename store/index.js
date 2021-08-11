import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		user: null,
		funlist: [{
				title: '二维码',
				name: '/pages/functions/qrcode/qrcode',
				color: 'purple',
				cuIcon: 'qr_code',
				describe: '官方',
				display: true,
				platform: 0 //0通用1ios2andorid

			},
			{
				title: '计数器',
				name: '/pages/functions/counter/counter',
				color: 'purple',
				cuIcon: 'countdown',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '网络测速',
				name: '/pages/functions/NetworkSpeed/NetworkSpeed',
				color: 'pink',
				cuIcon: 'we',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '手电筒',
				name: '/pages/functions/flashlight/flashlight',
				color: 'pink',
				cuIcon: 'flashlightopen',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '图片文字识别',
				name: '/pages/functions/ocr/ocr',
				color: 'red',
				cuIcon: 'attention',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '大小写转换',
				name: '/pages/functions/toggleCase/toggleCase',
				color: 'red',
				cuIcon: 'text',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '设备信息',
				name: '/pages/functions/deviceInfo/deviceInfo',
				color: 'grey',
				cuIcon: 'phone',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '亲戚关系计算',
				name: '/pages/functions/relationship/relationship',
				color: 'grey',
				cuIcon: 'friend',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '文章生成器',
				name: '/pages/functions/ArticleCreate/ArticleCreate',
				color: 'yellow',
				cuIcon: 'text',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '通知单词',
				name: '/pages/functions/ReciteWords/ReciteWords',
				color: 'yellow',
				cuIcon: 'service',
				describe: '官方',
				display: true,
				platform: 1
			},
			{
				title: '语音合成',
				name: '/pages/functions/textSpeech/textSpeech',
				color: 'orange',
				cuIcon: 'voice',
				describe: '官方',
				display: true,
				platform: 0
			},
			
			// {
			// 	title: '视频下载器',
			// 	name: '/pages/functions/WipeWatermark/WipeWatermark',
			// 	color: 'orange',
			// 	cuIcon: 'video',
			// 	describe: '官方',
			// 	display: true,
			// 	platform: 0
			// },
			
			{
				title: '振动器',
				name: '/pages/functions/vibrate/vibrate',
				color: 'green',
				cuIcon: 'rankfill',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '手持弹幕',
				name: '/pages/functions/barrage/barrage',
				color: 'green',
				cuIcon: 'write',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '短网址生成',
				name: '/pages/functions/shortUrl/shortUrl',
				color: 'cyan',
				cuIcon: 'link',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '翻译',
				name: '/pages/functions/translate/translate',
				color: 'cyan',
				cuIcon: 'same',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '加密相册',
				name: '/pages/functions/photoBox/photoBox',
				color: 'brown',
				cuIcon: 'form',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '进制转换',
				name: '/pages/functions/hexTransform/hexTransform',
				color: 'brown',
				cuIcon: 'fork',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '网页截图',
				name: '/pages/functions/longPage/longPage',
				color: 'olive',
				cuIcon: 'read',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '图片压缩',
				name: '/pages/functions/imgZip/imgZip',
				color: 'pic',
				cuIcon: 'send',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: 'DIY计算器',
				name: '/pages/functions/divCalculate/divCalculate',
				color: 'pic',
				cuIcon: 'mauve',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '王者头像生成',
				name: '/pages/functions/pictureProduction/pictureProduction',
				color: 'pic',
				cuIcon: 'mauve',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '拍一拍',
				name: '/pages/functions/TakeAshot/TakeAshot',
				color: 'pic',
				cuIcon: 'flashbuyfill',
				describe: '官方',
				display: true,
				platform: 1
			},
			{
				title: '我的音乐',
				name: '/pages/functions/musicPlay/musicPlay',
				color: 'pic',
				cuIcon: 'musicfill',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '端口扫描',
				name: '/pages/functions/PortScan/PortScan',
				color: 'pic',
				cuIcon: 'searchlist',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '快递查询',
				name: '/pages/functions/expressCheck/expressCheck',
				color: 'pic',
				cuIcon: 'searchlist',
				describe: '官方',
				display: true,
				platform: 0
			},
			{
				title: '日期计算',
				name: '/pages/functions/PeriodDays/PeriodDays',
				color: 'cyan',
				cuIcon: 'time',
				describe: '皮友:撩到腿软提供',
				display: true,
				platform: 0 //0通用1ios2andorid

			},
			{
				title: '位置信息',
				name: '/pages/functions/Location/Location',
				color: 'purple',
				cuIcon: 'location',
				describe: '皮友:撩到腿软提供',
				display: true,
				platform: 0 //0通用1ios2andorid

			},
			{
				title: '全屏时钟',
				name: '/pages/functions/FullClock/skip',
				color: 'purple',
				cuIcon: 'timefill',
				describe: '官方',
				display: true,
				platform: 0 //0通用1ios2andorid
			
			},
			{
				title: '经期记录',
				name: '/pages/functions/PeriodRecord/PeriodRecord',
				color: 'purple',
				cuIcon: 'timefill',
				describe: '皮友:撩到腿软提供',
				display: true,
				platform: 0 //0通用1ios2andorid
			
			},
			{
				title: '2048',
				name: '/pages/functions/2048/2048',
				color: 'pic',
				cuIcon: 'game',
				describe: '皮友:撩到腿软提供',
				display: true,
				platform: 0 //0通用1ios2andorid
			
			},
			{
				title: '扫雷',
				name: '/pages/functions/mineSweeping/mineSweeping',
				color: 'pic',
				cuIcon: 'game',
				describe: '皮友:撩到腿软提供',
				display: true,
				platform: 0 //0通用1ios2andorid
			
			}, 
			{ 
				title: '聊天室',
				name: '/pages/functions/chatRoom/select',
				color: 'pic',
				cuIcon: 'service',
				describe: '官方',
				display: true,
				platform: 0 //0通用1ios2andorid
			},
			{
				title: '电子签名',
				name: '/pages/functions/phoneSign/phoneSign',
				color: 'pic',
				cuIcon: 'write',
				describe: '官方',
				display: true,
				platform: 0 //0通用1ios2andorid
			},
			{
				title: '每日早报',
				name: '/pages/functions/TheDailyMorning/TheDailyMorning',
				color: 'calendar',
				cuIcon: 'calendar',
				describe: '官方',
				display: true,
				platform: 0 //0通用1ios2andorid
			},
			{
				title: '图片水印',
				name: '/pages/functions/WaterMarking/WaterMarking',
				color: 'calendar',
				cuIcon: 'file',
				describe: '官方',
				display: true,
				platform: 0 //0通用1ios2andorid
			}     
			// ,
			// {
			// 	title: '测试',
			// 	name: '/pages/functions/test/test',
			// 	color: 'pic',
			// 	cuIcon: 'game',
			// 	describe: '官方',
			// 	display: true,
			// 	platform: 0 //0通用1ios2andorid
			
			// }
		],
		flashlightIndex: 0,
		flashlightSpeed: 1, 
		vibrateIndex: 0, 
		vibrateSpeed: 1,
		platfrom: '',
		version: '1.4.5'
	},
	mutations: {},
	actions: {}
})
export default store
