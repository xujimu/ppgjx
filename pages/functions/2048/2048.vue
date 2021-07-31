<!-- 
	2021/7/27
	liubin
	820565510@qq.com 
-->
<template>
	<view class="game-page" @touchend="touchend" @touchmove.stop.prevent>
		<view class="game-box" @touchstart="touchstart">
			<view class="bg-box" v-for="i in layout.x*layout.y" :key="i + '888'"></view>
			<!-- <keep-alive> -->
				<view class="item" v-for="item in datas" :key="item.i" 
				:style="{
					top: `calc((100% / 4) * ${item.y})`,
					left: `calc((100% / 4) * ${item.x})`,
				}">
					<view class="item-inner">{{ item.value }}</view>
				</view>    	
		</view>
	</view>
</template>

<script>
export default{
    data() {
        return{
            layout: {
                x: 4,
                y: 4
            },
            datas: [],
            allItem: [],
            index: 0,
			startX: 0,
			startY: 0,
			touch: false
        }
       
    },
    methods: {
        createItems() {
            const emptyItems = this.allItem.filter(v => !this.datas.find(val => val.x === v.x && val.y === v.y))
            if(emptyItems.length === 0) {
                uni.showModal({
                	content: 'game over !',
					showCancel: false,
					success: (res) => {
						if(res.confirm) {
							this.index = 0
							this.datas = []
							this.createItems()
							this.createItems()
						}
					}
                })
            } else {
                const newItem =  emptyItems[parseInt(Math.random() * emptyItems.length)]
                this.datas.push({
                    ...newItem,
                    i: this.index,
                    value: [2, 4][parseInt(Math.random() * 2)]
                })
                this.index++
            }
        },
        play(direction) {
			console.log(direction)
            switch(direction) {
            case 'right':
                for (let i = 0; i < this.layout.y; i++) {
                    const row = this.datas.filter(v => v.y === i).sort((a,b) => b.x - a.x)
                    let flag = -1
                    row.forEach((item, j) => {
                        if(row[j+1] && item.value === row[j+1].value && !item.isToMerge) {
							this.merge(item, row, j)
                        } else {
                            flag++
                        }
                        item.x = this.layout.x - 1 - flag    
                    })     
                }               
                break;
            case 'left':
                for (let i = 0; i < this.layout.y; i++) {
                    const row = this.datas.filter(v => v.y === i).sort((a,b) => a.x - b.x)
                    let flag = -1
                    row.forEach((item, j) => {
                        if(row[j+1] && item.value === row[j+1].value && !item.isToMerge) {
                        	this.merge(item, row, j)
                        } else {
                            flag++
                        }
                        item.x = flag    
                    })     
                }
                 
                break;
            case 'up':
                for (let i = 0; i < this.layout.x; i++) {
                    const row = this.datas.filter(v => v.x === i).sort((a,b) =>a.y -  b.y)
                    let flag = -1
                    row.forEach((item, j) => {
                        if(row[j+1] && item.value === row[j+1].value && !item.isToMerge) {
                        	this.merge(item, row, j)
                        } else {
                            flag++
                        }
                        item.y = flag    
                    })     
                }                 
                break;
            case 'down':
                for (let i = 0; i < this.layout.x; i++) {
                    const row = this.datas.filter(v => v.x === i).sort((a,b) => b.y - a.y)
                    let flag = -1
                    row.forEach((item, j) => {
						if(row[j+1] && item.value === row[j+1].value && !item.isToMerge) {
							this.merge(item, row, j)
						} else {
                           flag++
						}
                        item.y = this.layout.y - 1 - flag    
                    })     
                }                 
                break;
            }
			// wx.nextTick(() => {
				this.datas = this.datas.filter(v => !v.isMerge)
				this.datas.forEach(v => v.isToMerge = false)
				this.createItems()
			// })
			
        },
		
		merge(item, row, j) {
			item.isMerge = true
			row[j+1].value *= 2
			row[j+1].isToMerge = true
			if(row[j+1].value === 2048) {
				uni.showModal({
					content: '游戏胜利 !',
					showCancel: false,
					success: (res) => {
						if(res.confirm) {
							this.index = 0
							this.datas = []
							this.createItems()
							this.createItems()
						}
					}
				})
			}
		},
		touchstart(e) {
			this.startX = e.touches[0].pageX;
			this.startY = e.touches[0].pageY;
			this.touch = true
		},
		touchend(e) {
			if(this.touch) {
				this.touch = false
				const moveEndX = e.changedTouches[0].pageX;
				const moveEndY = e.changedTouches[0].pageY;
				const X = moveEndX - this.startX;
				const Y = moveEndY - this.startY;
				const isScrolling = Math.abs(X) < Math.abs(Y) ? 1:0;    //isScrolling为1时，表示纵向滑动，0为横向滑动
				if ( isScrolling < 1 && X < 0 ) {
					this.play('left');
					
				}else if ( isScrolling > 0 && Y < 0 ) {
					this.play('up');
					
				}else if ( isScrolling < 1 && X > 0 ) {
					this.play('right');
					
				}else if ( isScrolling > 0 && Y > 0) {
					this.play('down');
					
				}	
				
			}
		}
    },
    created() {
        for (let i = 0; i < this.layout.x; i++) {
            for (let j = 0; j < this.layout.y; j++) {
                this.allItem.push({
                    x: i,
                    y: j
                }) 
            }
        }
        this.createItems()
        this.createItems()
    },
	onShareAppMessage() {}  
}
</script>      
<style lang="scss">
	.game-page{
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-image: url(../../../static/img/2048.jpg);
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
	$size: 650upx;
    .game-box{
		z-index: 3;
        background: rgba(222,236,223, .2);
        height: $size;
        width: $size;
        border-radius: 5upx;
        display: flex;
        flex-wrap: wrap;
        position: relative;
		margin: 0 auto;
    }
    .bg-box{
        width: calc(#{$size} / 4);
        height: calc(#{$size} / 4);
        padding: 10upx;
        &::before{
            content: '';
            display: block;
            background: rgba(231, 240, 231, .5);
            height: 100%;
            width: 100%;
            border-radius: 8upx;
        }
    }
    .item{
        position: absolute;
        width: 25%;
        height: 25%;
        padding: 10upx;
        color: #fff;
        transition: .8s;
		.item-inner{
			height: 100%;
			border-radius: 8upx;
			align-items: center;
			display: flex;
			font-size: 48upx;
			justify-content: center;
			background: rgb(129, 182, 129);
			font-weight: bold;
		}
    }
	
</style>

