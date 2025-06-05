---
layout: post
title: "智能边缘系统搭建常用教程链接（自用）"
date:   2025-6-2
tags: [edge compute]
comments: true
author: kioshiroi
---
- [ubuntu server下载](https://ubuntu.com/download/server)
- [mac安装ubuntu虚拟机](https://blog.csdn.net/qq_24950043/article/details/123764210)
- [golang官方dl地址](https://go.dev/dl/)
- [ubuntu安装golang](https://cn.linux-console.net/?p=22002)
- [linux安装kubectl](https://kubernetes.io/docs/reference/kubectl/)
- [kagent](https://kagent.dev/docs/getting-started/quickstart)
>> 不知道什么原因，kagent在arm64架构的虚拟机上使用macOS方法才能安装
- [kind安装](https://kind.sigs.k8s.io/docs/user/quick-start/#installation)
- [helm安装](https://helm.sh/docs/intro/install/)
- docker安装
```bash
# 卸载旧版本（如有）  
sudo apt-get remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-selinux docker-engine-selinux docker-engine  

# 安装依赖  
sudo apt-get update  
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common  

# 添加 Docker 官方 GPG 密钥  
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg  

# 添加 Docker 软件源  
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null  

# 安装 Docker  
sudo apt-get update  
sudo apt-get install -y docker-ce docker-ce-cli containerd.io  

# 启动 Docker 服务  
sudo systemctl enable --now docker  
```
[k8s集群搭建](https://blog.csdn.net/m0_53928179/article/details/139068769)
[linux下载火狐浏览器命令](https://worktile.com/kb/ask/460177.html)
[ARM linux 安装Miniconda](https://blog.csdn.net/mhl1107/article/details/143360608)
[linux 安装 conda]https://blog.csdn.net/Alex_81D/article/details/135692506
[ckash for windows chinese github registry](https://github.com/Z-Siqi/Clash-for-Windows_Chinese/releases)
[clash for windows install](https://help.lefly.cloud/contents/linux/cfw.html#%E4%B8%8B%E8%BD%BD%E5%B9%B6%E5%AE%89%E8%A3%85cfw)
[agent function call](https://www.bilibili.com/video/BV1cqdPY8EzT)

[unbuntu安装](https://blog.csdn.net/qq_31649693/article/details/137338828)  
``` 
# Ubuntu 20.04 ARM 源（focal）
deb http://mirrors.aliyun.com/ubuntu-ports/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu-ports/ focal main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu-ports/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu-ports/ focal-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu-ports/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu-ports/ focal-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu-ports/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu-ports/ focal-backports main restricted universe multiverse
```
[mac下安装k8s](https://blog.csdn.net/qq_20042935/article/details/124472626)
- 记得有一步会有问题

[最好用的ubuntu k8s集群搭建方法](https://blog.csdn.net/qq_31649693/article/details/137338828)

[桥接模式](https://blog.csdn.net/weixin_39296283/article/details/104953668)
[netplan使用](https://blog.csdn.net/bigbaojian/article/details/125396045)
[finalshell下载](https://blog.csdn.net/muriyue6/article/details/117520456)
- gpg那一步请使用以下指令：
```
# 从 Ubuntu 密钥服务器获取并添加公钥
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys B53DC80D13EDEF05

# 将公钥导出到专用密钥环（推荐）
sudo gpg --export --armor B53DC80D13EDEF05 | sudo tee /usr/share/keyrings/kubernetes-archive-keyring.gpg
```
- Q:为什么go使用k8s.io库会报错 unknown reversion?
    - A: 因为k8s.io库要求其版本与k8s版本一致，所以需要在go.mod中指定版本。
