<!-- 
	2021/7/27
	liubin
	820565510@qq.com 
-->
<template>
	<view class="game-page">
		<div class="mine-temp">
			<view class="utils-bar">
				<view class="utils-item">
					<u-icon name="clock"/>
					<!-- <text class="iconfont icontime"></text> -->
					<text class="value">{{ time }}</text>
				</view>
				<view class="utils-item">
					<u-icon name="star-fill"/>
					<!-- <text class="iconfont iconqizhi"></text> -->
					<text class="value">{{ flagCount }}</text>
				</view>
				<view class="utils-item">
					<!-- <text class="iconfont icondilei"></text> -->
					<u-icon name="heart-fill"/>
					<text class="value">{{ levelList[level].count }}</text>
				</view>
			</view>
			<view class="card-row" v-for="(col,y) in dataList" :key="y">
				<view v-for="(row, x) in col" :key="x" class="card-item"
					@longpress="openOther(row, y, x)"
					:class="{open: row.status === 1}"
					@click="openItem(row, y, x)"
					@contextmenu.prevent="toggleFlag(row)">
					<template v-if="row.status === 1">
						<text v-if="!row.isMine && row.count" :style="{color: numberColors[row.count - 1]}">{{ row.count }}</text>
						<!-- <i  class="iconfont icondilei" v-if="row.isMine"></i>	 -->
						<u-icon name="heart-fill" v-if="row.isMine"/>
					</template>
					<!-- <i class="iconfont iconqizhi" v-show="row.status === 2"></i> -->
					<u-icon name="star-fill" v-if="row.status === 2"  color="var(--warning)"/>
				</view>
			</view>    
		</div>
	</view>
</template>

<script>
	export default{
	    data () {
	        return {
	            numberColors: ['blue', '#008100', 'red', '#000081', '#810000', '#008181', '#000', '#818181'],
	            levelList: [
	                {
	                    x: 10,
	                    y: 15,
	                    count: 30,
	                    name: '初级(9x9,10)',
	                    level: 0
	                },
	                {
	                    x: 16,
	                    y: 16,
	                    count: 40,
	                    name: '中级(16x16,40)',
	                    level: 1
	                },
	                {
	                    x: 32,
	                    y: 16,
	                    count: 99,
	                    name: '高级(32x16,99)',
	                    level: 2
	                }
	            ],
	            level: 0,
	            dataList: [],
	            checkCount: 0,
	            flagCount: 0,
	            time: 0,
	            timer: null,
	            gameStatus: 0 //0: 未开始, 1: 进行中, 2: 游戏成功, 3: 游戏失败
	        }
	    },
	    created() {
	        this.gameInit()
	    },
	    methods: {
	        toggleFlag (item) {
	            if (item.status !== 1 && this.gameStatus === 1) {
	                item.status = item.status === 0 ? 2 : 0; 
	                this.flagCount += (item.status - 1)
	            }
	        },
	        openOther (item, y, x) {
	            if (item.status === 1) {
	                let aroundIndexs = this.getAroundIndexs(y, x)
	                let aroundFlagCount = 0;
	                aroundIndexs.forEach(v=>{
	                    if (this.dataList[v[0]] && this.dataList[v[0]][v[1]] && this.dataList[v[0]][v[1]].status === 2) {
	                        aroundFlagCount++
	                    }
	                })
	                if (item.count === aroundFlagCount) {
	                    aroundIndexs.forEach(v => {
	                        if (this.dataList[v[0]] && this.dataList[v[0]][v[1]]) {
	                            this.openItem(this.dataList[v[0]][v[1]], v[0], v[1])
	                        }
	                    })
	                }
	            } else {
					this.toggleFlag(item)
				}
	        },
	        openItem (item, y, x) {
	            if(this.gameStatus === 0) {
	                this.gameStatus = 1;
	                this.timer = setInterval(() => {
	                    this.time++
	                }, 1000)
	            }
	            if (item.status === 0 && this.gameStatus === 1) {
	                let current = this.levelList[this.level];
	                item.status++; 
	                if (item.isMine) {
	                    uni.showModal({
							title: 'Game Over !',
							success: () => {
								this.gameInit()
							}
						})
	                    this.dataList.forEach(val=>{
	                        val.forEach(v=>{
	                            if (v.isMine) v.status = 1
	                        })
	                    })
	                    clearInterval(this.timer)
	                    this.gameStatus = 3;
	                    return;
	                }
	                else if (item.count === 0) {
	                    let aroundIndexs = this.getAroundIndexs(y, x)
	                    aroundIndexs.forEach(v => {
	                        if (v[0] >= 0 && v[0] < current.y && v[1] >= 0 && v[1] < current.x) {
	                            this.openItem(this.dataList[v[0]][v[1]], v[0], v[1])
	                        }
	                    })
	                }
	                this.checkCount++;
	                if (this.checkCount === current.x * current.y - current.count) {
	                    this.gameStatus = 2;
	                    clearInterval(this.timer)
	                    uni.showModal({
	                    	title: '扫雷成功',
							success: () => {
								this.gameInit()
							}
	                    })
	                }
	            }
	        },
	        gameInit () {
	            this.checkCount = 0;
	            this.time = 0;
	            this.flagCount = 0;
	            this.gameStatus = 0;
	            let data = [];
	            let current = this.levelList[this.level];
	            // 获取一组随机数作为雷位置的序号
	            let mines = this.getRandom(current.count, current.x * current.y); 
	            let index = 0; // 序号
	            for (let y = 0; y < current.y; y++) {
	                data.push([])
	                for (let x = 0; x < current.x; x++) {
	                    index++
	                    let aroundIndexs = [  // 周围的序号,若那个方向没有序号用0代替
	                        0, // 提供Array.reduce()的第一个参数, 第一次的sum
	                        y > 0 && x > 0 ? index - current.x - 1 : 0, // ↖
	                        y > 0 ? index - current.x : 0, // ↑
	                        y > 0 && x < current.x - 1 ? index - current.x + 1 : 0, // ↗
	                        x > 0 ? index - 1 : 0, // ←
	                        x < current.x - 1 ? index + 1 : 0, // →
	                        y < current.y - 1 && x > 0 ? index + current.x - 1 : 0, // ↙
	                        y < current.y - 1 ? index + current.x : 0, // ↓
	                        y < current.y - 1 && x < current.x - 1 ? index + current.x + 1 : 0 // ↘
	                    ]
	                    // 计算周围雷的个数
	                    let count = aroundIndexs.reduce((sum = 0, val) => {
	                        return  mines.includes(val) + sum 
	                    })
	                    data[y].push({
	                        status: 0, // 0:翻面,1:开启,2:标记
	                        count,// 周围地雷数目
	                        isMine: mines.indexOf(index) !== -1// 是否为地雷
	                    })
	                }
	            }
	            clearInterval(this.timer)
	           
	            this.dataList = data
	        },
	        // 获取一组随机数 -》 从 0 - range中 抽取 num 个 随机数
	        getRandom (num, range) {
	            let rangeList = [];
	            let randomNums = [];
	
	            for (let i = 0; i < range; i++) {
	                rangeList.push(i+1)
	            }
	           
	            for (let i = 0; i < num; i++) {
	                let randomIndex = parseInt(Math.random() * rangeList.length)
	                randomNums.push(rangeList[randomIndex]);
	                rangeList.splice(randomIndex, 1)
	            }
	            return randomNums
	        },
	        getAroundIndexs (y, x) {
	            return [
	                [y - 1, x - 1],
	                [y - 1, x],
	                [y - 1, x + 1],
	                [y, x - 1],
	                [y, x + 1],
	                [y + 1, x - 1],
	                [y + 1, x],
	                [y + 1, x + 1]
	            ]
	        }
	    },
	};
