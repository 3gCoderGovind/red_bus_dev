const express=require('express');
const cors=require('cors');

const app=express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());


app.use('/bus',require("./Routes/buses_route"));
app.use('/user',require("./Routes/users_route"));
app.use('/',require("./Routes/table_route"));
app.use('/reservation',require("./Routes/reservations_route"));
app.use('/seat',require("./Routes/seat_route"));
app.use('/payment',require("./Routes/payment_route"));

const port=3000;

app.listen(port,()=>{
    console.log(`server is listen on ${port}`);
})

