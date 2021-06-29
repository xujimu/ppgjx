# 皮皮工具箱

多款小工具集成 生活学习好帮手! 

## 前言

皮皮工具箱由UNIAPP跨平台框架开发  目前仅我一人在维护  目前已拥有十几种日常小工具 由于个人原因更新缓慢 故此开源 在这里 您可以制作自己的小工具 审核通过后即可提交到app store以及部分安卓应用市场展示 皮皮工具箱架构很简单 您可以快速的上手


# 开发准备

1. 下载开发工具Hbuilder https://www.dcloud.io/hbuilderx.html 为了不必要的麻烦 统一使用正式版v3.1.18 APP开发版

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
   2.  index目录为用户目录 用户注册 登录 反馈 均写在这里

   ![搜狗截图20210629184015](https://ppgjx.com/static/github/img/%E6%A0%B8%E5%BF%83%E7%9B%AE%E5%BD%95.png)