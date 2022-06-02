#!/bin/bash
IS_INIT=$IS_INIT
echo "YAO_DB_PRIMARY=$YAO_DB_PRIMARY" >> /data/app/.env
echo "YAO_DB_SECONDARY=$YAO_DB_PRIMARY" >> /data/app/.env
if [ IS_INIT == 1 ]; then
       	yao migrate && yao run flows.init.menu && yao run flows.demo.fake && yao start
else
       	yao migrate && yao run flows.init.menu && yao start
fi
echo "YAO_ENV=production" >> /data/app/.env
yao start