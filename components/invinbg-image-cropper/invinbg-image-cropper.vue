<template>
    <view class="vue-cropper" ref="cropper" :style="{ top : `${containerTop}px` }" v-show="show">
        <view class="cropper-box">
            <view class="cropper-box-canvas" @touchstart.stop.prevent="imgTouchStart" @touchmove.stop.prevent="imgMoveing" @touchend.stop.prevent="imgMoveEnd" :style="{
					'width': imageWidth + 'px',
					'height': imageHeight + 'px',
					'transform': 'scale(' + scale + ',' + scale + ') ' + 'translate3d('+ x / scale + 'px,' + y / scale + 'px,' + '0)'
					+ 'rotateZ('+ rotate * 90 +'deg)'
					}">
                <image :src="src" alt="cropper-img" ref="cropperImg" mode="scaleToFill" class="uni-image"></image>
            </view>
        </view>
        <view class="cropper-drag-box cropper-modal cropper-move pointer-events"></view>
        <view class="cropper-crop-box" :class="{'pointer-events': cropFixed}" :style="{'width': cropW + 'px','height': cropH + 'px','transform': 'translate3d('+ cropOffsertX + 'px,' + cropOffsertY + 'px,' + '0)'}">
            <view class="cropper-view-box">
                <image :style="{'width': imageWidth + 'px','height': imageHeight + 'px','transform': 'scale(' + scale + ',' + scale + ') ' + 'translate3d('+ (x - cropOffsertX) / scale  + 'px,' + (y - cropOffsertY) / scale + 'px,' + '0)' + 'rotateZ('+ rotate * 90 +'deg)'}" mode="scaleToFill" :src="src" alt="cropper-img"></image>
            </view>

            <view v-if="!cropFixed" class="cropper-face cropper-move" @touchstart.stop.prevent="touchStart" @touchmove.stop.prevent="cropMoveing"></view>

            <view class="crop-line line-w"></view>
            <view class="crop-line line-a"></view>
            <view class="crop-line line-s"></view>
            <view class="crop-line line-d"></view>
            <block v-if="!cropFixed">
                <view class="crop-point point-lt" @touchstart.stop.prevent="touchStart" @touchmove.stop.prevent="dragMove($event, 'left-top')"></view>
                <view class="crop-point point-mt" @touchstart.stop.prevent="touchStart" @touchmove.stop.prevent="dragMove($event, 'middle-top')"></view>
                <view class="crop-point point-rt" @touchstart.stop.prevent="touchStart" @touchmove.stop.prevent="dragMove($event, 'right-top')"></view>
                <view class="crop-point point-ml" @touchstart.stop.prevent="touchStart" @touchmove.stop.prevent="dragMove($event, 'middle-left')"></view>
                <view class="crop-point point-mr" @touchstart.stop.prevent="touchStart" @touchmove.stop.prevent="dragMove($event, 'middle-right')"></view>
                <view class="crop-point point-lb" @touchstart.stop.prevent="touchStart" @touchmove.stop.prevent="dragMove($event, 'left-bottom')"></view>
                <view class="crop-point point-mb" @touchstart.stop.prevent="touchStart" @touchmove.stop.prevent="dragMove($event, 'middle-bottom')"></view>
                <view class="crop-point point-rb" @touchstart.stop.prevent="touchStart" @touchmove.stop.prevent="dragMove($event, 'right-bottom')"></view>
            </block>
        </view>

        <canvas canvas-id="myCanvas" class="cropper-canvas" :style="{ 'width': cropW + 'px','height': cropH + 'px' }"></canvas>

        <view class="btn-group">
            <view class="btn-item reset-btn" v-show="showResetBtn" @tap="init"></view>
            <view class="btn-item rotate-btn" v-show="showRotateBtn" @tap="rotateHandler"></view>
        </view>

        <view class="uni-info__ft">
            <view class="uni-modal__btn uni-modal__btn_default" style="color: rgb(0, 0, 0);" @tap="cancel">取消</view>
            <view class="uni-modal__btn uni-modal__btn_primary" style="color: rgb(0, 122, 255);" @tap="confirm">确定</view>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'image-cropper',
        props: {
            cropWidth: {
                type: Number,
                default: 200,
            },
            cropHeight: {
                type: Number,
                default: 200
            },
            cropFixed: {
                type: Boolean,
                default: false,
            },
            src: {
                type: String,
            },
            showResetBtn: {
                type: Boolean,
                default: true,
            },
            showRotateBtn: {
                type: Boolean,
                default: true,
            }
        },
        data() {
            const sysInfo = uni.getSystemInfoSync();
            const pixelRatio = sysInfo.pixelRatio
            return {
                show: false,
                scale: 1,
                rotate: 0,
                cropW: 0,
                cropH: 0,
                cropOldW: 0,
                cropOldH: 0,
                sysInfo: sysInfo,
                pixelRatio: pixelRatio,
                imageRealWidth: 0,
                imageRealHeight: 0,
                cropOffsertX: 0,
                cropOffsertY: 0,
                startX: 0,
                startY: 0,
                // 裁剪框与边界间距
                border: 5,
                x: 0,
                y: 0,
                startL: 0,
                oldScale: 1,
            }
        },
        watch: {
            src(val) {
                if(val.length > 0) {
                    this.init()
                }
            },
            show(val) {
                if(!val) {
                    this.src = ''
                }
            }
        },
        computed: {
            containerTop() {
                let top = 0
                // #ifdef H5
                    top = 44
                // #endif
                return top;
            },
            // 容器高度
            containerHeight() {
                return this.windowHeight - 48;
            },
            // 屏幕宽度
            windowWidth() {
                return this.sysInfo.windowWidth;
            },
            windowHeight() {
                return this.sysInfo.windowHeight;
            },
            // 图片宽高比
            imageRatio() {
                if (this.imageRealHeight > 0) {
                    return this.imageRealWidth / this.imageRealHeight
                }
                return 0
            },
            // 等比缩放后的宽度
            imageWidth() {
                if (this.imageRatio >= 1) {
                    return this.windowWidth
                }
                return this.windowWidth * this.imageRatio
            },
            // 等比缩放后的高度
            imageHeight() {
                if (this.imageRatio >= 1) {
                    return this.windowWidth / this.imageRatio
                }
                return this.windowWidth
            },
        },
        methods: {
            rotateHandler() {
                if(this.rotate == 3) {
                    this.rotate = 0;
                } else {
                    ++this.rotate
                }
            },
            init() {
                this.rotate = 0;
                this.scale = 1;
                this.cropW = this.cropWidth
                this.cropH = this.cropHeight
                uni.showLoading({
                    title: '图片加载中...',
                })
                this.loadImage(this.src).then((e) => {
                    uni.hideLoading()
                }).catch((e) => {
                    uni.hideLoading()
                    uni.showModal({
                        title: '标题',
                        content: '图片加载失败'
                    })
                })
            },
            loadImage(src) {
                const _this = this
                return new Promise((resolve, reject) => {
                    uni.getImageInfo({
                        src: src,
                        success: (res) => {
                            _this.imageRealWidth = res.width
                            _this.imageRealHeight = res.height

                            _this.cropOffsertX = _this.windowWidth / 2 - _this.cropW / 2
                            _this.cropOffsertY = _this.windowHeight / 2 - _this.cropH / 2
                            _this.show = true

                            _this.$nextTick(() => {
                                _this.x = _this.windowWidth / 2 - _this.imageWidth / 2
                                _this.y = _this.containerHeight / 2 - _this.imageHeight / 2
                            });
                            resolve(res)
                        },
                        fail: (e) => {
                            _this.show = false
                            reject(e)
                        }
                    })
                });

            },
            cancel() {
                this.show = false
                this.$emit('cancel')
            },
            confirm(event) {
                uni.showLoading({
                    title: '裁剪中...',
                })
                const _this = this
                const ctx = uni.createCanvasContext('myCanvas', _this);

                const pixelRatio = _this.pixelRatio
                const imgage = _this.src
                const imgW = _this.imageWidth * _this.scale;
                const imgH = _this.imageHeight * _this.scale
                const rotate = _this.rotate
                let dx = _this.cropOffsertX - _this.x - (_this.imageWidth - imgW) / 2;
                let dy = _this.cropOffsertY - _this.y - (_this.imageHeight - imgH) / 2;

                ctx.setFillStyle('white')
                ctx.fillRect(0, 0, imgW, imgH)
                ctx.save()

                ctx.rotate((rotate * 90 * Math.PI) / 180);
                switch (rotate) {
                    case 1:
                        dx += (imgH-imgW) / 2
                        dy -= (imgH-imgW) / 2
                        ctx.drawImage(imgage, -dy, dx, imgW, -imgH);
                        break;
                    case 2:
                        ctx.drawImage(imgage, dx, dy, -imgW, -imgH);
                        break;
                    case 3:
                        dx += (imgH-imgW) / 2
                        dy -= (imgH-imgW) / 2
                        ctx.drawImage(imgage, dy, -dx, -imgW, imgH);
                        break;
                    default:
                        ctx.drawImage(imgage, -dx, -dy, imgW, imgH);
                        break;
                }
                ctx.restore()
                ctx.draw(false, () => {
                    uni.canvasToTempFilePath({
                        canvasId: 'myCanvas',
                        destWidth: _this.cropW * pixelRatio,
                        destHeight: _this.cropH * pixelRatio,
                        success: (res) => {
                            uni.hideLoading()
                            event.detail.tempFilePath = res.tempFilePath
                            _this.show = false
                            _this.$emit('confirm', event)
                        },
                        fail: (e) => {
                            uni.hideLoading()
                            uni.showModal({
                                title: '提示',
                                content: '裁剪失败'
                            })
                        }
                    }, _this);
                })

            },
            imgTouchStart(e) {
                if(e.touches.length == 2) {
                    this.oldScale = this.scale
                    this.scaling = true
                    const x = e.touches[0].pageX - e.touches[1].pageX
                    const y = e.touches[0].pageY - e.touches[1].pageY
                    const hypotenuse = Math.sqrt(
                        Math.pow(x, 2) +
                        Math.pow(y, 2)
                    )

                    this.startL = Math.max(x, y, hypotenuse)
                    uni.showModal({
                        content: this.startL
                    })
                } else {
                    this.startX = e.touches[0].pageX - this.x
                    this.startY = e.touches[0].pageY - this.y
                }
            },
            imgMoveing(e) {
                if(this.scaling) {
                    let scale = this.oldScale

                    const x = e.touches[0].pageX - e.touches[1].pageX
                    const y = e.touches[0].pageY - e.touches[1].pageY
                    const hypotenuse = Math.sqrt(
                        Math.pow(x, 2) +
                        Math.pow(y, 2)
                    )

                    const newL = Math.max(x, y, hypotenuse)

                    const cha = newL - this.startL;

                    // 根据图片本身大小 决定每次改变大小的系数, 图片越大系数越小
                    // 1px - 0.2
                    let coe = 1;
                    coe =
                        coe / this.imageWidth > coe / this.imageHeight
                            ? coe / this.imageHeight
                            : coe / this.imageWidth;
                    coe = coe > 0.1 ? 0.1 : coe;
                    const num = coe * cha;

                    if (cha > 0) {
                        scale += Math.abs(num);
                    } else if (cha < 0) {
                        scale > Math.abs(num) ? (scale -= Math.abs(num)) : scale;
                    }

                    this.scale = scale;
                } else {
                    const moveX = e.touches[0].pageX - this.startX
                    const moveY = e.touches[0].pageY - this.startY

                    this.x = moveX
                    this.y = moveY
                }
            },
            imgMoveEnd() {
                setTimeout(() => {
                    this.scaling = false
                }, 100)
            },
            touchStart(e) {
                this.startX = e.touches[0].pageX - this.cropOffsertX;
                this.startY = e.touches[0].pageY - this.cropOffsertY;

                this.cropOldW = this.cropW
                this.cropOldH = this.cropH
            },
            cropMoveing(e) {
                const moveX = this._cropX(e.touches[0].pageX - this.startX)
                const moveY = this._cropY(e.touches[0].pageY - this.startY)

                this.cropOffsertX = moveX
                this.cropOffsertY = moveY
            },
            dragMove(e, type) {
                if(this.cropFixed) {
                    return false
                }
                const moveX = e.touches[0].pageX - this.startX
                const moveY = e.touches[0].pageY - this.startY
                switch (type) {
                    case 'left-top':
                        this._cropMoveLeft(moveX)
                        this._cropMoveTop(moveY)
                        break;
                    case 'middle-top':
                        this._cropMoveTop(moveY)
                        break;
                    case 'right-top':
                        this._cropMoveTop(moveY)
                        this._cropMoveRight(moveX)
                        break;
                    case 'middle-right':
                        this._cropMoveRight(moveX)
                        break;
                    case 'right-bottom':
                        this._cropMoveRight(moveX)
                        this._cropMoveBottom(moveY)
                        break;
                    case 'middle-bottom':
                        this._cropMoveBottom(moveY)
                        break;
                    case 'left-bottom':
                        this._cropMoveBottom(moveY)
                        this._cropMoveLeft(moveX)
                        break;
                    case 'middle-left':
                        this._cropMoveLeft(moveX)
                        break;
                    default:
                        break;
                }
            },
            _cropMoveTop(y) {
                const topY = this._cropY(y)
                this.cropH += this.cropOffsertY - topY
                this.cropOffsertY = topY
            },
            _cropMoveRight(x) {
                if(this.cropOldW + x >= this.windowWidth - this.border) {
                    return false;
                }
                this.cropW = this.cropOldW + (x  - this.cropOffsertX)
            },
            _cropMoveBottom(y) {
                if(this.cropOldH + y >= this.windowHeight - this.containerTop - this.border) {
                    return false;
                }
                this.cropH = this.cropOldH + (y  - this.cropOffsertY)
            },
            _cropMoveLeft(x) {
                const leftX = this._cropY(x)
                this.cropW += this.cropOffsertX - leftX
                this.cropOffsertX = leftX
            },
            _cropX(x) {
                if(x <= this.border) {
                    return this.border
                }
                if(x + this.cropW >= this.windowWidth - this.border) {
                    return this.windowWidth - this.cropW - this.border
                }
                return x
            },
            _cropY(y) {
                if(y <= this.border) {
                    return this.border
                }
                if(y + this.cropH >= this.windowHeight - this.containerTop - this.border) {
                    return this.windowHeight - this.cropH - this.containerTop - this.border
                }
                return y
            }
        }
    }
