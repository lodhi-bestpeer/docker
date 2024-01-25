const express = require("express")
const {connection} = require("./dbConfig/dbConnection")
const userRouter = require("./routes/index")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/v1",userRouter)


app.listen(8080,()=>{
    connection()
    console.log("server is running at 8080")
})