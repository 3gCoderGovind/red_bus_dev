
const { mysql_connect } = require("../db_connection/mysql_connection");
const { v4: uuidv4 } = require('uuid');

const create_payment=async (req,res)=>{
   try{
        const transaction_id=req?.body?.transaction_id;
        const user_id=req?.body?.user_id;
        const amount=req?.body?.amount;
        const payment_method=req?.body?.payment_method;
        const status=req?.body?.status;
        const currency=req?.body?.currency;
        const description=req?.body?.description;
        const payment_date=new Date();
        const payment_id='PAY-'+uuidv4();

        const payment_query=`insert into payments(payment_id,transaction_id,user_id,amount,payment_date,payment_method,status,currency,description)
                             value(?,?,?,?,?,?,?,?,?)`;
        const payment_query_values=[payment_id,transaction_id,user_id,amount,payment_date,payment_method,status,currency,description];

        const result=await mysql_connect(payment_query,payment_query_values);
        return res.status(200).send(result);
    
   }catch(error){
       return res.status(500).send({"error":error});
   }
}


module.exports={create_payment};

// CREATE TABLE IF NOT EXISTS payments (
//     payment_id VARCHAR(50) PRIMARY KEY,
//     transaction_id VARCHAR(100) NOT NULL,
//     user_id VARCHAR(50) NOT NULL,
//     amount DECIMAL(10,2) NOT NULL,
//     payment_date DATETIME NOT NULL,
//     payment_method VARCHAR(50) NOT NULL,
//     status ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
//     currency VARCHAR(10) NOT NULL,
//     description TEXT,
//     FOREIGN KEY (user_id) REFERENCES users(user_id)
// )