#!/bin/bash

VERSION=$(xiang version)

# 清理工作目录
rm -rf .tmp

# 创建工作目录
mkdir -p .tmp/source
git clone https://github.com/YaoApp/xii.git .tmp/source
mkdir -p .tmp/source/bin

# 复制文件
cp ~/Code/bin/xiang-$VERSION-linux-amd64 .tmp/source/bin/xae
cp .tmp/source/online.env .tmp/source/.env
chmod +x .tmp/source/bin/xae

# 删除 Git 目录
rm -rf .tmp/source/.git
rm -rf .tmp/source/db/*
rm -rf .tmp/source/plugins/*
rm -rf .tmp/source/*.sh

# 编译飞书插件
cd ../xiang-plugin-feishu && make linux && cd ../xii
mv ../xiang-plugin-feishu/feishu-linux.so .tmp/source/plugins/feishu.so

# 应用文件打包
cd .tmp/source && tar cvfz ../dist.tar.gz . && cd ../..

# 上传到服务器
scp .tmp/dist.tar.gz root@139.199.30.36:/root/dist-xii.tar.gz
ssh root@139.199.30.36 '''rm -rf /data/xii'''
ssh root@139.199.30.36 '''mkdir -p /data/xii/logs'''
ssh root@139.199.30.36 '''cd /data/xii && tar xvfz /root/dist-xii.tar.gz'''
ssh root@139.199.30.36 '''supervisorctl reload'''
ssh root@139.199.30.36 '''supervisorctl stop xii-server > 2&>1 >> /dev/null'''
ssh root@139.199.30.36 '''rm -rf /etc/supervisor/conf.d/xii.conf'''
ssh root@139.199.30.36 '''ln -s  /data/xii/supervisor/online.conf /etc/supervisor/conf.d/xii.conf'''
ssh root@139.199.30.36 '''supervisorctl start xii-server > 2&>1 >> /dev/null'''
ssh root@139.199.30.36 '''cd /data/xii && /data/xii/bin/xae migrate && /data/xii/bin/xae run flows.init.menu && /data/xii/bin/xae run flows.demo.fake > 2&>1 >> /dev/null'''

# 清理工作目录
rm -rf .tmp