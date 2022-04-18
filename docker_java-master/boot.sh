#!/bin/sh
#set SERVER_PORT
tomcatconfigfile=$(cd $(dirname $0) && cd ../conf && pwd )
#cp $tomcatconfigfile/server.xml $tomcatconfigfile/server.xml.temp
if [ "$SERVER_PORT" == "" ];then
sed -i "s/#SERVER_PORT#/9291/g" $tomcatconfigfile/server.xml
else
sed -i "s/#SERVER_PORT#/${SERVER_PORT}/g" $tomcatconfigfile/server.xml
fi
#set HTTP_PORT
if [ "$HTTP_PORT" == "" ];then
sed -i "s/#HTTP_PORT#/8080/g" $tomcatconfigfile/server.xml
else
sed -i "s/#HTTP_PORT#/${HTTP_PORT}/g" $tomcatconfigfile/server.xml
fi
#set APP_PATH
if [ "$APP_PATH" == "" ];then
sed -i "s/#APP_PATH#//g" $tomcatconfigfile/server.xml
else
sed -i "s/#APP_PATH#/${APP_PATH}/g" $tomcatconfigfile/server.xml
fi
#cat $tomcatconfigfile/server.xml.temp > $tomcatconfigfile/server.xml
cp /etc/hosts /etc/hosts.temp
sed -i "s/.*$(hostname)/$HOST_IP $(hostname)/" /etc/hosts.temp
cat /etc/hosts.temp > /etc/hosts
/opt/tomcat7/bin/startup.sh && tail -f /opt/tomcat7/logs/catalina.out
