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
app.use(express.json()); // Parse incoming JSON

app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);


io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Emit task update to the connected client
    socket.on('task-update', (taskData) => {
      io.emit('task-updated', taskData);  // Broadcast task update to all clients
    });
    
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
