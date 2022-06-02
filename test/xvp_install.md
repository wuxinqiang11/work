# xvp学习环境安装指南

## 在本地电脑准备好一个虚拟机
1. 内存4G以上
2. 虚拟硬盘2块，第一块安装操作系统，不少于10GB，第二块用于做虚机存储，不少于10GB，安装过程中第二块硬盘可以空着

## 安装debian 10操作系统，可以选择最小化安装
具体去debian官网下载iso，然后安装

## 安装xvp

0. 如不在公司办公室，需要拨叫vpn

1. 准备apt源

```
$ echo 192.168.14.147 repo.xii.cloud download.xii.cloud >> /etc/hosts
$ echo "deb http://repo.xii.cloud/debian buster xvp-test" >> /etc/apt/sources.list.d/xvp.list 
$ apt-get install -y gnupg
$ wget http://repo.xii.cloud/debian/xvp-2019.gpg -O - | apt-key add -
```

2. hostname
假设准备的主机，hostname设为xvp1，虚拟机ip为192.168.5.5。注意ping hostname，必须得到虚拟机ip。

```
# hostnamectl set-hostname xvp1
# echo 192.168.5.5 xvp1 >> /etc/hosts
# ping xvp1
```
注意在/etc/hosts文件中，如果存在127.0.0.1地址解析到非localhost时，将此解析删除。比如:
`127.0.0.1 zcy02.xvp zcy02 `

3. 安装软件包
```
# apt-get update
# apt-get install -y xiicloud-vp
```
提示：安装过程中会询问，samba服务是否使用DHCP,选择“YES”继续安装。

4. 浏览器访问 `https://192.168.5.5:8848/` ，使用虚拟机的root账号密码登录。由于是虚拟机，在学习时，创建轻虚机来学习，不支持在虚拟机中创建虚拟机。

5. 可以先下载轻虚机模板文件。具体在 `目录` 存储的模板里。产品详细的使用，不清楚先阅读文档
  
## 在UOS上搭建xvp集群
1. 准备apt源

```
$ echo "deb http://repo.xii.cloud:42224/debian buster xvp-test" >> /etc/apt/sources.list.d/xvp-test.list 
$ apt-get install -y gnupg
$ echo "139.198.6.76  repo.xii.cloud" >> /etc/hosts 
添加公司apt源的解析(139.198.6.76这个是外网的IP，如果是在非公司的环境下安装，需要找王总打开外网的映射，内网的配置参考上面Debian的配置)
$ wget http://repo.xii.cloud:42224/debian/xvp-2019.gpg -O - | apt-key add -
```
uos配置apt源将下面的添加到/etc/apt/sources.list  
deb [trusted=yes] http://pools.deepin.cn/ppa/dde-eagle  eagle main non-free contrib   
deb [trusted=yes] http://uos.packages.chinauos.com/uos  eagle main non-free contrib   

2. hostname
假设准备的主机，hostname设为xvp1,ping hostname，必须得到虚拟机ip。

```
# hostnamectl set-hostname xvp1
# echo 本机IP xvp1 >> /etc/hosts
# ping xvp1 显示的IP是本地IP而不是127.0.0.1
```
注意在/etc/hosts文件中，如果存在127.0.0.1地址解析到非localhost时，将此解析删除。比如:
`127.0.0.1 zcy02.xvp zcy02 `

3. 安装软件包
```
# apt-get update
# apt-get install -y xiicloud-vp
```
提示：安装过程中会询问，samba服务是否使用DHCP,选择“YES”继续安装。  
提示：还会询问默认的配置文件/etc/apt/sources.list.d/xvp-test.list 是否使用当前版本，填入N或者键入回车键就可以。  

4. 浏览器访问 `https://IP:8848/` ，使用虚拟机的root账号密码登录。由于是虚拟机，在学习时，创建轻虚机来学习，不支持在虚拟机中创建虚拟机。  

5. 可以先下载轻虚机模板文件。具体在 `目录` 存储的模板里。产品详细的使用，不清楚先阅读文档  
以下操作为 创建一个lvm-thin pool  
```
创建块元素  
pvcreate --metadatasize 250k -y -ff /dev/sdb1 改成对应的磁盘分区  
创建卷组  
vgcreate vmdata /dev/sdb1  
创建一个thin pool  
lvcreate -L 1000G -T -n local-lvm-thin vmdata  
为这个存储池扩容  
lvresize --size +300G vmdata/local-lvm-thin
```
之后可以在xvp页面点击资源树集群-存储选项添加lvm-thin  

6. 读取集群license（如果创建集群，每个节点安装好之后不可以执行其他操作，要选择一个节点创建集群，当3个节点都加入集群后再进行其他操作）  
在那个节点上创建了集群就在那个节点上执行（如果node2页面上创建了集群，那么就需要在node2的后台上执行以下操作）  
```
apt-get clean  
apt-get update    
apt-get install xvp-cluster  
```
p.s. 读取license信息后需要将license文件删除  
然后切换到license文件所在的目录，执行以下操作  
cat loongson.lic | lic_load  中科龙芯  

读取完license后需要将每个节点上的xvp-cluster服务重启一下  
systemctl restart xvp-cluster  

7. 配置网桥  
```
#卸载NetworkManger  
apt-get purge libkf5networkmanagerqt6  
apt-get autoremove 
```
然后在xvp页面或者节点后台修改配置文件进行配置网桥，确保网络配置正确后，重启机器即可  

8. 禁用udisks2
```
systemctl stop udisks2.service   
systemctl disable udisks2.service 
```
  
9. 创建的轻虚机数量多的话，需要修改操作系统的参数
```
sysctl fs.inotify.max_user_instances = 2048
echo “sysctl fs.inotify.max_user_instances = 2048” >>/etc/sysctl.conf
```
加到/etc/sysctl.conf配置里，这样永久生效 
