# Hướng dẫn sử dụng hệ thống User Online

## Tổng quan
Hệ thống user online đã được cải thiện để theo dõi chính xác trạng thái online/offline của users trong real-time.

## Các tính năng mới

### 1. Lưu trữ user online
- Sử dụng `Map` để lưu trữ danh sách user đang online
- Mỗi user được lưu với thông tin: `userId`, `user object`, `socketId`

### 2. Events Socket.IO

#### Client → Server
- `login` (email: string): Đăng nhập user và thêm vào danh sách online
- `logout`: Đăng xuất user và xóa khỏi danh sách online

#### Server → Client
- `userOnline` (data: {userId: string, user: User}): Thông báo user mới online
- `userOffline` (data: {userId: string}): Thông báo user đã offline
- `onlineUsers` (data: Array<{userId: string, user: User}>): Danh sách tất cả user online

### 3. API Endpoint
- `GET /online-users`: Lấy danh sách user đang online

## Cách sử dụng ở Frontend

### Kết nối Socket.IO
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// Đăng nhập user
socket.emit('login', 'user@example.com');

// Lắng nghe sự kiện user online
socket.on('userOnline', (data) => {
  console.log('User online:', data.user);
  // Cập nhật UI hiển thị user online
});

// Lắng nghe sự kiện user offline
socket.on('userOffline', (data) => {
  console.log('User offline:', data.userId);
  // Cập nhật UI ẩn user offline
});

// Nhận danh sách user online
socket.on('onlineUsers', (users) => {
  console.log('Danh sách user online:', users);
  // Hiển thị danh sách user online
});

// Đăng xuất
socket.emit('logout');
```

### Lấy danh sách user online qua HTTP API
```javascript
fetch('http://localhost:3000/online-users')
  .then(response => response.json())
  .then(data => {
    console.log('User online:', data.onlineUsers);
  });
```

## Lưu ý quan trọng

1. **User ID**: Sử dụng `user.id` làm key chính để quản lý user online
2. **Socket ID**: Mỗi socket connection có ID riêng để tracking
3. **Real-time updates**: Tất cả client sẽ nhận được thông báo khi có user online/offline
4. **Automatic cleanup**: User sẽ tự động bị xóa khỏi danh sách online khi disconnect

## So sánh với phiên bản cũ

### Phiên bản cũ (không hoàn chỉnh):
- Chỉ emit user về client
- Không lưu trữ thông tin user online
- Không theo dõi disconnect
- Không có API để lấy danh sách user online

### Phiên bản mới (hoàn chỉnh):
- Lưu trữ user trong Map
- Theo dõi real-time online/offline status
- Có API endpoint để lấy danh sách
- Tự động cleanup khi disconnect
- Broadcast events cho tất cả client 