# ✅ Checklist Deploy Backend lên Render

## 🔧 Trước khi Deploy

- [ ] **Kiểm tra code local**
  - [ok ] Chạy `npm run build` thành công
  - [ok ] Chạy `npm start` hoạt động bình thường
  - [ ] Test API endpoints hoạt động

- [ ] **Kiểm tra dependencies**
  - [ ] `package.json` có script `build` và `start:prod`
  - [ ] `tsconfig.json` cấu hình đúng `outDir: "dist"`
  - [ ] Tất cả dependencies đã được cài đặt

- [ ] **Kiểm tra file cấu hình**
  - [ ] File `.env` có đầy đủ biến môi trường
  - [ ] Database connection string đúng
  - [ ] JWT secret được set
  - [ ] Cloudinary credentials đúng

## 🌐 Deploy lên Render

- [ ] **Tạo tài khoản Render**
  - [ ] Đăng ký tại [render.com](https://render.com)
  - [ ] Đăng nhập bằng GitHub account

- [ ] **Tạo Web Service**
  - [ ] Click "New +" → "Web Service"
  - [ ] Kết nối GitHub repository
  - [ ] Chọn repository `chat_app-back-end`

- [ ] **Cấu hình Service**
  - [ ] Name: `chat-app-backend`
  - [ ] Environment: `Node`
  - [ ] Region: Chọn gần nhất
  - [ ] Branch: `main`

- [ ] **Cấu hình Build & Deploy**
  - [ ] Build Command: `npm install && npm run build`
  - [ ] Start Command: `npm run start:prod`
  - [ ] Plan: `Free` hoặc `Starter`

- [ ] **Thêm Environment Variables**
  - [ ] `NODE_ENV` = `production`
  - [ ] `PORT` = `10000`
  - [ ] `DATABASE_URL` = Neon database URL
  - [ ] `JWT_SECRET` = JWT secret key
  - [ ] `CLOUDINARY_CLOUD_NAME` = Cloudinary cloud name
  - [ ] `CLOUDINARY_API_KEY` = Cloudinary API key
  - [ ] `CLOUDINARY_API_SECRET` = Cloudinary API secret
  - [ ] `CLIENT_URL` = Frontend URL

- [ ] **Deploy**
  - [ ] Click "Create Web Service"
  - [ ] Chờ build và deploy hoàn thành
  - [ ] Kiểm tra logs không có lỗi

## 🔍 Sau khi Deploy

- [ ] **Kiểm tra Health Check**
  - [ ] Truy cập URL Render
  - [ ] Endpoint `/` trả về `{"message": "Server đang hoạt động!"}`

- [ ] **Test API Endpoints**
  - [ ] Test endpoint `/user`
  - [ ] Test endpoint `/post`
  - [ ] Test endpoint `/message`

- [ ] **Kiểm tra Database Connection**
  - [ ] Logs hiển thị "✅ Kết nối PostgreSQL (Neon) thành công!"
  - [ ] Không có lỗi database connection

- [ ] **Kiểm tra Socket.IO**
  - [ ] Socket connection hoạt động
  - [ ] Real-time messaging hoạt động

## 📱 Cập nhật Frontend

- [ ] **Thay đổi API Base URL**
  - [ ] Cập nhật `BASE_URL` trong frontend
  - [ ] Test frontend kết nối với backend mới
  - [ ] Kiểm tra tất cả chức năng hoạt động

## 🚨 Xử lý lỗi

- [ ] **Nếu build thất bại**
  - [ ] Kiểm tra TypeScript compilation
  - [ ] Kiểm tra dependencies
  - [ ] Test build local trước

- [ ] **Nếu deploy thất bại**
  - [ ] Kiểm tra logs trong Render dashboard
  - [ ] Kiểm tra environment variables
  - [ ] Kiểm tra start command

- [ ] **Nếu API không hoạt động**
  - [ ] Kiểm tra port configuration
  - [ ] Kiểm tra CORS settings
  - [ ] Kiểm tra database connection

## 🎯 Mục tiêu cuối cùng

- [ ] Backend hoạt động tại `https://your-app.onrender.com`
- [ ] Tất cả API endpoints hoạt động bình thường
- [ ] Database connection ổn định
- [ ] Frontend kết nối thành công với backend mới
- [ ] Real-time features hoạt động

---

**Lưu ý**: Checklist này giúp bạn không bỏ sót bước nào khi deploy. Hãy đánh dấu từng bước khi hoàn thành! 