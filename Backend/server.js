const express=require("express");
const mysql2=require("mysql2");
const cors=require("cors");



const app=require("./src/app.js");
// middleware
app.use(cors());
app.use(express.json());

// connection Pool
const db=mysql2.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"book store",
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});

// Test route
app.get("/",(req,res,)=>{
    res.send("Api is running")
});

// Get books
app.get("/books",(req,res)=>{
    db.query("SELECT * from books",(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:"Database error"});
        }
        res .json(result);
    });
});

//Get Slideshow
app.get("/slideshow",(req,res)=>{
    db.query("SELECT * from slideshow",(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:"Database error"});
        }
        res.json(result);
    });
});

//book details page
app.get("/books/:id",(req,res)=>{
    const id=req.params.id;

    const sql=`SELECT b.*,bi.image
    FROM books b
    JOIN book_images bi ON b.id=bi.book_id
    WHERE b.id=?;`

    db.query(sql,[id],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:"Database error"});
        }
        res.json(result);
    });
});

// Start server
app.listen(3000,()=>{
    console.log("Server runnning")
});

