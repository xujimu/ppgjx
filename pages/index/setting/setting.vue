<template>
	<view>
		<view >
			<u-cell-group>
				<u-cell-item  title="隐藏不常用功能" @tap="navto('/pages/index/setting/notFun')"></u-cell-item>
				<u-cell-item  title="单功能模式" @tap="navto('/pages/index/setting/oneFun')"></u-cell-item>
				<u-cell-item  title="隐私政策" @tap="navto('/pages/index/setting/privacy')"></u-cell-item>
			</u-cell-group> 
		</view>
	</view>
</template>

<script>
	export default {
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
