import express from 'express'

const app =  express()
const port = 3000

app.get('/',(req,response)=>{
    response.send(`<h1>this is the backend</h1>`)
})

app.listen(port, ()=>{
    console.log('server running at this port:',port)
})