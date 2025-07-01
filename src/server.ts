import express from 'express';
import cors from 'cors';
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

const app = express();

// Cấu hình CORS cho phép tất cả origins và headers
app.use(cors());

app.use(express.json());

const port = 3000;


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

app.listen(port, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});


