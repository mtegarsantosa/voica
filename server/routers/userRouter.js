import table from '../library/db'
import express from 'express'
import jwt from '../library/jwt'
import bcrypt from 'bcryptjs'
const router = express.Router()
const db = new table("user")
/*
  ---
*/
router.get('/', (req,res)=>{ //get all
  jwt.check(req.query.token, ()=>{
    db.query(db.select().build(),(err,data)=>{
      res.send(data)
    })
  })
})
router.get('/checkTimezone', (req,res)=>{
  jwt.check(req.query.token, ()=>{
    let dataToken = jwt.verify(req.query.token)
    db.query(db.select().select("timezone").where({username:dataToken.username}).build(),(err,data)=>{
      if (data) res.json({status:true,timezone:data[0].timezone})
      else res.json({status:false})
    })
  })
})
router.put('/changeTimezone', (req,res)=>{
  jwt.check(req.query.token, ()=>{
    let dataToken = jwt.verify(req.query.token)
    db.query(db.select().select("timezone").where({username:dataToken.username}).build(),(err,data)=>{
      db.query(db.update().set({timezone:req.body.timezone}).build(), (err,succ)=>{
        if (succ) res.json({status:true})
        else res.json({status:false})
      })
    })
  })
})
router.post("/changeUsername", (req,res)=>{
  jwt.check(req.query.token, ()=>{
    let dataToken = jwt.verify(req.query.token)
    db.query(db.update().set({username:req.body.username}).where({username:dataToken.username}).build(),(err,succ)=>{
      if (succ) res.json({status:true})
      else res.json({status:false})
    })
  })
})
router.post("/changePassword", (req,res)=>{
  jwt.check(req.query.token, ()=>{
    let dataToken = jwt.verify(req.query.token)
    db.query(db.select().select("password").where({username:dataToken.username}).build(), (err,data)=>{
      let passwordOri = data[0].password
      if (bcrypt.compareSync(req.body.oldPassword,passwordOri)) {
        if (req.body.newPassword === req.body.confirmPassword) {
          let newPass = bcrypt.hashSync(req.body.newPassword)
          db.query(db.update().set({password:newPass}).build(), (err,succ)=>{
            if (succ) res.json({status:true})
            else res.json({status:false,type:"server"})
          })
        }
        else res.json({status:false,type:"passNotSame"})
      }
      else res.json({status:false,type:"wrongPass"})
    })
  })
})
router.post('/login', (req,res)=>{
  let username = req.body.username
  let password = req.body.password
  db.query(db.select().where({username:username}).build(), (err,data)=>{
    if (data.length > 0) {
      let passOri = data[0].password
      if (bcrypt.compareSync(password,passOri)) {
        let token = jwt.sign({username:username})
        res.json({status:true,token:token})
      }
      else res.json({status:false,type:"wrongPass"})
    }
    else res.json({status:false,type:"usernameNotExists"})
  })
})

module.exports = router
