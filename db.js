let mysql = require('mysql');
let pool = null;
try {
  pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'mobiledatabase.cufmhpovf1th.us-east-1.rds.amazonaws.com',
    user            : 'admin',
    password        : 'mobiledataproject',
    database        : 'mobile'

  });
  
} catch (error) {
  console.error('Mysql pool create failed');
  console.error(error);
}


const api = {
  query: (query, ...parameters) =>
  {
    let promise = new Promise(function(resolve, reject) {
      pool.query(query, ...parameters, (error, results, fields) => {
        if(error) {
          reject(error)
        };
    
        resolve(results);
      })
    });
  
    return promise;  
  },
  closeAll: () => {
    pool.end();
  }
};

module.exports = api;

