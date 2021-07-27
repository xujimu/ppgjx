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
				describe: '彩色二维码生成',
				display: true,
				platform: 0 //0通用1ios2andorid

			},
			{
				title: '计数器',
				name: '/pages/functions/counter/counter',
				color: 'purple',
				cuIcon: 'countdown',
				describe: '计数器',
				display: true,
				platform: 0
			},
			{
				title: '网络测速',
				name: '/pages/functions/NetworkSpeed/NetworkSpeed',
				color: 'pink',
				cuIcon: 'we',
				describe: '网络测速',
				display: true,
				platform: 0
			},
			{
				title: '手电筒',
				name: '/pages/functions/flashlight/flashlight',
				color: 'pink',
				cuIcon: 'flashlightopen',
				describe: '闪烁手电筒',
				display: true,
				platform: 0
			},
			{
				title: '图片文字识别',
				name: '/pages/functions/ocr/ocr',
				color: 'red',
				cuIcon: 'attention',
				describe: '图片文字识别',
				display: true,
				platform: 0
			},
			{
				title: '大小写转换',
				name: '/pages/functions/toggleCase/toggleCase',
				color: 'red',
				cuIcon: 'text',
				describe: '人民币大小写转换',
				display: true,
				platform: 0
			},
			{
				title: '设备信息',
				name: '/pages/functions/deviceInfo/deviceInfo',
				color: 'grey',
				cuIcon: 'phone',
				describe: '我的设备信息',
				display: true,
				platform: 0
			},
			{
				title: '亲戚关系计算',
				name: '/pages/functions/relationship/relationship',
				color: 'grey',
				cuIcon: 'friend',
				describe: '过年必备',
				display: true,
				platform: 0
			},
			{
				title: '文章生成器',
				name: '/pages/functions/ArticleCreate/ArticleCreate',
				color: 'yellow',
				cuIcon: 'text',
				describe: '超长文章生成',
				display: true,
				platform: 0
			},
			{
				title: '通知单词',
				name: '/pages/functions/ReciteWords/ReciteWords',
				color: 'yellow',
				cuIcon: 'service',
				describe: '定时通知背单词',
				display: true,
				platform: 1
			},
			{
				title: '语音合成',
				name: '/pages/functions/textSpeech/textSpeech',
				color: 'orange',
				cuIcon: 'voice',
				describe: '文字转语音',
				display: true,
				platform: 0
			},
			{
				title: '视频下载',
				name: '/pages/functions/WipeWatermark/WipeWatermark',
				color: 'orange',
				cuIcon: 'video',
				describe: '视频下载',
				display: true,
				platform: 0
			},
			{
				title: '振动器',
				name: '/pages/functions/vibrate/vibrate',
				color: 'green',
				cuIcon: 'rankfill',
				describe: '多频率振动',
				display: true,
				platform: 0
			},
			{
				title: '手持弹幕',
				name: '/pages/functions/barrage/barrage',
				color: 'green',
				cuIcon: 'write',
				describe: '手持弹幕',
				display: true,
				platform: 0
			},
			{
				title: '短网址生成',
				name: '/pages/functions/shortUrl/shortUrl',
				color: 'cyan',
				cuIcon: 'link',
				describe: '短网址生成',
				display: true,
				platform: 0
			},
			{
				title: '翻译',
				name: '/pages/functions/translate/translate',
				color: 'cyan',
				cuIcon: 'same',
				describe: '翻译集合',
				display: true,
				platform: 0
			},
			{
				title: '加密相册',
				name: '/pages/functions/photoBox/photoBox',
				color: 'brown',
				cuIcon: 'form',
				describe: '加密相册',
				display: true,
				platform: 0
			},
			{
				title: '进制转换',
				name: '/pages/functions/hexTransform/hexTransform',
				color: 'brown',
				cuIcon: 'fork',
				describe: '进制转换',
				display: true,
				platform: 0
			},
			{
				title: '网页截图',
				name: '/pages/functions/longPage/longPage',
				color: 'olive',
				cuIcon: 'read',
				describe: '电脑手机网页截图',
				display: true,
				platform: 0
			},
			{
				title: '图片压缩',
				name: '/pages/functions/imgZip/imgZip',
				color: 'pic',
				cuIcon: 'send',
				describe: '图片批量压缩',
				display: true,
				platform: 0
			},
			{
				title: 'DIY计算器',
				name: '/pages/functions/divCalculate/divCalculate',
				color: 'pic',
				cuIcon: 'mauve',
				describe: '自定义计算器',
				display: true,
				platform: 0
			},
			{
				title: '王者头像生成',
				name: '/pages/functions/pictureProduction/pictureProduction',
				color: 'pic',
				cuIcon: 'mauve',
				describe: '王者头像生成',
				display: true,
				platform: 0
			},
			{
				title: '拍一拍',
				name: '/pages/functions/TakeAshot/TakeAshot',
				color: 'pic',
				cuIcon: 'flashbuyfill',
				describe: '拍拍皮友',
				display: true,
				platform: 1
			},
			{
				title: '我的音乐',
				name: '/pages/functions/musicPlay/musicPlay',
				color: 'pic',
				cuIcon: 'musicfill',
				describe: '我的音乐',
				display: true,
				platform: 0
			},
			{
				title: '端口扫描',
				name: '/pages/functions/PortScan/PortScan',
				color: 'pic',
				cuIcon: 'searchlist',
				describe: '端口扫描',
				display: true,
				platform: 0
			},
			{
				title: '快递查询',
				name: '/pages/functions/expressCheck/expressCheck',
				color: 'pic',
				cuIcon: 'searchlist',
				describe: '快递查询',
				display: true,
				platform: 0
			},
			{
				title: '日期计算',
				name: '/pages/functions/PeriodDays/PeriodDays',
				color: 'cyan',
				cuIcon: 'time',
				describe: '日期计算',
				display: true,
				platform: 0 //0通用1ios2andorid

			},
			{
				title: '位置信息',
				name: '/pages/functions/Location/Location',
				color: 'purple',
				cuIcon: 'location',
				describe: '位置信息',
				display: true,
				platform: 0 //0通用1ios2andorid

			},
			{
				title: '全屏时钟',
				name: '/pages/functions/FullClock/FullClock',
				color: 'purple',
				cuIcon: 'timefill',
				describe: '全屏时钟',
				display: true,
				platform: 0 //0通用1ios2andorid
			
			}
		],
		flashlightIndex: 0,
		flashlightSpeed: 1,
		vibrateIndex: 0,
		vibrateSpeed: 1,
		platfrom: '',
		version: '1.3.3'
	},
	mutations: {},
	actions: {}
})
export default store
