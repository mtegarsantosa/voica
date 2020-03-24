import table from '../library/db'
import express from 'express'
import jwt from '../library/jwt'
import bcrypt from 'bcryptjs'
const router = express.Router()
const db = new table("audio")
/*
  ---
*/
var uploadDir = process.env.PROD === "true" ? 'vue/audio' : '../client/public/audio'
router.get('/', (req,res)=>{ //get all
  jwt.check(req.query.token, ()=>{
    var order = req.query.order?req.query.order:"id"
    var c = req.query.c?req.query.c:"Z"
    db.query(db.select().order(order,c).build(), (err,data)=>{
      res.send(data)
    })
  })
})
router.post('/', (req,res)=>{
  jwt.check(req.query.token, ()=>{
    let audio = req.files.audio
    let audioName = new Date().getTime()+'_'+audio.name
    audio.mv(uploadDir+"/"+audioName)
    db.query(db.insert().set({file:audioName,name:req.body.name}).build(), (err,data)=>{
      if (err) res.json({status:false,err:err})
      else res.json({status:true})
    })
  })
})
router.put('/:id',(req,res)=>{
  jwt.check(req.query.token, ()=>{
    let audio="", audioName="", setPayload={}
    if (req.files) {
      audio = req.files.audio
      audioName = new Date().getTime()+'_'+audio.name
      audio.mv(uploadDir+"/"+audioName)
      setPayload["file"] = audioName
    }
    let name = req.body.name
    setPayload["name"] = name
    db.query(db.update().set(setPayload).where({id:req.params.id}).build(), (err,succ)=>{
      if (succ) res.json({status:true})
      else res.json({status:false})
    })
  })
})
router.delete('/:id', (req,res)=>{
  jwt.check(req.query.token, ()=>{
    db.query(db.delete().where({id:req.params.id}).build(), (err,succ)=>{
      if (succ) res.json({status:true})
      else res.json({status:false})
    })
  })
})

module.exports = router
