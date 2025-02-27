const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cors = require("cors")
require("dotenv").config()

//1 database Connect
mongoose.connect(process.env.MONGO_URL)
const app = express()

// 2middleware
app.use(express.json())
app.use(express.static("uploads"))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// 3userRoutes
app.use(express.static(path.join(__dirname, "dist")))
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/admin", require("./routes/admin.routes"))
app.use("/api/order", require("./routes/order.routes"))

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
    res.status(404).json({ message: "resource Not foudn" })
})


//4 Error Handeler
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message || "Something Went Wrong" })
})
// 5 Server Run 

mongoose.connection.once("open", () => {
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
    console.log("MONGO CONNECTED")
})
