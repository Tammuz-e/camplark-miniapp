#!/bin/bash
# 嘢营CAMPLARK - 阿里云部署脚本
# 在项目根目录执行: bash deploy/deploy.sh

set -e
echo "==> 开始构建..."

# 1. 构建平台管理端
echo "==> 构建 admin-platform"
cd admin-platform
npm ci --silent 2>/dev/null || npm install
npm run build
cd ..

# 2. 构建营地管理端
echo "==> 构建 admin-camp"
cd admin-camp
npm ci --silent 2>/dev/null || npm install
npm run build
cd ..

# 3. 创建部署目录
DEPLOY_DIR="/var/www/camplark"
echo "==> 部署到 $DEPLOY_DIR"
sudo mkdir -p $DEPLOY_DIR
sudo cp -r admin-platform/dist $DEPLOY_DIR/admin-platform
sudo cp -r admin-camp/dist $DEPLOY_DIR/admin-camp

# 4. 安装后端依赖并启动（如未安装 pm2 先执行: npm i -g pm2）
echo "==> 启动/重启后端"
(cd backend-node && npm ci --silent 2>/dev/null || npm install)
mkdir -p logs
pm2 delete camplark-api 2>/dev/null || true
pm2 start deploy/ecosystem.config.cjs

echo "==> 部署完成!"
echo "  - 平台管理: http://你的服务器IP 或 https://你的域名"
echo "  - 营地管理: http://你的服务器IP/camp 或 https://你的域名/camp"
echo "  - 默认账号: admin / admin123（平台） | camp1 / camp123（营地）"
