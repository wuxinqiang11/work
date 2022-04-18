# docker_java

基础镜像从百度云下载,连接为:

https://pan.baidu.com/s/1FlhucFTLY61i7qoEhDZFOw


执行过程

docker build -t php-service-1 .

 --name=   一定要加上等于号 
docker run -d -p 6089:8080  -it -e HOST_IP=10.113.1.191 -e SERVER_PORT=9133 -e HTTP_PORT=8087 -e APP_PATH=php-service --name=wpp_tomcat7_php-service-1 php-service-1


docker run -it -d  -p 43080:8080 -p 43009:8009 --name wpp_qa-server5.3_1 wpp_qa-server5.3
