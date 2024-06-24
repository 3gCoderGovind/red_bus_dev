const { v4: uuidv4 } = require('uuid');
const { mysql_connect } = require("../db_connection/mysql_connection");

const get_user=async(req,res)=>{
    try{
        const user_type=req?.body?.user_type;
        const email=req?.body?.email;
        if(!email) return res.status(404).send("Invalid Email");
        if(user_type==="bus_owner" || user_type==="admin" || user_type==="bus_user" ){
             const query=`select * from users where email='${email}'`;
             try{
                const result=await mysql_connect(query,email);  
                return res.status(200).send({"data":result});      
             }
             catch(error){
                return res.status(500).send({"error":error});
             }
        }else{
            return res.status(404).send("Invalid User Type");
        }
    }
    catch(error){
       return res.status(500).send({"server error":error})
    }
}

const create_user=async(req,res)=>{
    try{
        const user_type=req?.body?.user_type;
        const first_name=req?.body?.first_name;
        const last_name=req?.body?.last_name;
        const email=req?.body?.email;
        const password=req?.body?.password;
        const phone_number=req?.body?.phone_number;
        if(user_type=="bus_owner" || user_type=="admin" || user_type=="bus_user" ){
              const user_id='USR-'+uuidv4();
              const query = `INSERT INTO users (user_id, user_type, first_name, last_name, email, password, phone_number)
              VALUES (?, ?, ?, ?, ?, ?, ?)`;
              const values=[user_id,user_type,first_name,last_name,email,password,phone_number];
              try{
                 const result=await mysql_connect(query,values);
                 return res.status(200).send(result);
              }catch(error){
                 return res.status(500).send({"error":error});
              }       
        }else{
            return res.status(404).send("Invalid User Type");
        }
    }
    catch(error){
       return res.status(500).send({"server error":error})
    }
}

const update_user=async(req,res)=>{
    try{

    }
    catch(error){

    }
}

const delete_user=async(req,res)=>{
    try{

    }
    catch(error){

    }
}


module.exports={get_user,create_user,update_user,delete_user};