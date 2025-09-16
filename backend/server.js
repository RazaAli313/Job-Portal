const app=require('express')();

const {MONGO_URI}=require('./config/keys');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
require('dotenv').config();

const PORT=process.env.PORT || 5000;

//import routes
// const authRoutes=require('./routes/auth');


//db connection
mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("Connnected to Mongo DB successfully");
})
.catch((err)=>{
    console.log("Error connecting to Mongo DB: ",err);
});

//middlewares
app.use(cors());
app.use(bodyParser.json());

//routes middleware
// app.use('/api/auth',authRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

