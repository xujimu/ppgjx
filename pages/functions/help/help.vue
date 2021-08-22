<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
    <view>


    </view>
</template>

<script>
    export default {
		onLoad(option) {
			console.log('链接',option.url)
			this.url = option.url
			uni.setNavigationBarTitle({
			    title: '帮助'
			});

			var top;
			var systemInfo = uni.getSystemInfoSync()
			if (systemInfo.platform == 'android') {
				top= systemInfo.statusBarHeight + 50;
			} else {
				top = systemInfo.statusBarHeight + 45;
			};
			
			var wv = plus.webview.create(this.url, "custom-webview", {
				plusrequire: "none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
				'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
				top: top ,//放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
				height: uni.getSystemInfoSync().screenHeight - top,
				progress:{
					color:'#0000FF'
				}
			})
			var currentWebview = this.$scope.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
			currentWebview.append(wv); //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
		},
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#00aaff'
                    }
                },
				url:'',
				name:''
            }
        }
    }
</script>

<style scoped>

</style>