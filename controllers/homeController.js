"use strict";
const { JSONCookie } = require('cookie-parser');
var fs = require('fs');
var courses = [
  {
    title: "Event Driven Cakes",
    cost: 50
  },
  {
    title: "Asynchronous Artichoke",
    cost: 25
  },
  {
    title: "Object Oriented Orange Juice",
    cost: 10
  }
];


const path = require('path');
exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses
  });
};

exports.showSignUp = (req, res) => {
  res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};
exports.showProducts= (req, res)=>{

  let products=fs.readFileSync(path.resolve("balloonatic-products.json"));
  let data = JSON.parse(products);
  res.render("products", { product_list: data});
}

exports.about= (req, res)=>{
  res.render("about");
}

exports.contact= (req, res)=>{
  res.render("contact_us");
}

exports.registration= (req, res)=>{
  res.render("registration");
}

exports.login= (req, res)=>{
  res.render("login");
}

exports.logout= (req, res)=>{
  res.render("logout");
}

const url = require('url');
exports.loginUser= (req, res)=>{
  
  const queryObject = url.parse(req.url,true).query;
  var email=queryObject.email;
  var password=queryObject.password;

  var auth=0;
  fs.readFile('balloonatic-users.json', function (err, data) {
    var json = JSON.parse(data);
    for(var i = 0; i < Object.keys(json).length; i++)
    {
      
      if (json[i]['email']== email)
      {
   
        if (json[i]['password']==password)  
        {
          auth=1;
          return res.send('1');
          break;
        }
          
      }
    }

    if(auth==0){
      return res.send('0');
    }else{
      return res.send('1');
    }
  })

  
}


exports.check_email= (req, res)=>{
  const queryObject = url.parse(req.url,true).query;
  var email=queryObject.Email;
  var found=0;
  fs.readFile('balloonatic-users.json', function (err, data) {
    var json = JSON.parse(data);
    for(var i = 0; i < Object.keys(json).length; i++)
    {
      if (json[i]['email']==email)
      {
          found=1;
          return res.send('1');
      }
    }

    if(found==0){
      return res.send('0');
    }
  })
}


exports.register_user=(req,res)=>{
  console.log(req.body)

  fs.readFile('balloonatic-users.json', function (err, data) {
    var json = JSON.parse(data);
    var auto_id=Object.keys(json).length;
    json.push({
      id:auto_id,
      email: req.body.Email ,
      password: req.body.Password1, 
      firstName: req.body.FirstName,
      lastName:req.body.LastName,
      address:req.body.Address,
      city:req.body.City,
      state:req.body.State,
      postalCode:req.body.PostalCode,
      country:"USA",
      phone:req.body.Phone 

    });    
    fs.writeFile("balloonatic-users.json", JSON.stringify(json), function(err){
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
})
  res.render("index")
}