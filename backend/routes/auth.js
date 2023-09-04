const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = "EarthIsBeautiful"

//ROUTE : 1 create a user using: POST "/api/auth/createuser". No Login required.

router.post('/createuser',
    [body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be 5 letter character').isLength({ min: 5 })],
    async (req, res) => {
        // if there is error return bad request 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //check weather user with this email exist
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: 'Sorry this email is already exists' })
            }

            const salt = await bcrypt.genSalt(10);
            const securePass = await bcrypt.hash(req.body.password, salt)

            //create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePass,
            })

            const data = {
                user: {
                id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET)
            console.log(authToken)

            res.json({ authToken })

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal server error')
        }


    })

//ROUTE : 2 Authtincate the user using: POST "/api/auth/login". No Login required.

router.post('/login',
    [body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
    ],
    async (req, res) => {

        // if there is error return bad request 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Please try to login with correct credentials' });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: 'Please try to login with correct credentials' });
            }

            const data = {
                user: {
                    id: user.id
                    }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            res.json({ authToken })

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal server error')
        }

    })

//ROUTE : 3 Get logged in user details using: POST "/api/auth/getuser". Login required.

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error')
    }
})
module.exports = router
