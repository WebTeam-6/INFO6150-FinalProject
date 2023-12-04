const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const api_config = require("../config/api.js");

const UserController = {

    /* get all users */
    async get_users(req, res) {
        try {
            const users = await User.find();
            if(!users){
                res.status(400).json({
                    type: "error",
                    message:"User doesn't exists"
                })
            } else{
                res.status(200).json({
                    type: "success",
                    users
                })
            }
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
       
    },

    /* create new user */
    async create_user(req, res, next) {

        console.log(req.body);
        const newUser = new User({

            email: req.body.email,
            fullName: req.body.fullName,
            password: bcrypt.hashSync(req.body.password, 10),
            phoneNumber: req.body.phoneNumber,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            previousPassword: new Array(bcrypt.hashSync(req.body.password, 10))
        });

        try {
            const user = await newUser.save();
            res.status(201).json({
                type : 'success',
                message: "User has been created successfully",
                user
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }

    },

    /* update password */
    async update_password(req, res) /*   /user/edit  */{

        const existing = await User.findById(req.params.id);
        if(!existing){
            res.status(404).json({
                type: "error",
                message: "User doesn't exist"
            })
        }else{
            if(req.body.password) {
                req.body.password = bcrypt.hashSync(req.body.password, 10)
            }


            
            try {
                const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                    // {previousPassword: Array.push(bcrypt.hashSync(req.body.password, 10))},
                    $set: req.body
                    
                    
                }, 
                { new: true }
                );
                res.status(200).json({
                    type: "success",
                    message: "User updated successfully",
                    updatedUser
                })
            } catch (err) {
                res.status(500).json({
                    type: "error",
                    message: "Something went wrong please try again",
                    err
                })
            }
        }
    },

    /* update user */
    async update_user(req, res) /*   /user/edit  */{
        const {  email, fullName, phoneNumber, dateOfBirth, gender } = req.body;
        const existing = await User.findById(req.params.id);
        if(!existing){
            res.status(404).json({
                type: "error",
                message: "User doesn't exist"
            })
        }else{
            try {
                const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, 
                { new: true }
                );
                res.status(200).json({
                    type: "success",
                    message: "User updated successfully",
                    updatedUser
                })
            } catch (err) {
                res.status(500).json({
                    type: "error",
                    message: "Something went wrong please try again",
                    err
                })
            }
        }
    },

   /* login existing user */
   async login_user(req, res) {
        
    const user = await User.findOne({ email: req.body.email });
    // console.log(email);

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        res.status(500).json({
            type: "error",
            message: "User not exists or invalid credentials",
        })
    } else {

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin}, 
        api_config.api.jwt_secret,
        { expiresIn: "1d"}
        );

         
        

        const { password, ...data } = user._doc;

        res.status(200).json({
            type: "success",
            message: "Successfully logged",
            ...data,
            accessToken
        })
    }
} 

    
};

module.exports = UserController;