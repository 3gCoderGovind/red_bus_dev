

const express=require('express');
const { create_payment } = require('../Payments/create_payment');
const router=express.Router();

router.post('/create',create_payment);

module.exports=router;


