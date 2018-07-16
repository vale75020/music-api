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


app.listen(port, () => {
  console.log("Youpi le port fonctionne!")
})