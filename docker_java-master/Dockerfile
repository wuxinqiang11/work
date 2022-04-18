#---------------------------------------------------------------------
#This is a comment注释
#使用基础镜像centos:6
FROM dockerhub.lvmama.com/lvmama/centos6-openjdk7-tomcat7:0.0.1
#指定镜像创建者信息
MAINTAINER wangpengpeng <<A href="mailto:wangpengpeng@lvmama.com">wangpengpeng@lvmama.com>
#切换镜像的目录，进入/usr目录（基础镜像是一个linux系统，可参照linux查看相应目录）
WORKDIR /opt
#将宿主机的tomcat目录下的全部文件考入至镜像的/opt/tomcat目录下
RUN mkdir -p /var/www/webapps/
COPY php-service  /var/www/webapps/php-service
RUN sed -i "s/#APP_NAME#/php-service/g" /opt/tomcat7/conf/server.xml
#设置环境变量
#ENV JAVA_HOME=/usr/java/jdk
#ENV JAVA_BIN=/usr/java/jdk/bin
#ENV PATH=$PATH:$JAVA_HOME/bin
#ENV CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
#设置容器启动时执行的操作
#CMD sh /opt/tomcat7/bin/startup.sh
COPY boot.sh /opt/tomcat7/bin/boot.sh
CMD sh /opt/tomcat7/bin/boot.sh
#ENTRYPOINT /opt/tomcat7/bin/boot.sh
#---------------------------------------------------------------------
