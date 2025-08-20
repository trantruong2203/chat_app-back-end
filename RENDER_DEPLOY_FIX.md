# 🚨 Khắc phục lỗi Deploy Render

## ❌ **Lỗi thường gặp:**

### Lỗi Type Definitions
```
Could not find a declaration file for module 'express'
Could not find a declaration file for module 'jsonwebtoken'
Could not find a declaration file for module 'cookie-parser'
```

## 🔧 **Nguyên nhân:**
- Các type definitions (`@types/*`) đang ở trong `devDependencies`
- Render chỉ cài đặt `dependencies` khi deploy
- TypeScript không thể tìm thấy type definitions

## ✅ **Giải pháp đã áp dụng:**

### 1. Di chuyển type definitions vào dependencies
```json
"dependencies": {
  "@types/express": "^4.17.21",
  "@types/jsonwebtoken": "^9.0.10",
  "@types/cookie-parser": "^1.4.9",
  "@types/cors": "^2.8.17",
  "@types/multer": "^2.0.0",
  "@types/node": "^24.0.4",
  "@types/pg": "^8.15.5",
  // ... các dependencies khác
}
```

### 2. Sử dụng npm ci thay vì npm install
```yaml
buildCommand: npm ci && npm run build
```

### 3. Đảm bảo tất cả dependencies cần thiết được cài đặt

## 🚀 **Deploy lại:**

1. **Commit và push thay đổi:**
   ```bash
   git add .
   git commit -m "🔧 Fix: Move type definitions to dependencies for Render deploy"
   git push origin main
   ```

2. **Render sẽ tự động deploy lại**

3. **Kiểm tra logs** để đảm bảo build thành công

## 📋 **Kiểm tra sau khi deploy:**

- [ ] Build thành công không có lỗi TypeScript
- [ ] Server khởi động được
- [ ] Database connection thành công
- [ ] API endpoints hoạt động

## 🎯 **Kết quả mong đợi:**
- ✅ TypeScript compilation thành công
- ✅ Tất cả type definitions được resolve
- ✅ Server deploy thành công trên Render
- ✅ API hoạt động bình thường

---

**Lưu ý:** Nếu vẫn gặp lỗi, kiểm tra:
1. Tất cả type definitions đã được di chuyển vào dependencies
2. Sử dụng `npm ci` thay vì `npm install`
3. Render logs để xem lỗi chi tiết 