const express=require("express");





const app=require("./src/app");

// middleware

app.use(express.json());





// Start server
app.listen(3000,()=>{
    console.log("Server runnning")
});

