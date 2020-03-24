import mysql from 'mysql'
const db = mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASS,
  database:process.env.DB_NAME
})
db.connect((err)=>{
  if (!err) console.log('database connected')
  else console.log(err)
})

module.exports = db
