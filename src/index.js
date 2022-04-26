const express=require('express');
const app = express ();
const reportersRouter = require('./routes/Reporters')
const reportsRouter = require('./routes/Reports')
const PORT = process.env.PORT || 3000;
require('./db/mongoose');

app.use(express.json())


app.use(reportersRouter)
app.use(reportsRouter)


app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})