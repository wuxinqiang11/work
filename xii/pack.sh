#!/bin/bash

# 清理工作目录
rm -rf .tmp
rm -rf ./dist

# 创建工作目录
mkdir -p .tmp/source
git clone https://github.com/YaoApp/xii.git .tmp/source

# 删除 Git 目录
rm -rf .tmp/source/.git
rm -rf .tmp/source/db/*
rm -rf .tmp/source/plugins/*
rm -rf .tmp/source/*.sh
rm -rf .tmp/source/.env
rm -rf .tmp/source/online.env
rm -rf .tmp/source/traefix.toml
rm -rf .tmp/source/README.md

# 应用文件打包
cd .tmp/source && tar cvfz ../dist.tar.gz . && cd ../..
mkdir ./dist
mv .tmp/dist.tar.gz ./dist/xae-0.9.2.tar.gz


# 清理工作目录
rm -rf .tmp