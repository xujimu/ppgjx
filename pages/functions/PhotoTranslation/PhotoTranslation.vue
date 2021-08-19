<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		<view class="cu-bar bg-white">
			<view class="action" style="text-align: center;" >
				<view>
					识别结果
				</view>
			</view>
			<view class="action">
				<button v-if="textres" class="cu-btn bg-green shadow" @click="copy()" data-target="Modal">复制</button>
			</view>
		</view>
	
		
		<view class="cu-form-group">
			<textarea auto-height  maxlength="-1"  v-model="textres" placeholder="温馨提示:裁剪时选择文字区域识别更准确哦!"></textarea>
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
			}
		},
		methods: {
			copy(){
				uni.setClipboardData({
					data: _self.textres
				});
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
				_self.xhttp.upload('/functions/Ocr/textOcr',{
					filePath: tempFilePaths,
					name: 'img', 
					header:{
						'content-type': 'multipart/form-data' 
					},
				}).then(res => {
					console.log(res)
					if(res.data.code == 0){
						_self.textres = res.data.data
						if(_self.textres == ""){
						  plus.nativeUI.alert("没有识别到文字", function(){
							}, "提示", "好的"); 
						} 	
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
