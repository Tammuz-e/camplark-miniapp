# 找嘢营 营位预订

微信小程序 + Java 后端 + 管理端

## 项目结构

```
campsite-booking/
├── miniprogram/          # 微信小程序前端
├── backend/              # Java Spring Boot 后端
├── admin-platform/      # 平台管理端 (Vue3)
├── admin-camp/           # 营地/俱乐部管理端 (Vue3)
└── docs/                 # 文档
```

## 快速启动

### 1. 后端

**方式 A：Node.js（无需 Java/Maven，推荐本地预览）**
```bash
cd backend-node
npm install
npm start
```

**方式 B：Java（需 JDK 17 + Maven）**
```bash
cd backend
mvn spring-boot:run
```

默认端口 8080，API 前缀 `/api`。

### 2. 平台管理端

```bash
cd admin-platform
npm install
npm run dev
```

访问 http://localhost:5173 ，默认账号：admin / admin123

### 3. 营地/俱乐部管理端

```bash
cd admin-camp
npm install
npm run dev
```

访问 http://localhost:5174
- 登录页可点击「申请入驻」提交营地/俱乐部入驻申请（无需登录）
- 营地账号 camp1 / camp123 可管理营位、体验、订单核销

### 4. 微信小程序

使用微信开发者工具打开 `miniprogram` 目录，需先配置后端 API 地址。

### 5. 阿里云部署

详见 [deploy/README.md](deploy/README.md)。一键部署：
```bash
bash deploy/deploy.sh
```

## 功能概览

| 模块 | 平台管理端 | 营地/俱乐部管理端 |
|------|-----------|-----------------|
| 营地 | 入驻审核、上/下架、编辑 | 入驻申请（公开页）、查看 |
| 俱乐部 | 入驻审核、上/下架、编辑 | 入驻申请（公开页）、查看 |
| 营位 | 审核、上/下架、新增、编辑 | 新增、上/下架、编辑 |
| 体验 | 审核、上/下架、新增、编辑 | 新增、上/下架、编辑 |
| 订单 | 查看、核销、退房 | 查看、核销、退房 |
| 管理员 | 创建营地/俱乐部账号 | - |

## 技术栈

- 小程序：原生 WXML/WXSS/JS
- 后端：Java 17 + Spring Boot 3.2 + H2 + JWT
- 管理端：Vue3 + Element Plus + Vue Router + Axios
