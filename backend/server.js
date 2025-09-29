const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
});

const {MONGO_URI}=require('./config/keys');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
require('dotenv').config();

const PORT=process.env.PORT || 5000;

//import routes
const authRoutes = require('./routes/api/auth');
const jobRoutes = require('./routes/api/jobs');
const companyRoutes = require('./routes/api/companies');
const applicationRoutes = require('./routes/api/applications');
const userRoutes = require('./routes/api/users');


//db connection
mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("Connnected to Mongo DB successfully");
})
.catch((err)=>{
    console.log("Error connecting to Mongo DB: ",err);
});

//middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(bodyParser.json());


//routes middleware
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/users', userRoutes);
const chatRoutes = require('./routes/api/chat');
app.use('/api/chat', chatRoutes);


// Socket.IO logic for real-time chat
io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('joinChat', (chatId) => {
        socket.join(chatId);
    });

    socket.on('sendMessage', ({ chatId, message }) => {
        io.to(chatId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

