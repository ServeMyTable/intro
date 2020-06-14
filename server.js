const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static("public"))

app.get('/',function(req,res){
        
        res.render('index.ejs',{Message : {msg : 2 , status : 2}});
});

app.get('/tnc',function(req,res){

      res.render('TnC.ejs');

});

app.get('/privacy',function(req,res){

      res.render('Privacy.ejs');
      
});



app.post('/',function(req,res){
        const Name = req.body.Name;
        const Email = req.body.Email;
        const Message = req.body.Message;

        var transporter = nodemailer.createTransport({
    
                service: 'gmail',
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.PASSWORD
                }
        });
        var HTML = 
                  `<!doctype html>
                  <html>
                        <head>
                        <meta charset="utf-8">
                        <style>
                              h1{
                                    font-family : 'PTSans',sans-serif
                              }
                              .mFont{
                                    font-family: "Noto Sans",sans-serif;
                              }
                              .line-theme{

                                    border: 1px solid #ffd31d;
                                    width: 100%;
                                    background-color: #ffd31d;
                              }
                              body{
                                    padding : 10px;
                              }
                              
                        </style>
                        <script async src="https://cdn.ampproject.org/v0.js"></script>
                        </head>
                        <body>
                              <h1>Serve My Table</h1>
                              <hr class="line-theme"><br>
                              <h2 class="mFont">Message</h2>
                              <hr class="line-theme">
                              <p class="mFont">${Message}</p>
                              
                              <hr class="line-theme"><br>
                              <p class="mFont">
                              Name : ${Name}<br>
                              Contact Mail : ${Email}</p>	
                        </body>
                  </html>`
                  
        
        var mailOptions = {
                from: 'servemytable@gmail.com',
                to: 'servemytable@gmail.com',
                subject: 'Enquiry',
                html: HTML
        };
              
        transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                       //console.log(error);
                       res.render('index.ejs',{Message : {msg : "Unable to send Message Try Again later" , status : 0}});
                        
                } else {
                        
                        //console.log("Success");
                        res.render('index.ejs',{Message : {msg : "Thank You for contacting Us!!!" , status : 1}});
                }
        });

});

app.post('/enquiry',function(req,res){
      const message = req.body.EmailEnq;
      var transporter = nodemailer.createTransport({
    
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
      });
      var mailOptions = {
            from: 'servemytable@gmail.com',
            to: 'servemytable@gmail.com',
            subject: 'Enquiry',
            html: `<p>${message}</p>`
      };
    
      transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                  //console.log(error);
                  setTimeout(()=>{
                        res.redirect('/');
                  },3000);
                  
                  
            } else {
                  
                  //console.log("Success");
                  setTimeout(()=>{
                        res.redirect('/');
                  },3000);
            }
      });
});


app.listen(process.env.PORT || 5000,function(){
        console.log('Server is up and Running on 5000');
});