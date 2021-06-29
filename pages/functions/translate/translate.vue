<template>
    <view>
		<view >
			<u-cell-group>
				<u-cell-item icon="grid" @click="skip('https://fanyi.baidu.com','百度翻译')"  title="百度翻译" >
				</u-cell-item>
				<u-cell-item icon="grid" @click="skip('https://fanyi.youdao.com','有道翻译')" title="有道翻译" >
				</u-cell-item>
				<u-cell-item icon="grid" @click="skip('https://fanyi.qq.com','腾讯翻译')" title="腾讯翻译" >
				</u-cell-item>
				<u-cell-item icon="grid" @click="skip('https://translate.sogou.com','搜狗翻译')" title="搜狗翻译" >
				</u-cell-item>
				<u-cell-item icon="grid" @click="skip('https://www.deepl.com','deep翻译')" title="deep翻译" >
				</u-cell-item>
			</u-cell-group> 
			
		</view>
    </view>
</template>

<script>
	var _self;
    export default {
		onLoad() {
			_self = this
		},
        data() {
            return {
               
            }
        },
		methods:{
			skip(e,name){
				uni.navigateTo({
					url: '/pages/functions/translate/start?url=' + e + '&name=' + name
				});
			}
		}
    }
</script>

<style>

</style>