// create bus
// update bus
//  find bus
// delete bus

const express=require('express');
const { get_bus_by_route,create_bus,update_bus,delete_bus } = require('../Api/bus_api')
const router=express.Router();

router.post('/get',get_bus_by_route);
router.post('/create',create_bus);
router.post('/update',update_bus);
router.post('/delete',delete_bus);

module.exports=router;


