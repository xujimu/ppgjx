<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		
		<view class="cu-bar bg-white " v-for="(value,index) in data" >
			<view class="action">
				<text ></text>单词：{{value.word}}
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @click="remove(value.word_id)" data-target="Modal" >移除</button>
			</view>
		</view>
		
		 <u-empty  v-if="data == ''?true:false" text="没有任何已推单词哦" mode="history"></u-empty>
	</view>
</template>

<script>
	var _self;
	var type;
	export default {
		onLoad(option) {
			_self = this
			 type = JSON.parse(decodeURIComponent(option.type));

		},
		onShow() {
			_self.load()
		},
		data() {
			return {
				data:[
					 
				],
			}
		},  
		methods: {
			remove(word_id){
				
				uni.showLoading({
				    title: '移除中'
				});
				
				_self.xhttp.request({
					url: "/functions/ReciteWords/v1/remove", //仅为示例，并非真实接口地址。
					method:"POST",
					data: {
						word_id:word_id
					},
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(res => {
					console.log(res)
					_self.load()
					uni.hideLoading(); 
				}).catch(err => {
					uni.hideLoading(); 
				})
			},
			load(){
				uni.showLoading({
				    title: '加载中'
				});
				_self.xhttp.request({
					url: "/functions/ReciteWords/v1/getRecordWord", //仅为示例，并非真实接口地址。
					method:"POST",
					data: {
						type: type
					},
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(res => {
					console.log(res)
					if(res.data.code == 0){
						if(res.data.data != null){
							_self.data = res.data.data
						}
					}
					uni.hideLoading(); 
				}).catch(err => {
					uni.hideLoading(); 
				})
				
			}
		}
	}
</script>

<style>

</style>
