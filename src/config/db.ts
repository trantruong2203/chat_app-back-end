import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Chantroimoi123',
    database: process.env.DB_NAME || 'chat_app'
  });
  
  connection.connect((err: any) => {
    if (err) throw err;
    console.log('✅ Kết nối database thành công!');
  });
  
  export const db = connection.promise();