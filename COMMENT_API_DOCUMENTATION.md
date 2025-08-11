# Comment API Documentation

## Overview
Hệ thống Comment API cho phép người dùng tạo, đọc, cập nhật và xóa comments trên các posts. Hệ thống hỗ trợ nested comments (replies) và kiểm soát quyền truy cập.

## Base URL
```
http://localhost:3000/comment
```

## Endpoints

### 1. Get All Comments
**GET** `/`

Lấy tất cả comments trong hệ thống (bao gồm thông tin user).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "userid": 1,
      "postid": 1,
      "content": "Đây là comment đầu tiên",
      "iconid": null,
      "imageurl": null,
      "commentid": null,
      "createdat": "2024-01-01T10:00:00.000Z",
      "username": "john_doe",
      "avatar": "https://example.com/avatar.jpg"
    }
  ]
}
```

### 2. Get Comment by ID
**GET** `/:id`

Lấy thông tin chi tiết của một comment theo ID.

**Parameters:**
- `id` (number): ID của comment

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "userid": 1,
    "postid": 1,
    "content": "Đây là comment đầu tiên",
    "iconid": null,
    "imageurl": null,
    "commentid": null,
    "createdat": "2024-01-01T10:00:00.000Z",
    "username": "john_doe",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

### 3. Get Comments by Post ID
**GET** `/post/:postId`

Lấy tất cả comments của một post cụ thể.

**Parameters:**
- `postId` (number): ID của post

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "userid": 1,
      "postid": 1,
      "content": "Comment đầu tiên",
      "iconid": null,
      "imageurl": null,
      "commentid": null,
      "createdat": "2024-01-01T10:00:00.000Z",
      "username": "john_doe",
      "avatar": "https://example.com/avatar.jpg"
    }
  ]
}
```

### 4. Get Comment Replies
**GET** `/:commentId/replies`

Lấy tất cả replies của một comment cụ thể.

**Parameters:**
- `commentId` (number): ID của comment gốc

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "userid": 2,
      "postid": 1,
      "content": "Đây là reply cho comment đầu tiên",
      "iconid": null,
      "imageurl": null,
      "commentid": 1,
      "createdat": "2024-01-01T10:30:00.000Z",
      "username": "jane_doe",
      "avatar": "https://example.com/avatar2.jpg"
    }
  ]
}
```

### 5. Get Comment Count for Post
**GET** `/post/:postId/count`

Lấy số lượng comments của một post.

**Parameters:**
- `postId` (number): ID của post

**Response:**
```json
{
  "success": true,
  "data": {
    "count": 5
  }
}
```

### 6. Create Comment
**POST** `/`

Tạo comment mới hoặc reply cho comment khác.

**Request Body:**
```json
{
  "userid": 1,
  "postid": 1,
  "content": "Nội dung comment",
  "iconid": 1,           // Optional
  "imageurl": "https://example.com/image.jpg", // Optional
  "commentid": 2         // Optional - ID của comment gốc nếu đây là reply
}
```

**Response:**
```json
{
  "success": true,
  "message": "Comment được tạo thành công",
  "data": {
    "insertId": 3,
    "affectedRows": 1
  }
}
```

### 7. Update Comment
**PUT** `/:id`

Cập nhật comment (chỉ người tạo comment mới có quyền).

**Parameters:**
- `id` (number): ID của comment

**Request Body:**
```json
{
  "userid": 1,
  "content": "Nội dung comment đã được cập nhật", // Optional
  "iconid": 2,           // Optional
  "imageurl": "https://example.com/new-image.jpg" // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Comment được cập nhật thành công",
  "data": {
    "affectedRows": 1
  }
}
```

### 8. Delete Comment
**DELETE** `/:id`

Xóa comment (chỉ người tạo comment hoặc chủ post mới có quyền).

**Parameters:**
- `id` (number): ID của comment

**Request Body:**
```json
{
  "userid": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Comment đã được xóa thành công",
  "data": {
    "affectedRows": 1
  }
}
```

## Error Responses

### Validation Errors (400)
```json
{
  "success": false,
  "message": "userid là bắt buộc"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Comment không tồn tại"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Error creating comment: Database connection failed"
}
```

## Business Rules

### Comment Creation
- `userid`, `postid`, và `content` là bắt buộc
- `content` không được để trống và tối đa 1000 ký tự
- `commentid` được sử dụng để tạo reply cho comment khác

### Comment Update
- Chỉ người tạo comment mới có quyền cập nhật
- Có thể cập nhật `content`, `iconid`, và `imageurl`
- Phải có ít nhất một field để cập nhật

### Comment Delete
- Người tạo comment có quyền xóa comment của mình
- Chủ post có quyền xóa bất kỳ comment nào trong post của mình
- Khi xóa comment, tất cả replies của comment đó cũng sẽ bị xóa

### Data Relationships
- Comment thuộc về một User (userid)
- Comment thuộc về một Post (postid)
- Comment có thể có replies (commentid)
- Comment có thể có icon reaction (iconid)
- Comment có thể có hình ảnh đính kèm (imageurl)

## Database Schema
```sql
CREATE TABLE comment (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userid INT NOT NULL,
  postid INT NOT NULL,
  content TEXT NOT NULL,
  iconid INT NULL,
  imageurl VARCHAR(255) NULL,
  commentid INT NULL,
  createdat DATETIME NOT NULL,
  FOREIGN KEY (userid) REFERENCES user(id),
  FOREIGN KEY (postid) REFERENCES post(id),
  FOREIGN KEY (commentid) REFERENCES comment(id),
  FOREIGN KEY (iconid) REFERENCES icon(id)
);
```

## Usage Examples

### Tạo comment cho post
```javascript
const response = await fetch('http://localhost:3000/comment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userid: 1,
    postid: 1,
    content: 'Đây là comment của tôi!'
  })
});
```

### Tạo reply cho comment
```javascript
const response = await fetch('http://localhost:3000/comment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userid: 2,
    postid: 1,
    content: 'Đây là reply cho comment trên',
    commentid: 1  // ID của comment gốc
  })
});
```

### Lấy comments của post
```javascript
const response = await fetch('http://localhost:3000/comment/post/1');
const data = await response.json();
```

### Xóa comment
```javascript
const response = await fetch('http://localhost:3000/comment/1', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userid: 1
  })
});
``` 