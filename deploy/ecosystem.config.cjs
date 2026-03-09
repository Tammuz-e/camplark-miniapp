// PM2 进程管理配置 - 嘢营CAMPLARK 后端
// 在项目根目录执行: pm2 start deploy/ecosystem.config.cjs

const path = require('path')

module.exports = {
  apps: [
    {
      name: 'camplark-api',
      cwd: path.join(__dirname, '../backend-node'),
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
      },
      error_file: path.join(__dirname, '../logs/api-err.log'),
      out_file: path.join(__dirname, '../logs/api-out.log'),
      merge_logs: true,
    },
  ],
};
