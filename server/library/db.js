import db from '../db'
import sql from 'sql-query'
const sqlQuery = sql.Query()

class Database {
  constructor(table) {
    this.table = table
  }
  query(q,cb){
    let query = q
    db.query(query,(err,data)=>{
      cb(err,data)
    })
  }
  select(){
    return sqlQuery.select().from(this.table)
  }
  update(){
    return sqlQuery.update().into(this.table)
  }
  delete(){
    return sqlQuery.remove().from(this.table)
  }
  insert(){
    return sqlQuery.insert().into(this.table)
  }
}

module.exports = Database
