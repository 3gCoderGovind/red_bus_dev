// create reservation
// get reservation
// update reservation

const express=require('express');
const { create_reservation } = require('../Reservations/create_reservation');
const router=express.Router();

router.post('/create',create_reservation);

module.exports=router;


