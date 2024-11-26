---
layout: post
title: "invalid character '-' in numeric literal错误"
date:   2024-11-26
tags: [vue]
comments: true
author: kioshiroi
---

笔者在做软件工程大作业时遇到了这样一个问题：
```plain
invalid character '-' in numeric literal错误
```

经笔者检查，错误原因为：前端向后端发送的是**from-data**格式，后端写的逻辑是把前端发过来的信息当做**JSON**格式解析，所以就一直错，格式不匹配。

![](images/20041126/image.png)

只需要把这个'Content-Type'从'application/form-data'改成'application/json'.

### 参考文献
> [https://blog.csdn.net/csde12/article/details/121764104](https://blog.csdn.net/csde12/article/details/121764104)