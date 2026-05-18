const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const app = express();

const connectDB = require('./config/db')

connectDB()



app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('server is running / alive')
})
app.get('/products', (req, res) => {
    res.json([
        { name: "Laptop", price: 50000 },
        { name: "Phone", price: 20000 }
    ])
})


app.listen(process.env.PORT|| 8001,()=>{
    console.log('server is running on port 8001')
})

