---
layout: post
title: "cursor AI 编程"
date:   2025-02-17
tags: [golang]
comments: true
author: kioshiroi
---
> 未来的每一个程序员都应该是一名优秀的产品经理。

- 默认读者会安装cursor和使用vscode、markdown。

核心功能：Chat和Composer
- @功能菜单 / 拖拽使用

**如何向AI提问？**
1. 让AI复述需求指令(确认AI明白我的需求)
2. 明确需求辐射范围（在Cursor输入框内明确辐射范围）
3. 需求拆解(把需求一条条描述用列表发送)
4. 把AI当成一个小孩子，尽可能逻辑清晰，将自己的解决思路提供给AI，可以给一些示例参考

**Cursor整体使用思路**
1. 明确需求。现在Chat模式中，先向AI描述需求，想做什么事情，让AI对你的需求有一个基础了解，然后去问AI如果想要完成自己的需求，可以选择哪些方案，并且可以让AI阐述一下各个方案的优缺点。
2. 选择对应的方案之后，可以在Composer中重新编辑需求，在AI在你的需求和方案框架内生成代码。


合理使用Notepad


**维护更新旧的项目**
1. 让cursor检索整个项目，帮你生成一个.cursorignore文件；在.cursorignore中编辑，添加你想要索引忽略掉的文件；打开设置，点击Feature，去Codebase indexing下面点击Resync Index
2. 把项目相关的一些需求文档、接口文档、开发相关的一些技术文档，全部录入到Docs里以作备用
3. 在项目根目录中，新建一个.cursorrules文件，并且去设置你的项目规则（Markdown格式为由）（不会写可以让AI检索Docs后自己生成一个.cursorrules文件，之后自行修改即可）
4. 新的需求到来时，先与Chat沟通将需求理解透彻，然后创建一个Notepad，在Composer中@这个Notepad生成代码



如需了解更多内容请观看参考视频↓（墙裂推荐！）
**参考视频**：[普通人也可以看的 AI 编程指南 | Cursor 教程｜Cursor 使用技巧和思路｜如何免费使用 Cursor｜AI 编程](https://www.bilibili.com/video/BV1yorUYWEGD?spm_id_from=333.788.videopod.sections&vd_source=df4c297395886e972e6f37ffc786838e)