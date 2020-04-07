import table from '../library/db'
import express from 'express'
import jwt from '../library/jwt'
import bcrypt from 'bcryptjs'
const router = express.Router()
const db = new table("label")
/*
  ---
*/
router.get('/', (req,res)=>{ //get all
  jwt.check(req.query.token, ()=>{
    var order = req.query.order ? req.query.order : "id"
    var c = req.query.c ? req.query.c : "Z"
    db.query(db.select().order(order,c).build(),(err,data)=>{
      res.send(data)
    })
  })
})
router.delete('/:id', (req,res)=>{
  jwt.check(req.query.token, ()=>{
    db.query(db.delete().where({id:req.params.id}).build(),(err,succ)=>{
      if (succ) res.json({status:true})
      else res.json({status:false,err:err})
    })
    global.io.emit('REFRESH_QUEUE_GUEST')
  })
})
router.get('/:id', (req,res)=>{ //get all
  jwt.check(req.query.token, ()=>{
    db.query(db.select().where({id:req.params.id}).build(),(err,data)=>{
      res.send(data[0])
    })
  })
})
router.post('/', (req,res)=>{
  jwt.check(req.query.token, ()=>{
    db.query(db.insert().set({name:req.body.name}).build(), (err,data)=>{
      if (err) res.json({status:false,err:err})
      else res.json({status:true})
    })
    global.io.emit('REFRESH_QUEUE_GUEST')
  })
})
router.put('/:id', (req,res)=>{
  jwt.check(req.query.token, ()=>{
    db.query(db.update().set({name:req.body.name}).where({id:req.params.id}).build(), (err,data)=>{
      if (err) res.json({status:false,err:err})
      else res.json({status:true})
    })
    global.io.emit('REFRESH_QUEUE_GUEST')
  })
})

module.exports = router
