const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtkeyval = process.env.KEY;

module.exports = {
    create: function (req, res, next) {

        
        User.findOne({ email: req.body.email })
            .then((foundUser) => {
                    if (foundUser != null) {
                        res.status(400).json({ status: "error", message: "user already exits", data: null });
                        return false;
                    }
                    else {
                        if(req.body.name=="" || req.body.email=="" || req.body.password=="" )
                        {
                            res.status(401).json({ status: "error", message: "Enter Name , Email and Password", data: null });
                            return false;
                        }
                        
                        let hashedPassword = User.hashPassword(req.body.password);

                        const newUser = new User({
                            name : req.body.name,
                            email: req.body.email,
                            password: hashedPassword
                        });

                        newUser.save().then((userresult) => {
                            
                            res.json({ status: "success", message: "user created sucessfully", data:{"name":userresult.name,"email":userresult.email} });
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                
            })
            .catch((error) => {
                //When there are errors We handle them here
                console.log(error);
                res.status(400).json({status:"error",message:"Bad Request",data:null});
            }); 
        },

    authenticate: function (req, res, next) {
    
         
        const passval = req.body.password;

        User.findOne({ email:req.body.email })
        .then((userInfo) => {
            if (userInfo != null && bcrypt.compareSync(passval, userInfo.password)==false ) {
                console.log("Invalid - User Not Found");
                res.json({ status: "error", message: "Invalid email/password!!!", data: null });
            } else { 
                const token = jwt.sign({ id: userInfo._id }, jwtkeyval, { expiresIn: '24h' });
                res.json({ status: "success", message: "user found!!!", data:{"name":userInfo.name,"email":userInfo.email, token: token } });
            }
        })
        .catch((error) => {
            //When there are errors We handle them here
            console.log("Error");
            console.log(error);
            res.status(400).json({status:"error",message:"Invalid Credentials",data:null});
        }); 
    }

       

}					
