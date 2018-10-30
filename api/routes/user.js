const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth= require('../middleware/checkAuthMiddleware');
const saltRounds = 10;

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(result => {
            console.log(result.length);
            if (result.length > 0) {
                return res.status(409).json({
                    message: "mail exits",
                });
            } else {
                let hash = bcrypt.hashSync(req.body.password, saltRounds);
                if (hash == null) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                        .then(result => {
                            res.status(201).json({
                                message: 'User created'
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: 'User create faild',
                                error: err
                            });
                        });
                }
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'User create faild',
                error: error
            });
        });

});

router.post('/login', (req, res, next) => {
    console.log(req.body.email);
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if(user.length < 1){
                res.status(401).json({
                    message: 'Auth faild'
                });
            }else{
                let pwd_match=bcrypt.compareSync(req.body.password, user[0].password);
                if(pwd_match){
                    const token=jwt.sign(
                    {
                        email:user[0].email,
                        id:user[0]._id
                    },
                        process.env.JWTKEY,
                        {
                            expiresIn:"1h"
                        }
                    );
                    res.status(200).json({
                        message: 'login success',
                        token:token
                    });
                }else{
                    res.status(401).json({
                        message: 'Auth faild'
                    });
                }
            }
            res.status(200).json({
                message: 'asdas'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'User login faild',
                error: error
            });
        });
});



module.exports = router;

