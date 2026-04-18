#!/bin/bash
echo "==================================="
echo "  JND28 Bot 启动脚本"
echo "==================================="

# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo "正在安装依赖..."
    npm install --production
fi

# 创建数据目录
mkdir -p data
chmod 777 data

echo "启动服务..."
node app.js
