---
> **calendar**
>> **日期选择组件**  
---
> 此组件/插件，可选多个日期，自定义可选日期，自定义标注文字
---
**使用方式**

引用组件

```$xslt
import calendar from '@/components/calendar/calendar.vue'
export default {
    components:{
        calendar
    }
}
```

使用组件

```
<gpp-date-picker @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate" :endDate="endDate" :defaultValue="pickerDate">
    {{pickerDate}}
</gpp-date-picker>
```

```$xslt
/**
 * Calendar 日历
 * @property {String} startDate 日期选择范围-开始日期
 * @property {String} endDate 日期选择范围-结束日期
 * @property {Boolean} limitFlag 是否限定日期
 * @property {Array} selectedDate 已选日期
 * @property {Boolean} showMonth 是否以月份为背景
 * @property {Array} selected 限定日期 格式[{date: '2019-06-27', info: '充足'}]
 * @event {Function} change 日期改变
 * @event {Function} monthSwitch 切换月份时触发
 * 
 */
```

属性说明

|属性名|类型|默认值|说明|
|---|---|---|---|
|startDate|String|空|日期选择范围-开始日期 limitFlag == true 有效|
|endDate|String|空|日期选择范围-结束日期 limitFlag == true 有效|
|limitFlag|Boolean|false|是否限定日期|
|showMonth|Boolean|true|是否以月份为背景|
|selectedDate|Array|[ ]|已选日期|
|selected|Array|[ ]|限定日期 格式[{date: '2019-06-27', info: '充足'}]|

事件说明

|事件名称|说明|返回值|
|---|---|---|
|change|选择日期触发|{...}|
|monthSwitch|月份改变出发|{...}|



