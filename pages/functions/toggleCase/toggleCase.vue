<!-- 
	2021/6/29
	xjm
	2524931333@qq.com 
-->
<template>
	<view>
		
		<view class="cu-form-group " style="margin: 20upx 20upx;border-radius:18upx;">
			<textarea   maxlength="-1"  v-model="min" @input="tocase()" placeholder="请输入小写数字"></textarea>
		</view>
		
		
		<view class="cu-form-group " style="margin: 20upx 20upx;border-radius:18upx;">
			<textarea   maxlength="-1"  v-model="max" placeholder="大写数字转换区"></textarea>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				max:'',
				min:''
			}
		},
		methods: {
			tocase(){
				var  n = this.min
				console.log("转换" + n)
				if(!isNaN(n)){
					var fraction = ['角', '分'];
					    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];  
					    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];  
					    var head = n < 0? '欠': '';  
					    n = Math.abs(n); 
					    var s = '';  
					    for (var i = 0; i < fraction.length; i++)   
					    {  
					        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');  
					    }  
					    s = s || '整';  
					    n = Math.floor(n);  
					    for (var i = 0; i < unit[0].length && n > 0; i++)   
					    {  
					        var p = '';  
					        for (var j = 0; j < unit[1].length && n > 0; j++)   
					        {  
					            p = digit[n % 10] + unit[1][j] + p;  
					            n = Math.floor(n / 10);  
					        }  
					        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;  
					    }  
					   this.max = head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
				}else{
					this.max = '您输入的不是数字哦!'
				}
			 
			}
		}
	}
</script>

<style scoped>

	button{
		border-radius: 0;
	}
	button::after{ border: none;} 
</style>
