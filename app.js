const express = require('express')
const path= require('path')
const app = express();
var mysql = require('mysql');
app.use(express.urlencoded())

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Khan786786@",
  database:"nodejslibrary"
});

// con.connect(function() {
//   console.log("Connected!");
//   var sql="INSERT INTO books VALUES('khan1','shadab1')"
//   con.query(sql,function(){
//     console.log("insert");
//   })
// });
app.set('view engine','pug');
app.set('views',path.join(__dirname,'view'))
app.use(express.urlencoded());
app.get("/",(req,resp)=>{
    resp.status(200).render('index.pug')
})
app.post("/",(req,resp)=>{
    if(req.body.userid=="shadab" && req.body.password==12345){
        resp.status(200).render('home.pug')
    }
    else{
        resp.status(404).render("incorrectpasword.pug")
    }
});
app.get("/",(req,resp)=>{
    resp.status(200).render('index.pug')
})
app.get("/view",(req,resp)=>{
    con.connect(function() {
        console.log("Connected!");
        var sql="SELECT * FROM books"
        con.query(sql,function(err,result){
        if (err) throw err;
        console.log(result);
        resp.status(200).render('view.pug',{pretty:true,title:'hey',message:result})

        })
      });


})
app.get("/add",(req,resp)=>{
    resp.status(200).render('add.pug')

})
app.get("/delete",(req,resp)=>{
    resp.status(200).render('delete.pug')

})
app.get("/issue",(req,resp)=>{
    var sql="SELECT * FROM issuebook"
        con.query(sql,function(err,result){
        if (err) throw err;
        console.log(result);
        resp.status(200).render('issue.pug',{pretty:true,title:'hey',message:result})

        })

})
app.get("/return",(req,resp)=>{
    resp.status(200).render('return.pug')

})
app.post("/add",(req,resp)=>{
    bname=req.body.bookname
    aname=req.body.authorname
    console.log(bname)
    con.connect(function() {
        //   console.log("Connected!");
          var sql=`INSERT INTO books VALUES('${bname}','${aname}')`
          con.query(sql,function(){
            console.log("insert");
          })
        });
    resp.render('add.pug')
})
app.post("/delete",(req,resp)=>{
    bname=req.body.bookname
    con.connect(function(err) {
        var sql = `DELETE FROM books WHERE name = '${bname}'`;
        con.query(sql, function () {
          console.log("Number of records deleted:");
        });
      });
      resp.render("delete.pug")
      
})
app.post("/issue",(req,resp)=>{
    bname=req.body.bookname
    aname=req.body.authorname
    sname=req.body.name
    date=req.body.date
    con.connect(function(){
        con.query(`INSERT INTO issuebook VALUES ("${bname}","${aname}","${sname}","${date}")`
        )

        



    })
    resp.render("issue.pug")

})


app.post("/return",(req,resp)=>{
    stname=req.body.name
    date=req.body.date
    con.connect(function(err) {
        var sql = `DELETE FROM issuebook WHERE studentname = '${stname}' AND Dateofissue='${date}'`;
        con.query(sql, function () {
          console.log("Number of records deleted:");
        });
      });
      resp.render("return.pug")
      
})




app.listen(4000,()=>{
    console.log("your program is running")
})