</script>

<style lang="scss" scoped>
	.utils-bar{
		margin-bottom: 30upx;
		display: flex;
		padding: 0 10upx;
		justify-content: space-between;
		.utils-item{
			padding: 15upx;
			width: 25%;
			background: rgba(#1c2b3b, .7);
			color: #fff;
			border-radius: 40upx;
			border: 2px #1c2b3b solid;
			text-align: center;
			.iconfont{
				margin-right: 15upx;
			}
		}
	}
	.game-page{
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-image:url(../../../static/img/2048.jpg);
		background-position: center;
		background-size: cover;
		position: relative;
		&::before{
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			bottom: 0px;
			left: 0;
			content: '';
			// background: rgba(255,255,255,.3);
		}
		&::after{
			display: block;
			width: 100%;
			height: 30%;
			position: absolute;
			top: 0px;
			left: 0;
			content: '';
			background: linear-gradient(180deg, rgba(#809BB9,1), rgba(#809BB9,0));
		}
	}
	$item-w: 70upx;
	.mine-temp{
		text-align: center;
		margin: 15px auto;
		overflow: auto;
		position: relative;
		z-index: 10;
	}
	.card-row {
		height: $item-w;
		white-space: nowrap;
		margin: 0;
	}
	.card-item {
		display: inline-block;
		width: $item-w;
		height: $item-w;
		text-align: center;
		line-height: $item-w;
		background: #1c2b3b;
		vertical-align: top;
		box-shadow: 2px 3px 4px 0px #8b8585;
		font-weight: 600;
		font-size: 16px;
		white-space: nowrap;
		user-select:none;
		z-index: 2;
		position: relative;
		border: 1px solid #171717;
		opacity: .95;
		.iconqizhi{
			color: red;
		}
	}
	.card-item.open{
		border: none;
		z-index: 0;
		background: #DAE6F4;
		box-shadow: 0px 0px 1px 0px #747774;
		opacity: .85;
		.icondilei{
			animation: bounceIn 1s;
		}
	}
	
</style>
