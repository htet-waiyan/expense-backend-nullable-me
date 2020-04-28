 _#!/bin/bash_

export PM2_HOME=/home/ubuntu/.pm2  
pm2 delete all
cd /home/ubuntu/apps/spllit-as
pm2 start ecosystem.as.json
cd /home/ubuntu/apps/spllit-backend
pm2 start ecosystem.backend.json