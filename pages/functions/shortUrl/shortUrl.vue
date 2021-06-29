<template>
	<view>
		<view class="cu-form-group">
			<view class="title">长网址:</view>
			<input maxlength="-1"  v-model="longUrl" placeholder="请输入网址" ></input>
			<button @click="create()" :disabled="longUrl == '' ? true : false" class='cu-btn bg-green shadow'>生成</button>
		</view>
		
		<view class="cu-form-group ">
			<view class="title">生成类型</view>
			<picker @change="typeF" :value="typeIndex" :range="type" range-key="value">
				<view class="picker">
					{{type[typeIndex].value}}
				</view> 
			</picker>
		</view>
		
		
		<view class="cu-form-group" v-if="shortUrl == '' ? false : true">
			<view class="title">短网址:</view>
			<input v-model="shortUrl" placeholder="生成结果"   style="padding-bottom: 6.5upx;"> 
			<button @click="copy()" class='cu-btn bg-green shadow'>复制</button>
		</view>
		
	</view>
</template>

<script>
	var _self;
	export default {
		onLoad() {
			_self =  this
			uni.showLoading({
				title: '加载中'
			});
			
			_self.xhttp.request({
				url: "/functions/shortUrl/init", //仅为示例，并非真实接口地址。
				method:"GET",
				data: {
				},
				header:{
					'Content-Type':'application/x-www-form-urlencoded'
				}
			}).then(res => {
				console.log(res)
				if(res.data.code == 0){
					_self.type = res.data.data
				}
				uni.hideLoading(); 
			}).catch(err => {
				uni.hideLoading(); 
			})
			
		},
		onShow() {
			uni.getClipboardData({
				success: function(res) {
					var value = res.data
					if (value.indexOf("http") != -1) {
						uni.showModal({
							title: '提示',
							content: '检测到链接!是否粘贴?',
							success: function(res) {
								if (res.confirm) {
									_self.longUrl = value
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}
			});
		},
		data() {
			return { 
				longUrl: '',
				shortUrl: '',
				typeIndex: 0,
				type: [ 
					{'id': '','value':''}
					// {'id': 1,'value':'t.cn'},
					// {'id': 2,'value':'url.cn'},
					// {'id': 3,'value':'dwz.mk'},
					// {'id': 4,'value':'mtw.so'}, 
					// {'id': 5,'value':'u.nu'},
					// {'id': 6,'value':'mrw.so'},
					// {'id': 7,'value':'suo.nz'},
					// // {'id': 8,'value':'sohu.gg'}
				],
			}
		},
		methods: {
			typeF(e){
				_self.typeIndex = e.detail.value
			},
			create(){
				uni.showLoading({
				    title: '生成中'
				});
				console.log(_self.type[_self.typeIndex])
				_self.xhttp.request({
					url: "/functions/shortUrl/create", //仅为示例，并非真实接口地址。
					method:"POST",
					data: {
						url:_self.longUrl,
						type:_self.type[_self.typeIndex].id
					},
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					}
				}).then(res => {
					console.log(res)
					if(res.data.code == 0 ){
						_self.shortUrl = res.data.data
					}
					uni.hideLoading(); 
				}).catch(err => {
					uni.hideLoading(); 
				})
				
			},
			copy(){
				uni.setClipboardData({
						data: _self.shortUrl
					});
			}
		}
	}
</script>

<style>

</style>
