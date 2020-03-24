import jwt from 'jsonwebtoken'
import table from './db'
const db = new table("user")

export default {
  sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP
    })
  },
  verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
  },
  check(token, cb){
    let check = this.verify(token)
    if (check.username) {
      let username = check.username
      db.query(db.select().where({username:username}).build(), (err,data)=>{
        if (data) cb()
      })
    }
  }
}
