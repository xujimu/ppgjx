<!-- 
	2021/6/29
	xjm
	2524931333@qq.com s
-->
<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		onLoad(res) {
			if(res.home){
				plus.screen.lockOrientation("portrait-primary")
				uni.switchTab({
					url: '/pages/index/index'
				})
			}else{
				uni.redirectTo({
				    url: '/pages/functions/FullClock/FullClock'
				});
				
			}
		},
		created() {
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
