<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		<view class="cu-form-group ">
			<view class="title">源语言</view>
			<picker @change="fromF" :value="fromIndex" :range="from" range-key="name">
				<view class="picker">
					{{from[fromIndex].name}}
				</view> 
			</picker>
		</view>
		
		<view class="cu-form-group ">
			<view class="title">目标语言</view>
			<picker @change="toF" :value="toIndex" :range="to" range-key="name">
				<view class="picker">
					{{to[toIndex].name}}
				</view> 
			</picker>
		</view>
		
		<view v-if="fromText" class="cu-bar bg-white">
			<view class="action" style="text-align: center;" >
				<view style="color: #ED1C24;">
					原始文本
				</view>
			</view>
			<view class="action">
				<button v-if="fromText" class="cu-btn bg-green shadow" @click="copy(true)" data-target="Modal">复制</button>
			</view>
		</view>
		
		<view v-if="fromText" class="cu-form-group">
			<textarea auto-height  maxlength="-1"  v-model="fromText" ></textarea>
		</view>
		
		<view v-if="toText" class="cu-bar bg-white">
			<view class="action" style="text-align: center;" >
				<view style="color: #ED1C24;">
					翻译文本
				</view>
			</view>
			<view class="action">
				<button v-if="toText" class="cu-btn bg-green shadow" @click="copy(false)" data-target="Modal">复制</button>
			</view>
		</view>
	
		
		<view class="cu-form-group">
			<textarea auto-height  maxlength="-1"  v-model="toText" placeholder="温馨提示:裁剪时选择文字区域识别更准确哦!"></textarea>
		</view>
		
		<view class="padding flex flex-direction bg-white top">
			<button class="cu-btn  bg-blue margin-tb-sm lg"  @tap="upload">选择图片</button>
		</view>
		
		<view >
		  
		    <image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
		</view>
		
	</view>
</template> 
 
<script> 
	var _self
	import ImageCropper from "@/components/invinbg-image-cropper/invinbg-image-cropper.vue";
	export default {
		onLoad() {
			_self = this;
			switch(_self.$store.state.platform){
				case 'android':
				   console.log('运行Android上') 
				   Vue.prototype.requestAndroidPermission("android.permission.CAMERA")
				   break;
				case 'ios':
				   Vue.prototype.requestIosPermission("camera","摄像头")
				   Vue.prototype.requestIosPermission("photoLibrary","相册")
				   console.log('运行iOS上')
				   break;
				default:
				   console.log('运行在开发者工具上')
				   break;
			}
		},
		components: {ImageCropper},
		data() {
			return {  
				 textres:'',
				 tempFilePath: '',
				 cropFilePath: '',
				 fromIndex: 0,
				 toText:'',
				 fromText: '',
				 from: [
					 {'name': '自动','value':'auto'},
					 {'name': '英语','value':'en'},
					 {'name': '中文','value':'zh'},
					 {'name': '日语','value':'jp'},
					 {'name': '韩语','value':'kor'},
					 {'name': '葡萄牙语','value':'pt'},
					 {'name': '法语','value':'fra'},
					 {'name': '德语','value':'de'},
					 {'name': '意大利语','value':'it'},
					 {'name': '西班牙','value':'spa'},
					 {'name': '俄语','value':'ru'},
					 {'name': '荷兰语','value':'nl'},
					 {'name': '马来语','value':'may'},
					 {'name': '丹麦语','value':'dan'},
					 {'name': '瑞典语','value':'swe'},
					 {'name': '印尼语','value':'id'},
					 {'name': '波兰语','value':'pl'},
					 {'name': '罗马尼亚语','value':'rom'},
					 {'name': '土耳其语','value':'tr'},
					 {'name': '希腊语','value':'el'},
					 {'name': '匈牙利语','value':'hu'}
				 ],
				 toIndex: 0,
				 to:[
					 {'name': '中文','value':'zh'},
					 {'name': '英文','value':'en'},
					 {'name': '日语','value':'jp'},
					 {'name': '韩语','value':'kor'},
					 {'name': '葡萄牙语','value':'pt'},
					 {'name': '法语','value':'fra'},
					 {'name': '德语','value':'de'},
					 {'name': '意大利语','value':'it'},
					 {'name': '西班牙','value':'spa'},
					 {'name': '俄语','value':'ru'},
					 {'name': '荷兰语','value':'nl'},
					 {'name': '马来语','value':'may'},
					 {'name': '丹麦语','value':'dan'},
					 {'name': '瑞典语','value':'swe'},
					 {'name': '印尼语','value':'id'},
					 {'name': '波兰语','value':'pl'},
					 {'name': '罗马尼亚语','value':'rom'},
					 {'name': '土耳其语','value':'tr'},
					 {'name': '希腊语','value':'el'},
					 {'name': '匈牙利语','value':'hu'}
				 ],
			}
		},
		methods: {
			copy(e){
				var text 
				if(e){
					text = _self.fromText
					
				}else{
					text = _self.toText
				}
				uni.setClipboardData({
					data: text
				});
			},
			fromF(e){
				_self.fromIndex = e.detail.value
			},
			toF(e){
				_self.toIndex = e.detail.value
			},

			upload() {
			    uni.chooseImage({
			        count: 1, //默认9
			        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			        success: (res) => {
						console.log("用户确定")
			            _self.tempFilePath = res.tempFilePaths.shift()
			        }
			    });
			},
			confirm(e) {
				console.log("用户确定")
			    _self.tempFilePath = ''
			    _self.cropFilePath = e.detail.tempFilePath
				uni.showLoading({
				    title: '识别中'
				});
				console.log(_self.domain) 
				const tempFilePaths = _self.cropFilePath;
				console.log("识别路径" + tempFilePaths)
				_self.xhttp.upload('/functions/PhotoTranslation/imgTran',{
					filePath: tempFilePaths,
					name: 'img', 
					header:{
						'content-type': 'multipart/form-data' 
					},
					formData: {
						from: _self.from[_self.fromIndex].value,
						to: _self.to[_self.toIndex].value
					}
				}).then(res => {
					console.log(res)
					if(res.data.code == 0){
						
					
						_self.fromText = res.data.data.fromText 
						_self.toText = res.data.data.toText 
						uni.previewImage({
							indicator: "none",
							urls: [res.data.data.img],
							current: 0
						})
					}
					uni.hideLoading(); 
				}).catch(err => {
					uni.hideLoading(); 
				})
				
			},
			cancel() {
			    console.log('canceled')
			}
		}
	}
</script>

<style scoped>
 
 button{
 	border-radius: 0;
 }
 button::after{ border: none;} 
</style>
