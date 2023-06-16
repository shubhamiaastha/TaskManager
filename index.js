const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const categoryRouter = require('./routes/categoryRoutes')


const app = express();
app.use(bodyParser.json()); 
const PORT = 5000;
app.use(express.json());


app.use((req,res,next)=>{
    console.log("HTTP Method - " + req.method + "URL - " + req.url )
    next();
})


app.use('/users',userRouter)
app.use('/task', taskRouter)
app.use('/category',categoryRouter);


app.get('/',(req,res)=>{
    res.send('Hello shubham')

    
})

// ...............................................................................................

const multer  = require('multer')

const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"upload")
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+"-"+Date.now()+".jpg");
        }
    })
}).single("user_file")



app.post('/upload',upload,(req,res)=>{
    res.send("I am upload ")

})



// ...................................................................................................

const Server = '127.0.0.1:27017'
const db = 'TaskManagment'





// mongoose.connect('mongodb+srv://root:root@restfullapi.tkvtlvx.mongodb.net/?retryWrites=true&w=majority')
mongoose.connect(`mongodb://${Server}/${db}`)
.then(()=>{


    app.listen(PORT,()=>{
        console.log('Server is Started.......')
       
    })

}).catch((err)=>{
    console.log(err);
})


