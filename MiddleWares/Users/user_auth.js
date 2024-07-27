const { mysql_connect } = require("../db_connection/mysql_connection");

const get_user_by_email=async(req,res)=>{
    try{
        const email=req?.body?.email;
        if(!email) return res.status(404).send("Invalid Email");
        // check valid email
        const query=`select * from users where email='${email}'`;
        const result=await mysql_connect(query,email);  
        return res.status(200).send({"data":result});      
    }
    catch(error){
       return res.status(500).send({"server error":error})
    }
}