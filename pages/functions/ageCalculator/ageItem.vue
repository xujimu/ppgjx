<template>
	<view class="list-item" @click="itemClick">
		<view class="list-item-title">
			<view class="text-xxl">{{propsDats.nickname}}</view>
			<view class="battery">
				<view class="battery-left">
					<view class="capacity-wrap">
						<view class="capacity"
							:style="{width: propsDats.progress+'%','background-color': propsDats.progresColor}">
						</view>
					</view>
				</view>
				<view class="battery-right"></view>
				<text class="margin-left-xs"><text class="text-xl">{{propsDats.progress}}</text>%</text>
			</view>
		</view>
		<view class="list-item-age margin-top text-gray">{{propsDats.nl}}<text
				class="margin-lr-xs">/</text>{{propsDats.ages}}岁</view>
		<view class="list-item-all margin-top text-gray flex align-end justify-between">
			<view>
				已经生活了<text class="text-white text-xxl margin-lr-xs">{{propsDats.days}}</text> 天
			</view>
			<view v-if="showDelete" @click.stop="del">删除</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['data', 'showDeleteBtn'],
		data: function() {
			return {
				propsDats: this.data,
				// showDelete: this.showDeleteBtn
			}
		},
		computed: {
			showDelete: function() {
				return this.showDeleteBtn
			}
		},
		methods: {
			del() {
				let self = this;
				uni.getStorage({
					key: 'AGE_DATA',
					success: function(res) {
						let data = JSON.parse(res.data)
						let selData =
							data.filter(item => {
								return self.propsDats.id != item.id
							})
						uni.setStorage({
							key: 'AGE_DATA',
							data: JSON.stringify(selData),
							success: function() {
								// 刷新列表
								self.$emit('resetList')
							}
						});
					}
				})
			},
			itemClick() {
				this.$emit('itemClick',this.propsDats)
			}
		}
	}
</script>

<style scoped>
	.list-item {
		background-color: #000000;
		border-radius: 10px;
		padding: 15px 20px;
		margin-bottom: 20px;
	}

	.list-item-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
	}

	.list-item-age {}

	.list-item-all {}



	.battery {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.battery-left {
		width: 40px;
		height: 20px;
		border: 2px solid #fff;
		background-color: #fff;
		border-radius: 2px;
	}

	.battery-right {
		width: 3px;
		height: 10px;
		background-color: #fff;
		border-top-right-radius: 2px;
		border-bottom-right-radius: 2px;
	}

	.capacity-wrap {
		width: 100%;
		height: 100%;
		background-color: #2C405A;
		border-radius: 2px;
	}

	.capacity {
		background-color: #1CBBB4;
		width: 90%;
		height: 100%;
		border: 2px solid #2C405A;
		border-radius: 2px;
	}
</style>
