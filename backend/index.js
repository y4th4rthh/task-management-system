const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const socketIo = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

connectDB();

app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);


io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('task-update', (taskData) => {
      io.emit('task-updated', taskData);  
    });
    
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
