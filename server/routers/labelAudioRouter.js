import table from '../library/db'
import express from 'express'
import jwt from '../library/jwt'
import bcrypt from 'bcryptjs'
const router = express.Router()
const db = new table("label_audio")
/*
  ---
*/
router.get('/:id_label', (req,res)=>{
  jwt.check(req.query.token, ()=>{
    let query = db.select().select("id","time").from('audio', 'id', 'id_audio').select("file","name").where({id_label:req.params.id_label}).order("time","A").build();
    db.query(query,(err,data)=>{
      if (data) res.send(data)
      else res.json({status:false,err:err})
    })
  })
})
router.get('/', (req,res)=>{
  jwt.check(req.query.token, ()=>{
    let query = db.select().select("id","time").from('audio', 'id', 'id_audio').select("file","name").build();
    db.query(query,(err,data)=>{
      if (data) res.send(data)
      else res.json({status:false,err:err})
    })
  })
})
router.delete('/:id', (req,res)=>{
  jwt.check(req.query.token, ()=>{
    db.query(db.delete().where({id:req.params.id}).build(),(err,succ)=>{
      if (succ) res.json({status:true})
      else res.json({status:false,err:err})
    })
  })
})
router.post('/', (req,res)=>{
  jwt.check(req.query.token, ()=>{
    db.query(db.insert().set({id_label:req.body.id_label,id_audio:req.body.id_audio,time:req.body.time}).build(),(err,succ)=>{
      if (succ) res.json({status:true})
      else res.json({status:false,err:err})
    })
  })
})

module.exports = router
