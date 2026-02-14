#!/bin/bash
# 自动推送代码到 GitHub
# 使用代理：export HTTPS_PROXY=http://127.0.0.1:7890 && ./scripts/push-to-github.sh

cd "$(dirname "$0")/.."

# 若设置了 PROXY 环境变量，配置 git 使用代理
if [ -n "$HTTPS_PROXY" ] || [ -n "$http_proxy" ]; then
  proxy="${HTTPS_PROXY:-$http_proxy}"
  git config --global http.proxy "$proxy"
  git config --global https.proxy "$proxy"
  echo "已使用代理: $proxy"
fi

echo "正在推送到 GitHub..."
git config http.postBuffer 524288000
git push -u origin main

if [ $? -eq 0 ]; then
  echo "✅ 推送成功！"
else
  echo ""
  echo "❌ 推送失败，可能原因："
  echo "  1. 网络无法访问 GitHub（可尝试开启 VPN/代理）"
  echo "  2. 使用代理示例： export HTTPS_PROXY=http://127.0.0.1:7890"
  echo "  3. 或手动在 GitHub 网页上传：Add file → Upload files"
fi
