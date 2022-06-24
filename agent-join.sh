#!/bin/bash
###create docker data###
if [ ! -d /data ]; then
   read -p "please enter your data disk:" disk
   dd if=/dev/zero of=/dev/$disk bs=512 count=1
   echo "disk init successful"
   sleep 3
   pvcreate /dev/$disk
   vgcreate vg_docker /dev/$disk
   lvcreate -L 1G -n lv_docker vg_docker
   lvextend -l 100%FREE /dev/vg_docker/lv_docker
   mkfs.xfs -n ftype=1 /dev/vg_docker/lv_docker
   sleep 3
   mkdir /data
   UUID=`blkid /dev/vg_docker/lv_docker  |awk '{print $2}' |cut -d'"' -f2`
   echo "UUID=$UUID /data xfs defaults,prjquota 0 0" >> /etc/fstab
   mount /data
   mkdir -p /data/docker
   ln -sv /data/docker /var/lib/docker
   sleep 3
else
   echo -e "\033[31m Warnning:docker data is exists! \033[0m"
   sleep 3
fi

###confirm node network###
ping -c 1 -w 1 qq.com
if [[ $? != 0 ]]; then
   echo -e "\033[31m Warnning:your node is off-line! \033[0m"
   echo "nameserver 114.114.114.114" >> /etc/resolv.conf
   sleep 3
else
   echo -e "\033[32m Notice:your node is on-line. \033[0m"
   sleep 3
fi

###install docker and dnsmasq###
if [ -d /opt/csphere-rpm ]
then
    echo -e "\033[31m Warning:off-line repo exists! \033[0m"
    yum -y --disablerepo='*' --enablerepo=csphere install bridge-utils net-tools psmisc git fuse ntp rng-tools bash-completion linux-firmware bsdiff
    yum -y --enablerepo=csphere install dnsmasq docker-ce-19.03.11
    systemctl start docker && systemctl enable docker
    systemctl start dnsmasq && systemctl enable dnsmasq
else
    tar -zxf /root/csphere-arm64-el7.tgz -C /root
    cp /root/csphere-arm64/csphere-root.repo /etc/yum.repos.d/csphere.repo
    yum -y --disablerepo='*' --enablerepo=csphere install bridge-utils net-tools psmisc git fuse ntp rng-tools bash-completion linux-firmware bsdiff
    yum -y --disablerepo='*' --enablerepo=csphere install dnsmasq docker-ce-19.03.8
    systemctl start docker && systemctl enable docker
    systemctl start dnsmasq && systemctl enable dnsmasq
fi

###install agent###
if [ ! -d /etc/csphere/ ]; then
   tar -zxf csphere-3.0.12-agent-aarch64.tgz 
   cp -r /root/test/usr/* /usr/
   cp -r /root/test/etc/* /etc/
else
    echo -e "\033[31m Warning:agent install file is exists! \033[0m"
fi

###edit agent env###
read -p "enter controller ip:" cip
read -p "enter controller web COS:" cos
read -p "enter network mode:" mode
read -p "enter node ip:" nip
read -p "enter node netmask:" mask
read -p "enter node gateway:" gateway
read -p "enter node subnet:" subnet
sed -i "/^CONTROLLER_ADDR=/cCONTROLLER_ADDR=${cip}:80" /etc/csphere/csphere-agent.env
sed -i "/^AUTH_KEY=/cAUTH_KEY=${cos}" /etc/csphere/csphere-agent.env
sed -i "/^DEFAULT_NETWORK=/cDEFAULT_NETWORK=${mode}" /etc/csphere/csphere-agent.env
sed -i "/^LOCAL_IP=/cLOCAL_IP=${nip}" /etc/csphere/csphere-public.env
sed -i "/^NET_MASK=/cNET_MASK=${mask}" /etc/csphere/csphere-public.env
sed -i "/^DEFAULT_GW=/cDEFAULT_GW=${gateway}" /etc/csphere/csphere-public.env
sed -i "/^NETWORK=/cNETWORK=${subnet}" /etc/csphere/csphere-public.env
sed -i "/^COS_CONTROLLER=/cCOS_CONTROLLER=${cip}:80" /etc/csphere/inst-opts.env
sed -i "/^COS_INST_CODE=/cCOS_INST_CODE=${cos}" /etc/csphere/inst-opts.env


###update agent version###
yum -y install wget
arch=$(lscpu |awk '{print $2}' | head -n 1)
wget http://d.xii.cloud/binaries/v3.0/$arch/csphere-agent-3.0.17-c20d1816-$arch
mv csphere-agent-3.0.17-c20d1816-$arch csphere
chmod +x csphere
mv csphere /usr/bin/csphere
csphere version
sleep 5

###start agent and join cluster###
sh /etc/csphere/tls.sh
cspherectl restart agent
cspherectl status
sleep 3
systemctl enable csphere-agent

###configure dnsmasq###
mv /etc/dnsmasq.conf /etc/dnsmasq.conf-bak
echo "port=53" > /etc/dnsmasq.conf
echo "server=/csphere/local/$cip" >> /etc/dnsmasq.conf
cat /etc/dnsmasq.conf
echo -e "\033[32m Notice:please check dnsmasq.service config. \033[0m"
sleep 5

###update kernel###
#main_version=`uname -r |awk -F'.' '{print $1}'`
#minor_version=`uname -r |awk -F'.' '{print $2}'`
#if [[ ${main_version} -eq 4 && ${minor_version} -eq 14 ]]; then
#   echo -e "\033[32m Notice:your kernel is ok. \033[0m"
#   sleep 3
#else
#   echo -e "\033[31m Warnning:your kenel is lower,going update... \033[0m"
#   sleep 3
#  yum -y install kernel-lts iproute
#   grub2-set-default 0
#   sleep 3
#   echo -e "\033[31m Notice:your kenel is update successed please run reboot! \033[0m"
#fi

