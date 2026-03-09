# 嘢营CAMPLARK - 阿里云部署指南

## 一、前置准备

### 1. 阿里云 ECS 服务器
- 系统：**Ubuntu 24.04 64 位**（推荐）、Ubuntu 22.04 或 CentOS 7+
- 配置：1 核 2G 及以上
- 开放端口：**80**（HTTP）、**443**（HTTPS，可选）、**22**（SSH）

### 2. 安装环境

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y   # Ubuntu
# 或
sudo yum update -y                       # CentOS

# 安装 Node.js 18+（推荐用 nvm）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# 安装 Nginx
sudo apt install nginx -y    # Ubuntu
sudo yum install nginx -y    # CentOS

# 安装 PM2
npm install -g pm2
```

### 3. 上传代码
使用 Git 或 SCP 将项目上传到服务器，例如：

```bash
# 在服务器上
cd /home/ubuntu  # 或你的用户目录
git clone <你的仓库地址> campsite-booking
cd campsite-booking
```

---

## 二、部署步骤

### 方式 A：使用部署脚本（推荐）

```bash
cd /home/ubuntu/campsite-booking
chmod +x deploy/deploy.sh
bash deploy/deploy.sh
```

### 方式 B：手动部署

```bash
# 1. 构建前端
cd admin-platform && npm install && npm run build && cd ..
cd admin-camp && npm install && npm run build && cd ..

# 2. 部署静态文件
sudo mkdir -p /var/www/camplark
sudo cp -r admin-platform/dist /var/www/camplark/admin-platform
sudo cp -r admin-camp/dist /var/www/camplark/admin-camp

# 3. 启动后端
cd backend-node && npm install && cd ..
pm2 start deploy/ecosystem.config.cjs

# 4. 配置 Nginx
sudo cp deploy/nginx.conf /etc/nginx/sites-available/camplark  # Ubuntu
sudo ln -sf /etc/nginx/sites-available/camplark /etc/nginx/sites-enabled/
# 编辑配置，将 your_domain.com 改为你的域名或 IP
sudo nginx -t && sudo systemctl reload nginx
```

---

## 三、Nginx 配置

1. 复制并编辑配置：
```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/camplark
sudo nano /etc/nginx/sites-available/camplark
```

2. 将 `your_domain.com` 改为：
   - 你的域名（如 `admin.camplark.com`）
   - 或服务器公网 IP（如 `47.96.xxx.xxx`）

3. 启用并重载：
```bash
sudo ln -sf /etc/nginx/sites-available/camplark /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 四、访问地址

| 系统       | 地址                         |
|------------|------------------------------|
| 平台管理端 | `http://你的IP/` 或 `http://域名/` |
| 营地管理端 | `http://你的IP/camp/` 或 `http://域名/camp/` |

**默认账号：**
- 平台：`admin` / `admin123`
- 营地（松岭森林）：`camp1` / `camp123`
- 俱乐部：`club1` / `club123`

---

## 五、HTTPS（可选）

1. 申请免费证书（阿里云 SSL 或 Let's Encrypt）
2. 在 Nginx 配置中取消 HTTPS 段注释，填入证书路径
3. `sudo systemctl reload nginx`

---

## 六、常用命令

```bash
# 查看后端日志
pm2 logs camplark-api

# 重启后端
pm2 restart camplark-api

# 重新部署（更新前端）
bash deploy/deploy.sh
```

---

## 七、微信小程序

小程序需配置 **服务器域名**（微信公众平台 → 开发 → 开发设置 → 服务器域名）：
- request 合法域名：`https://你的域名`
- 必须使用 **HTTPS**
