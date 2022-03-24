# work
宏诚环境运行esxi，win虚机起不来（esxi版本为6.7，高版本不行）
通过修改xvp节点上的
‘cat /etc/modprobe.d/kvm-nested.conf ’
‘options kvm_intel nested = 1 ’
‘options kvm ignore_msrs = 1’
即可
