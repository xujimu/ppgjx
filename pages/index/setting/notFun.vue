<template>
	<view>

		<view  class="cu-list menu sm-border" style="margin-top: 0px;margin-bottom: 1px;" v-for="(item,index) in $store.state.funlist">
			<view class="cu-item">
				<view class="content ">
					<view><text class="text-blue margin-right-xs"></text>{{item.title}}</view>
				</view>
				<view class="action">
					<u-switch v-model="item.display" active-color="#39b54a"></u-switch>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		watch: {
			'$store.state.funlist':{ // plan1.0
				handler(newName, oldName) {
					
					 uni.setStorageSync('funlist', newName);
					
				},
				deep: true
			}
		},
		onLoad() {
			_self = this
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
