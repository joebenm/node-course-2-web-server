const fs=require('fs');
const express=require('express');
const hbs =require('hbs');
const port=process.env.port || 3000;

var app=express();
hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}:${req.method}:${req.path}`;
    console.log(log);
    fs.appendFile('server.log',log+ '\n',(err)=>{});
next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
return text.toUpperCase();
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home page',
        welcomeMessage:'Welcomes you'
        // currentYear: new Date().getFullYear()
    });
    // res.send('<h1>Hello express<h1>');
    // res.send({
    //    name:'Joe',
    //    likes:[
    //        'Movies',
    //        'Travel'
    //    ] 
    // });
});
// app.get('/about',(req,res)=>{
//     res.send('About page');
// });
app.get('/about',(req,res)=>{
    // res.render('about.hbs');

res.render('about.hbs',{
    pageTitle:'About page',
    welcomeMessage:'Welcomes you'
    // currentYear: new Date().getFullYear()
});
});

app.get('/projects',(req,res)=>{
res.render('projects.hbs',{
    pageTitle:'Projects page'
}); 
});
app.get('/bad',(req,res)=>{
    res.send({
error:'Unable to handle request'
    });
});
// app.listen(3000,()=>{
//     console.log('Server is up on the port 3000');
// });
app.listen(port,()=>{
    console.log(`Server is up on the port ${port}`);
})