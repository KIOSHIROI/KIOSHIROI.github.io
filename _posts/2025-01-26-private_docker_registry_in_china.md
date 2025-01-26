---
layout: post
title: "docker私人仓库搭建方案指南"
date:   2025-01-26
tags: [docker]
comments: true
author: kioshiroi
---
[Docker仓库之Registry私有镜像仓库的搭建与使用](https://www.cnblogs.com/xyh9039/p/18509420)
可能遇到网络问题，加入代理：
[【云原生Docker | 报错01】大力出奇迹，解决docker_Error response from daemon_Get “https://registry-1.docker.io/v2/“](https://blog.csdn.net/lx1056212225/article/details/144651418)

并行下载镜像：
Linux:
```bash
echo "ubuntu:20.04 alpine:latest nginx:latest redis:latest mysql:5.7 postgres:13 python:3.9 node:14 openjdk:11" | xargs -n 1 -P 4 docker pull
```

