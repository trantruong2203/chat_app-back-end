#!/bin/bash

echo "🚀 Bắt đầu deploy backend lên Render..."

# Kiểm tra xem có đang ở branch main không
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "⚠️  Bạn đang ở branch: $current_branch"
    echo "🔀 Chuyển sang branch main..."
    git checkout main
fi

# Pull code mới nhất
echo "📥 Pull code mới nhất từ remote..."
git pull origin main

# Build project
echo "🔨 Building project..."
npm run build

# Kiểm tra build có thành công không
if [ $? -eq 0 ]; then
    echo "✅ Build thành công!"
    
    # Commit và push
    echo "📝 Commit thay đổi..."
    git add .
    git commit -m "🚀 Deploy to Render - $(date)"
    
    echo "📤 Push lên GitHub..."
    git push origin main
    
    echo "🎉 Deploy hoàn tất! Render sẽ tự động build và deploy."
    echo "⏳ Chờ khoảng 5-10 phút để hoàn thành."
    echo "🔗 Kiểm tra tại: https://dashboard.render.com"
else
    echo "❌ Build thất bại! Kiểm tra lỗi và thử lại."
    exit 1
fi 