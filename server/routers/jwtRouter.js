import db from '../db'
import express from 'express'
const router = express.Router()
import jwt from '../library/jwt'

/*
  ---
*/
router.get('/verify', (req,res)=>{
  let v = jwt.verify(req.query.token)
  res.send(v)
})

module.exports = router
