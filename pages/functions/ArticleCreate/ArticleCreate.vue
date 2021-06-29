<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		<view class="cu-form-group">
			<view class="title">主题</view>
			<input v-model="text"   style="padding-bottom: 6.5upx;"> 
			<button @click="create()" class='cu-btn bg-green shadow'>生成</button>
		</view>
		
		
		<view class="cu-form-group">
			<view class="title">字数</view>
			<input v-model="size"  type="number"> 
			<button @click="copy()" v-if="res" class='cu-btn bg-green shadow'>复制</button>
		</view>
		
		
		<view class="cu-form-group">
			<textarea auto-height maxlength="-1" v-model="res" placeholder="生成结果仅供娱乐哦!"></textarea>
		</view>
		
		
	</view>
</template>

<script>
	var _self
	export default {
		onLoad() {
			_self = this
		},
		data() {
			return {
				text:"皮友为什么这么帅?",
				size: 1000,
				res:''
			}
		},
		methods: {
			create(){
				var that = this
				if(that.text == ''){
					plus.nativeUI.alert("主题不能为空哦!", function(){
						}, "提示", "好的");
				}else if(that.size == ''){
					plus.nativeUI.alert("字数不能为空哦!", function(){
						}, "提示", "好的");
				}else{
					
					uni.showLoading({
					    title: '生成中'
					});
					
					_self.xhttp.request({
						url: "/functions/ArticleCreate/create", //仅为示例，并非真实接口地址。
						method:"POST",
						data: {
							text:_self.text,
							size:_self.size
						},
						header:{
							'Content-Type':'application/x-www-form-urlencoded'
						}
					}).then(res => {
						if(res.data.code == 0){
							_self.res = res.data.data	
						}
						uni.hideLoading(); 
					}).catch(err => {
						uni.hideLoading(); 
					})
					
				}
			},
			copy(){
				uni.setClipboardData({
						data: this.res
					});
			}
		}
	}
</script>

<style>

</style>
