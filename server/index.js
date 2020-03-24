import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import fileUpload from 'express-fileupload'

const app = express()
const port = process.env.WEB_PORT

app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload({
  createParentPath: true
}))

fs.readdirSync(path.join(__dirname, 'routers')).forEach(file => {
  let controller = file.split('Router.js')
  app.use('/api/'+controller[0], require('./routers/'+file))
})

if (process.env.PROD === 'true') {
  app.use(express.static(__dirname+'/vue'))
  app.get(/.*/, (req,res)=>{ res.sendFile(__dirname+'/vue/index.html') })
}

app.use((err, req, res, next) => {
 res.status(500).json({
   status: false,
   name: err.name,
   message: err.message
 })
})

var server = app.listen(port, ()=>{
  console.log('server running on port '+port)
})

var io = require('socket.io')(server)
global.io = io
