import express, { response } from 'express'
import { port,mongodbURL } from './config.js'
import cors from 'cors' 
import mongoose from 'mongoose'
import { Book } from './models/bookModels.js'
import bookRoute from './routes/booksRoute.js'


const app = express()

//middlewares
app.use(express.json())
app.use('/books',bookRoute)
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type'],
}))



app.get('/',(req,res)=>{
    res.send('<h1>this is the backend get method</h1>')
})



mongoose.connect(mongodbURL)
        .then(()=>{
            console.log('mongobd is runnng......')
            app.listen(port,()=>{
            console.log(`the server is running at port:${port}`)
        }) 
        })
        .catch((error)=>{
            console.log(error)
        })








