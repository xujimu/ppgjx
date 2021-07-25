# 皮皮工具箱

多款小工具集成 生活学习好帮手! 

## 前言

皮皮工具箱由UNIAPP跨平台框架开发  目前仅我一人在维护  目前已拥有十几种日常小工具 由于个人原因更新缓慢 故此开源 在这里 您可以制作自己的小工具 审核通过后即可提交到app store以及部分安卓应用市场展示 皮皮工具箱架构很简单 您可以快速的上手


# 开发准备

1. 下载开发工具Hbuilder https://www.dcloud.io/hbuilderx.html 为了不必要的麻烦 统一使用正式版v3.1.22 APP开发版

2. 安装 node.js 版本 v10.8.0 npm  版本 6.2.0 建议使用相同版本 

3. 安装git

4. 克隆

   ```
    git clone https://github.com/xujimu/ppgjx.git
   ```


5. 安装uview 在项目的根目录执行

   ```
   npm install uview-ui
   ```

6. 为Hbuilder安装 sass插件 (使用HBuilderX导入插件即可) 安装后重启HBuilder

   ```
   https://ext.dcloud.net.cn/plugin?name=compile-node-sass
   ```

7. 模拟器或真机测试

   ![搜狗截图20210629181520](https://ppgjx.com/static/github/img/%E8%BF%90%E8%A1%8C%E6%88%AA%E5%9B%BE.png)

   

# 架构

1. 根目录结构

   ![搜狗截图20210629183505](https://ppgjx.com/static/github/img/%E6%A0%B9%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84.png)

2. pages 目录有两个子目录functions 和index  对应app功能栏 功能 - 我

   1.  functions的每个子目录对应一个小工具
   2.  index目录为用户目录 用户注册 登录 反馈页面 均写在这里

   ![搜狗截图20210629184015](https://ppgjx.com/static/github/img/%E6%A0%B8%E5%BF%83%E7%9B%AE%E5%BD%95.png)

# 开发

1. 在functions创建小工具目录 expressCheck(快递查询) 

   ![](https://ppgjx.com/static/github/img/%E5%BF%AB%E9%80%92%E6%9F%A5%E8%AF%A2.png)
   
   ![](https://ppgjx.com/static/github/img/%E5%BF%AB%E9%80%92%E6%9F%A5%E8%AF%A21.png)

2. 在vuex注册你的小工具 注册完启动模拟器即可看到自己的小工具展示(图2)

   ![](https://ppgjx.com/static/github/img/%E6%B3%A8%E5%86%8C%E5%B0%8F%E5%B7%A5%E5%85%B7.png)

   在pages.json填入你的工具名称 即小工具工具标题栏 这里修改完需要重新编译 也就是断开和模拟器的连接重新连接才会生效

   ![](https://ppgjx.com/static/github/img/注册标题.png)

   ![注册完毕](https://ppgjx.com/static/github/img/注册完毕.png)

3. 到此 您便可开发自己的小工具了 开发完毕后提交 通过审核开发者会提交到应用市场更新

# 开发规范

1. 由于开源的不可控性 为了保证用户隐私安全 目前仅支持协作开发者制作离线小工具 不允许调用第三方api 

2. 如需用到本地储存和数据库 请发送邮件至2524931333@qq.com申请

3. 各司其职 请不要修改其他开发者开发的小工具代码 

4. 请在代码前用注释的方式留下创建时间 署名 邮箱

   ```
   <!-- 
   	2021/6/29
   	xjm
   	2524931333@qq.com 
   -->
   ```

5. 请不要在工具内留任何联系方式 

6. 请勿开发违规工具 如 短信轰炸机 影视等 影响应用审核上架的将不会通过审核

   

# 开发奖励

	1. 开发奖励 只需成功开发一款小工具并上线应用市场审核通过,便可获取20-50元现金奖励(根据小工具复杂度等综合评定)
 	2. 合伙人机制 目前皮皮工具无任何收益 您可以加入我们共同协作开发 后续有收益采取开发小工具数量比例分成 比如某天收入利润1000元 皮皮工具箱共有20款小工具 您开发了5款 您将得到 1000 * 5/20的利润分成 也就是250元
 	3. 默认开发提交无奖励 如需有奖开发请添加微信x2524931333咨询(备注来意)

# 鸣谢

uniapp: https://uniapp.dcloud.io/

uview: https://www.uviewui.com/

colorui: https://www.color-ui.com/

luch-reques: https://www.quanzhan.co/luch-request/

ucharts: https://www.ucharts.cn/