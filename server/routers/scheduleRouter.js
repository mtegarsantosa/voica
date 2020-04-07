import table from '../library/db'
import express from 'express'
import jwt from '../library/jwt'
import bcrypt from 'bcryptjs'
const router = express.Router()
const db = new table("schedule")
/*
  ---
*/
router.get('/', (req,res)=>{ //get all
  // jwt.check(req.query.token, ()=>{
    let query = db.select().select("id","status","day").from("label","id","id_label").select("name","id").as("id_label").from("label_audio","id_label","id").select("id_audio","time").as("time_audio").from("audio","id","id_audio").select("file","name").as("name_audio").order("time_audio","A").build()
    db.query(query,(err,data)=>{
      if (data) {
        res.send(data)
      }
      else res.json({status:true,err:err})
    })
  // })
})
router.get('/now', (req,res)=>{
  let query = db.select().select("id","status","day").from("label","id","id_label").select("name","id").as("id_label").from("label_audio","id_label","id").select("id_audio","time").as("time_audio").from("audio","id","id_audio").select("file","name").as("name_audio").where({day:req.query.day}).order("time_audio","A").build()
  db.query(query,(err,data)=>{
    if (data) {
      res.send(data)
    }
    else res.json({status:true,err:err})
  })
})
router.post('/', (req,res)=>{
  jwt.check(req.query.token, ()=>{
    db.query(db.select().where({day:req.body.time}).build(), (err,data)=>{
      if (data.length > 0) {
        db.query(db.delete().where({day:req.body.time}).build(),(err,succ)=>{
          db.query(db.insert().set({id_label:req.body.id_label,day:req.body.time,status:req.body.status}).build(),(err,succ)=>{
            if (succ) res.json({status:true})
            else res.json({status:true,err:err})
          })
        })
      }
      else{
        db.query(db.insert().set({id_label:req.body.id_label,day:req.body.time,status:req.body.status}).build(),(err,succ)=>{
          if (succ) res.json({status:true})
          else res.json({status:true,err:err})
        })
      }
    })
    global.io.emit('REFRESH_QUEUE_GUEST')
  })
})

module.exports = router
