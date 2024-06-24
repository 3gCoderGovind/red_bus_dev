const express=require('express');
const router=express.Router();
const {create_users}=require('../TablesCollection/create_table_api');

router.get('/create',create_users);


module.exports=router;