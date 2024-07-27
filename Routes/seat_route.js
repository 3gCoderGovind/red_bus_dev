
const express=require('express');
const { create_bus_seat } = require('../Seats/create_seats');
const router=express.Router();

router.post('/create',create_bus_seat);

module.exports=router;


