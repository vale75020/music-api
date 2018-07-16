import express from "express"
import "dotenv/config"
import volleyball from "volleyball"
import mongoose from "mongoose"

const app = express()
const { port, DBUrl } = process.env


mongoose.connect(DBUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connecté a MongoDB !')
});

app.use(express())
app.use(express.urlencoded({ extended: false }))
app.use(volleyball)

app.get("/", (req, res) => {
    res.send("first route!")
})

app.use((req, res, next) => {
    const error = new Error("Not found")
    error.message = "route invalide"
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.json({
        error:{
            msg: error.message
        }
    })
})
app.listen(port, () => {
  console.log("Youpi le port fonctionne!")
})