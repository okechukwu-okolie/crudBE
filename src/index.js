import express, { response } from 'express'
import { port,mongodbURL } from './config.js'
// import cors from 'cors'
import mongoose from 'mongoose'
import { Book } from './models/bookModels.js'


const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('<h1>this is the backend get method</h1>')
})

//route for a new book
app.post('/books', async(request,response)=>{
    try{
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).end({
                message:'send all required fields: title, author, publishYear'
            })
        }
        const newBook ={
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear,
        }
        const book = await Book.create(newBook)
        return response.status(201).send(book)

    }catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})    }
})


//route for getting all books from database
app.get('/books',async(request,response)=>{
 try{
    const books = await Book.find({})
    return response.status(200).json({
        count:books.length,
        data:books
    })
 }catch(error){
    console.log(error.message)
    response.status(500).send({message:error.message})
 }
})

//getting one book from the database using the id
app.get('/books/:id',async(request,response)=>{
 try{

    const {id} = request.params
    const books = await Book.findById(id)
    return response.status(200).json({
        count:books.length,
        data:books
    })
 }catch(error){
    console.log(error.message)
    response.status(500).send({message:error.message})
 }
})

//route to update a book.UPDATING A BOOK.
app.put('/books/:id',async(request,response)=>{
    try {
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message:'send all required fields: title,author, publishYear'
            })
        }

        const {id} = request.params
        const result = await Book.findByIdAndUpdate(id,request.body)

        if (!result){
            return response.status(404).json({message:'Book not found'})

        }
        return response.status(200).send({message:'book updated successfully'})
        
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})



//DELETING A BOOK
app.delete('/book/:id',async(request,response)=>{
    try {
        const result = await Book.findByIdAndDelete(id)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
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








