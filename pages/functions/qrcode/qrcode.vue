<template>
	<view>
		<view class="box">
			<image lazy-load="true" :src="img" class="img"></image>
		</view>
		 
		<view class="cu-form-group ">	
			<textarea maxlength="-1" v-model="text" placeholder="请输入文本内容 支持网址 文本等 网址必须添加http前缀"></textarea>
		</view> 
		
		
		<view class="cu-form-group">
			<view class="title">背景颜色</view>
			<button class='cu-btn bg-green shadow' @click="open('bgcolor')" :style="{backgroundColor: bgcolor}"></button>
		</view>
		<view class="cu-form-group">
			<view class="title">前景颜色</view>
			<button class='cu-btn bg-green shadow' @click="open('nbgcolor')" :style="{backgroundColor: nbgcolor}"></button>
		</view>
		<view class="cu-form-group">
			<view class="title">四角色</view>
			<button class='cu-btn bg-green shadow'  @click="open('jbgcolor')" :style="{backgroundColor: jbgcolor}"></button>
		</view>
		 
		<view class="cu-form-group">
			<view class="title">二维码大小</view>
			<input v-model="size"  type="number" maxlength="2"> 
			<view class="title" style="color: #999999;">范围:1-50(保存后可见效果)</view>
		</view>
		
		<view style="position: fixed;bottom: 0;">
				<button style="margin: 0px;width: 50vw;color: #000000;" class="cu-btn bg-white margin-tb-sm lg"  @click="make">制作</button>
				<button style="margin: 0px;width: 50vw;color: #000000;" class="cu-btn bg-white margin-tb-sm lg"  @click="gosave">保存</button>
		</view>

		<!-- <button style="position:fixed; bottom:0;width: 100%;margin: 0px;" class="cu-btn bg-white margin-tb-sm lg" @click="gosave">保存图片</button> -->
		<!-- 需要声明 ref  -->
		<t-color-picker ref="colorPicker" :color="color" @confirm="confirm"></t-color-picker>
		
	</view>
</template>

<script>
	var _self
	import tColorPicker from '@/components/t-color-picker/t-color-picker.vue'
	export default {
		onLoad(){
			_self = this
			switch(_self.$store.state.platform){
			    case 'android':
			       console.log('运行Android上')
				   // Vue.prototype.requestAndroidPermission("android.permission.READ_EXTERNAL_STORAGE")
				   // Vue.prototype.requestAndroidPermission("android.permission.WRITE_EXTERNAL_STORAGE")
			       break;
			    case 'ios':
				  Vue.prototype.requestIosPermission("photoLibrary","相册")
			       console.log('运行iOS上')
			       break;
			    default:
			       console.log('运行在开发者工具上')
			       break;
			}
		},
		components: {
		    tColorPicker
		},
		data() {
			return {
				size:10,
				text:"",
				color:{r: 255,g: 0,b: 0,a: 1},
				bgcolor:"rgb(255,255,255)",
				nbgcolor:"rgb(0,0,0)",
				jbgcolor:"rgb(0,0,0)", 
				index:"",
				img:"https://ppgjx.com/static/images/qrcode.jpg",
				save:false
			};
		},
		methods: { 
			open(item) {
				this.index = item
			    // 打开颜色选择器
			    this.$refs.colorPicker.open();
			}, 
			confirm(e){  
				var data = e.rgba 
				this[`${this.index}`] = "rgb(" + data.r + "," + data.g + "," + data.b + ")"
			},
			make(e){
				var that = this
				console.log(this.size)
				if(this.size == "" || this.size < 1 || this.size > 50 ){
					plus.nativeUI.alert("二维码大小超出范围!", function(){
						}, "提示", "好的"); 
						
				}else if(this.text == ""){
					plus.nativeUI.alert("内容不能为空!", function(){	
						}, "提示", "好的");
				}else{
					var that = this
					var bgcolor = this.bgcolor.replace("rgb(","").replace(")","")
					var nbgcolor = this.nbgcolor.replace("rgb(","").replace(")","")
					var jbgcolor = this.jbgcolor.replace("rgb(","").replace(")","")
					uni.showLoading({
					    title: '制作中'
					});
					_self.xhttp.request({
						url: "/functions/qrcode/make", //仅为示例，并非真实接口地址。
						method:"POST",
						data: {
					        text:that.text,
							size:that.size,
					        bgcolor:bgcolor, 
					        nbgcolor:nbgcolor,
					        jbgcolor:jbgcolor 
					    },
						header:{
							'Content-Type':'application/x-www-form-urlencoded'
						}
					}).then(res => {
						console.log(res)
						if(res.data.code == 0){
							_self.img = res.data.data
						}
						uni.hideLoading(); 
					}).catch(err => {
						uni.hideLoading(); 
					})
				}
			},
			gosave(e){
				console.log("保存图片")
				uni.downloadFile({
				    url: this.img , //仅为示例，并非真实的资源
				    success: (res) => {
				        if (res.statusCode === 200) {
						  console.log("下载成功")
						  console.log(res.tempFilePath)
						  var tempFilePath = res.tempFilePath;
						  uni.saveImageToPhotosAlbum({
							   filePath: tempFilePath,
							   success: function (res) {
								 console.log("保存成功")
								uni.showToast({
									icon: "success",
								    title: '已保存',
								    duration: 1000
								});
							   },fail: (err) => {
								console.log("保存失败")
								console.log(err)
								uni.showToast({
									icon: "none",
								    title: '保存失败',
								    duration: 1000
								});
							   } 
							 });
				        }
				    }
				});
			}
		}
	} 
</script>

<style>
	.button-box {
		margin: 30upx;
		text-align: center;
		
	}

	.button-box1 {
		
		width: 50%;
	}

	.box {
		margin: 2% 30%;
		box-shadow: 0 0 5upx ;
		width: 40%;
		height: 40vw;

	}

	.img {
		width: 100%;
		height: 100%;
	}
	
	button{
		border-radius: 0;
	}

	button::after {
		border: none;
	}

</style>