</script>

<style scoped lang="css">

    @font-face {
        font-family: "iconfont";
        src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAR4AAsAAAAACKgAAAQsAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqEfIRGATYCJAMMCwgABCAFhG0HShugB8gOJUHBwAAAAAFEBNmwzd4dtatSmmpFoVAEhUThEAYkCozFKDCqCVO6RfH/89v869awDnTR1qrSANFt4GG4SNxreBn91fmV9f3+53J613ieHba+N1zmGM8PA7oXTaCAxpjei8IoLWFsGLu4jPME6vWJJdovqmgAO4U2LRBnep0K7GJmpYQWanXVOWuLuAFrtenK4haAa/f38QnKsCOpyrRFh6eFWsh5KXnfYcn958BGQNKfE8wmMmaAQpzkuo9Z+ukZluoltVV5abUipL5i/ysArlhWVut/eCRBVNPUjYg6oUo7JTHFoaYDSvdacnKTq9GAB4AY5y2dtL3qpFh1DENdnJC6Hq+xYb7pyRMDMzc/fYoJjY8flwO3m98rMucF+IZHj6Cagw5UeKpxyFbt2rHGY/8jpa7CYMvLfcIesLjY3bdqhaf+nqgQs2qT/+rjCH/VfA0VFGuAC3iE8NEr/Vau8vZsXiUy7+V3c3tQQXMAuNjDCC89KDIHH0OFhnUi81GEPwyc7wZUaN7DnUf4g+ZLQsMKYV/94NjK7R7TEM4niTY1oJ5zEU62aNVaasUub08YLUEam5EnT6a61/I17dNk+vTu9jpJjXhsTFwjqTtpCBxBIIgS6iQnc/Zod1YGKp0rAwsD8kkyP6AwcK0hcAwkiQmBhWvxPZWKDu86aUH2nLEdi9rGX1eXq5P6A1SrnAucMVMdZH/GKi/jyfCqJyucfK3mXpVujXOPfFf5LC4Dvx0X/943JyOq4HuCTZ8KiIPPAb6ro8akpT6ufiq39BQrNlk5mp8pO0JlJLk8f5QalRjoP60IMx0N8n7wGhSD3n6/F1zlcTVz/cR+Ev0lkLSTd7UiPbD/wCxGRMA2Krwro2O0bTQtImbwhjAJc0S3N4ROx15/PH60IzaIOjCbEelqkDOfETNxb/FMixnWNzeJp2KPQw9A5d76jGUOQOUvH7RE/o2RfkNatd3OGf9q0QKbnq8WB7qy+hVqJRjJn1BQgP/iErks0yy5iGJTrOayW7C/z0IoZH0qNH+7N+31XXc7G2p1hZDU6IWs1ghaqDNQpcEKVKu1BfWmFW9u0IFhKUodpswCEFodgqTZHWStbqOF+hqqdPsG1VrDEuodhfueDcZCj+QzuIrFtZh6BNNraIowbCzi1dbhOlOfionKXHoTzgzoY5hCKk/minEKZ/pYMDCoU7IsgREM3Y8Vgcvwvj4aMzK0AdewUpJljWkyGZH3IKmG7gfEHgZOhYXTwqiNwOhp0CiE3ZiFpL5fB6dj0keFKcGV+JvgGAP0vWMUpOQ10GI1VQt3LoMHDNJRYrEIPInAoPXDFEEnrk9P0zDG/FEGOA2WFNkiaZRGhuoRddXS8bX917cL6mn9c6TIUXSekybKHKQfJXFq2KSiRklLYU8dNKWDIX0cAA==') format('woff2');
    }

    .vue-cropper {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 998;
        box-sizing: border-box;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        direction: ltr;
        touch-action: none;
        text-align: left;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
    }

    .cropper-canvas {
        position: absolute;
        top: -9999px;
        left:-9999px;
        z-index: -998;
    }

    .vue-cropper .uni-info__ft {
        position: absolute;
        line-height: 48px;
        font-size: 18px;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 998;
    }

    .btn-group {
        position: absolute;
        right: 30px;
        bottom: 78px;
        z-index: 998;
    }

    .btn-item {
        position: relative;
        width: 40px;
        height: 40px;
        background: #fff;
        border-radius: 20px;
        padding: 10px;
        display: inline-block;
        margin-left: 10px;
    }

    .btn-item:active {
        background: #ccc;
    }

    .rotate-btn {
        font-family: "iconfont" !important;
        font-size: 24px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 20px;
    }

    .rotate-btn:before {
        content: "\e65c";
        margin-left: -2px;
    }

    .reset-btn {
        font-family: "iconfont" !important;
        font-size: 24px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 20px;
    }

    .reset-btn:before {
        content: "\e648";
        margin-left: -2px;
    }

    .vue-cropper .uni-info__ft:after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #d5d5d6;
        color: #d5d5d6;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        z-index: 998;
    }

    .vue-cropper .uni-modal__btn {
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        color: #3cc51f;
        text-decoration: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        position: relative;
        text-align: center;
        background-color: #fff;
        z-index: 998;
    }

    .vue-cropper .uni-modal__btn:first-child:after { display:  none }
    .vue-cropper .uni-modal__btn:after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 1px;
        bottom: 0;
        border-left: 1px solid #d5d5d6;
        color: #d5d5d6;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleX(.5);
        transform: scaleX(.5);
        z-index: 998;
    }

    .vue-cropper .uni-modal__btn:active {
        background-color: #eee;
    }

    .cropper-box,
    .cropper-box-canvas,
    .cropper-drag-box,
    .cropper-crop-box,
    .cropper-face {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        user-select: none;
        z-index: 998;
    }

    .uni-image {
        width: 100%;
        height: 100%;
    }

    .cropper-box-canvas image {
        position: relative;
        text-align: left;
        user-select: none;
        transform: none;
        max-width: none;
        max-height: none;
        z-index: 998;
    }

    .cropper-box {
        overflow: hidden;
    }

    .cropper-move {
        cursor: move;
    }

    .cropper-crop {
        cursor: crosshair;
    }

    .cropper-modal {
        background: rgba(0, 0, 0, 0.5);
    }

    .pointer-events {
        pointer-events:none;
    }

    .cropper-crop-box {
        /*border: 2px solid #39f;*/
    }

    .cropper-view-box {
        display: block;
        overflow: hidden;
        width: 100%;
        height: 100%;
        outline: 1px solid #39f;
        outline-color: rgba(51, 153, 255, 0.75);
        user-select: none;
    }

    .cropper-view-box image {
        user-select: none;
        text-align: left;
        max-width: none;
        max-height: none;
    }

    .cropper-face {
        top: 0;
        left: 0;
        background-color: #fff;
        opacity: 0.1;
    }

    .crop-line {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        opacity: 0.1;
        z-index: 998;
    }

    .line-w {
        top: -3px;
        left: 0;
        height: 5px;
        cursor: n-resize;
    }

    .line-a {
        top: 0;
        left: -3px;
        width: 5px;
        cursor: w-resize;
    }

    .line-s {
        bottom: -3px;
        left: 0;
        height: 5px;
        cursor: s-resize;
    }

    .line-d {
        top: 0;
        right: -3px;
        width: 5px;
        cursor: e-resize;
    }

    .crop-point {
        position: absolute;
        width: 24px;
        height: 24px;
        opacity: 0.75;
        background-color: #39f;
        border-radius: 100%;
        z-index: 998;
    }

    .point-lt {
        top: -12px;
        left: -12px;
        cursor: nw-resize;
    }

    .point-mt {
        top: -15px;
        left: 50%;
        margin-left: -9px;
        cursor: n-resize;
    }

    .point-rt {
        top: -12px;
        right: -12px;
        cursor: ne-resize;
    }

    .point-ml {
        top: 50%;
        left: -12px;
        margin-top: -9px;
        cursor: w-resize;
    }

    .point-mr {
        top: 50%;
        right: -12px;
        margin-top: -9px;
        cursor: e-resize;
    }

    .point-lb {
        bottom: -15px;
        left: -12px;
        cursor: sw-resize;
    }

    .point-mb {
        bottom: -15px;
        left: 50%;
        margin-left: -9px;
        cursor: s-resize;
    }

    .point-rb {
        bottom: -15px;
        right: -12px;
        cursor: se-resize;
    }
</style>