const express=require("express");
const cors=require("cors");
const app=express()
const mysql2=require("mysql2");


const db=require("./db/db");

app.use(cors());

// Get books
app.get("/books",(req,res)=>{
    db.query("SELECT * from books",(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:"Database error"});
        }
        res.json(result);
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
    const sql=`SELECT b.*,bi.detail_image
    FROM books b
    LEFT JOIN book_images bi ON b.id=bi.book_id
    WHERE b.id=?;`

    db.query(sql,[id],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:"Database error"});
        }
        res.json(result);
    });
});

module.exports=app;