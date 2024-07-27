// create user
// update user
// delete user
// find user
const express=require('express');
const { create_user,update_user,delete_user } = require('../Users/users_api')
const router=express.Router();

router.post('/create',create_user);
router.post('/update',update_user);
router.post('/delete',delete_user);

module.exports=router;


