# 问题记录
宏诚环境运行esxi，win虚机起不来（esxi版本为6.7，高版本不行）
通过修改xvp节点上的
```
cat /etc/modprobe.d/kvm-nested.conf 
options kvm_intel nested = 1 
options kvm ignore_msrs = 1
```
即可

安徽外事办xvp ceph写入速度慢
ceph版本导致，升级ceph版本解决

飞腾s2500安装xvp问题：
```
安装时需要开启CPU兼容模式并将cpu socket 设置为1
安装完xvp之后需要将CPU兼容模式关闭且cpu socket恢复为2
```
