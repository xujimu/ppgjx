<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view >
		<view class="tower-swiper" @touchmove="TowerMove" @touchstart="TowerStart" @touchend="TowerEnd">
			<view class="tower-item" :class="item.zIndex==1?'none':''" v-for="(item,index) in swiperList" :key="index" :style="[{'--index': item.zIndex,'--left':item.mLeft}]" :data-direction="direction">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFit" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</view>
			</view>
		</view>
		
		<view class="cu-form-group " v-if="swiperList[index].plac == null?true:false">
			<view class="title">生成类型</view>
			<picker @change="typeF" :value="typeIndex" :range="type" range-key="name">
				<view class="picker">
					{{type[typeIndex].name}}
				</view> 
			</picker>
		</view>
		
		<view v-if="swiperList[index].plac == null?false:true" class="cu-form-group margin-top">
			<view class="title">文字</view>
			<input :placeholder="swiperList[index].plac" v-model="text" name="input"></input>
		</view>
		
		<view class="cu-bar bg-white ">
			<view class="action">
				选择图片
			</view>
		</view>
		<view class="cu-form-group" @tap="ChooseImage" >
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-if="img == '' ?false:true">
					<image :src="img" mode="aspectFill" ></image>
				</view>
				<view class="solids" v-if="img == '' ?true:false">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>

		<view class="padding flex flex-direction bg-white top">
			<button class="cu-btn  bg-blue margin-tb-sm lg" :disabled="img == ''?true:false" @click="create()">开始制作</button>
	</view>
		
	</view> 

</template>

<script>
	var _self
	export default {
		components: {
			
		},
		onLoad() {
			_self = this
			_self.TowerSwiper('swiperList');
			switch (_self.$store.state.platform) {
				case 'android':
					console.log('运行Android上')
					Vue.prototype.requestAndroidPermission("android.permission.CAMERA")
					break;
				case 'ios':
					Vue.prototype.requestIosPermission("camera", "摄像头")
					Vue.prototype.requestIosPermission("photoLibrary", "相册")
					console.log('运行iOS上')
					break;
				default:
					console.log('运行在开发者工具上')
					break;
			}
			_self.xhttp.request({
				url: "/functions/PictureProduction/init", //仅为示例，并非真实接口地址。
				method:"GET",
				data: {
				},
				header:{
					'Content-Type':'application/x-www-form-urlencoded'
				}
			}).then(res => {
				_self.data = res.data.data
				uni.hideLoading(); 
			}).catch(err => {
				uni.hideLoading(); 
			})
			
		},
		onShow() {
			
		},
		onUnload(){

			
		},
		watch:{
			index:{
				handler(newName, oldName) {
					console.log("当前选中",newName)
					
				}
			}
		},
		data() {
			return {
				data:[],
				img: "",
				text: "",
				cardCur: 0,
				index: 3,
				type:[],
				swiperList: [{
					id: 0,
					type: 'image',
					url: '/static/images/pictureProduction/kpltx2.jpg',
					tag:'kpltx2',
					plac:'两个字 如职业 法王'
				}, {
					id: 1,
					type: 'image',
					url: '/static/images/pictureProduction/kpltx4.jpg',
					tag:'kpltx4',
					plac:'四个字 如职业选手'
				}, {
					id: 2,
					type: 'image',
					url: '/static/images/pictureProduction/zbtx.jpg',
					tag:'zbtx',
					plac:'两个字 如主播 法王'
				}, {
					id: 3,
					type: 'image',
					url: '/static/images/pictureProduction/zytx.jpg',
					tag:'zytx',
					plac:'两个字 如职业 法王'
				}, {
					id: 4,
					type: 'image',
					url: '/static/images/pictureProduction/carrytx.jpg',
					tag:'carrytx'
				}, {
					id: 5,
					type: 'image',
					url: '/static/images/pictureProduction/jstx.jpg',
					tag:'jstx'
				}, {
					id: 6,
					type: 'image',
					url: '/static/images/pictureProduction/cstx.jpg',
					tag:'cstx'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				typeIndex: 0
			}
		},
		methods: {
			create(){
				 uni.showLoading({
				     title: '处理中'
				 });
				  var text = _self.text
				  console.log(text)
				  var type = _self.swiperList[_self.index].tag
				  
				  switch(type){
					  case 'carrytx':
							text = _self.type[_self.typeIndex].value
					  		break
					  case 'jstx':
							text = _self.type[_self.typeIndex].value
							break	
					  case 'cstx':
							text = _self.type[_self.typeIndex].value
					  		break			
				  }
				  
				  _self.xhttp.upload('/functions/PictureProduction/create', {
					name: 'img',  
				    params: {}, /* 会加在url上 */
				    filePath: _self.img, // 要上传文件资源的路径。
				    header: {
						
					}, /* 会与全局header合并，如有同名属性，局部覆盖全局 */
				    custom: {}, // 自定义参数
				    formData: {
						type:type,
						text:text
					}, // HTTP 请求中其他额外的 form data
				  }).then(res => {
						console.log(res.data.data)
						if(res.data.code == 0){
							uni.previewImage({
								indicator: "none",
								urls: [res.data.data],
								current: 0
							})
						}
						uni.hideLoading(); 
				  }).catch(err => {
						uni.hideLoading(); 
				  })
				
			},
			typeF(e){
				_self.typeIndex = e.detail.value
			},
			ChooseImage(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						_self.img = res.tempFilePaths[0]
						
					}
				});
			}, 
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = _self[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				_self.swiperList = list
			},
			
			// towerSwiper触摸开始
			TowerStart(e) {
				_self.towerStart = e.touches[0].pageX
			},
			
			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},
			
			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = _self.direction;
				let list = _self.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < _self.swiperList.length; i++) {
						_self.swiperList[i - 1].mLeft = _self.swiperList[i].mLeft
						_self.swiperList[i - 1].zIndex = _self.swiperList[i].zIndex
					}
					_self.swiperList[list.length - 1].mLeft = mLeft;
					_self.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = _self.swiperList.length - 1; i > 0; i--) {
						_self.swiperList[i].mLeft = _self.swiperList[i - 1].mLeft
						_self.swiperList[i].zIndex = _self.swiperList[i - 1].zIndex
					}
					_self.swiperList[0].mLeft = mLeft;
					_self.swiperList[0].zIndex = zIndex;
				}
				_self.direction = ""
				_self.swiperList = _self.swiperList
				
				_self.swiperList.forEach(function(e){
					 if(e.mLeft == 0){
						 _self.index = e.id
					 }
				})
				_self.typeIndex = 0
				switch(_self.index){
					case 4:
						_self.type = _self.data.carrytx
						break
					case 5:
						_self.type = _self.data.jstx
						break
					case 6:
						_self.type = _self.data.cstx
						break		
				}
			},
			
		}
	}
</script>

<style scoped>
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
</style>
