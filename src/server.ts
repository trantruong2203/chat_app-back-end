import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import iconRouter from './routers/Icon.router';
import userRouter from './routers/User.router';
import friendShipRouter from './routers/FriendShip.router';
import messageRouter from './routers/Message.router';
import messageImgRouter from './routers/MessageImg.router';
import chatGroupRouter from './routers/ChatGroup.router';
import roleRouter from './routers/Role.router';
import groupMemberRouter from './routers/GroupMember.router';
import commentRouter from './routers/Comment.router';
import postRouter from './routers/Post.router';
import favoritePostRouter from './routers/FavoritePost.router';
import postImageRouter from './routers/PostImage.router';
import cookieParser from 'cookie-parser';
import type { MessageSocket, User } from './types/interface';
import { getAllMessages } from './models/Message.model';
import { getUserByAccount } from './services/User.service';
import 'dotenv/config';

const app = express();
const server = createServer(app);
const port = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL,
  'https://chatapp-two-rust.vercel.app'
].filter(Boolean) as string[];

// Tạo Socket.IO server
export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  },
});

// 🧠 Lưu trữ danh sách user đang online
const onlineUsers = new Map<string, { userId: string; user: User; socketId: string }>();

// Bắt buộc để parse JSON body từ request
app.use(express.json());

// 🧠 Cấu hình CORS cho phép gửi cookie
app.use(cors({
  origin: allowedOrigins, // frontend domain
  credentials: true
}));

// 🧠 Cho phép đọc cookie từ request
app.use(cookieParser());

app.use('/icon', iconRouter);
app.use('/user', userRouter);
app.use('/friendship', friendShipRouter);
app.use('/message', messageRouter);
app.use('/messageimg', messageImgRouter);
app.use('/chatgroup', chatGroupRouter);
app.use('/role', roleRouter);
app.use('/groupmember', groupMemberRouter);
app.use('/comment', commentRouter);
app.use('/post', postRouter);
app.use('/favoritepost', favoritePostRouter);
app.use('/postimage', postImageRouter);

// Route test để kiểm tra server
app.get('/', (req: any, res: any) => {
  res.json({ message: 'Server đang hoạt động!' });
});


// Socket.IO connection handling
io.on("connection", async (socket: Socket) => {
  socket.on("login", async (email: string) => {
    try {
      const userResult = await getUserByAccount(email) as any;
      if (userResult && userResult.length > 0) {
        const user = userResult[0] as User;

        onlineUsers.set(user.id!.toString(), {
          userId: user.id!.toString(),
          user: user,
          socketId: socket.id
        });

        socket.data.userId = user.id!.toString();

        io.emit("userOnline", { userId: user.id!.toString(), user: user });

        const onlineUsersList = Array.from(onlineUsers.values()).map(({ userId, user }) => ({
          userId,
          user
        }));
        socket.emit("onlineUsers", onlineUsersList);
      } else {
        socket.emit("login", null);
      }
    } catch (error) {
      socket.emit("login", null);
    }
  });

  // 🧠 Xử lý user logout
  socket.on("logout", () => {
    const userId = socket.data.userId;
    if (userId && onlineUsers.has(userId)) {
      const userData = onlineUsers.get(userId);
      onlineUsers.delete(userId);

      // Thông báo cho tất cả client biết user này đã offline
      io.emit("userOffline", { userId: userId });
    }
  });

  try {
    const messages = await getAllMessages();
    socket.emit("loadMessages", messages);
  } catch (error) {
    socket.emit("loadMessages", []);
  }

  socket.on("sendMessage", (messageData: MessageSocket) => {

    io.emit("receiveMessage", {
      content: messageData.content,
      sender: messageData.senderid,
      senderid: messageData.senderid,
      receiverid: messageData.receiverid,
      createdAt: new Date(),
      groupid: messageData.groupid,
      status: messageData.status,

    });

  });

  socket.on("disconnect", () => {
    const userId = socket.data.userId;
    if (userId && onlineUsers.has(userId)) {
      onlineUsers.delete(userId);

      // Thông báo cho tất cả client biết user này đã offline
      io.emit("userOffline", { userId: userId });
    }
  });
});

// Sử dụng server.listen thay vì app.listen để hỗ trợ cả HTTP và Socket.IO
server.listen(port, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
  console.log(`🔌 Socket.IO server đã sẵn sàng!`);
});

export default app;


