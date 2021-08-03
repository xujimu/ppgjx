<template>
	<u-cell-group>
		<u-cell-item icon="file-text" @click="navto('/pages/functions/chatRoom/chatRoom')"  title="文字聊天室" >
		</u-cell-item>
		<u-cell-item icon="mic" @click="navto('/pages/functions/chatRoom/chatRoom')" title="语音聊天室" >
		</u-cell-item>
		<u-cell-item icon="home" @click="navto('/pages/functions/chatRoom/chatRoom')" title="文字语音聊天室" >
		</u-cell-item>
	</u-cell-group> 
</template>

<script>
	var _self
	export default {
		components: {
			
		},
		onLoad() {
			_self = this
		},
		onShow() {
			
		},
		onUnload(){

			
		},
		watch:{
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	
</style>