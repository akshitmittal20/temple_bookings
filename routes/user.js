const express = require('express');
const router = express.Router();

require("dotenv").config();

const { signup, update, signin } = require("../types/types")

const { Users, Poojas } = require("../db/database")

const jwt = require("jsonwebtoken")

const authMiddleware = require("../middleware/AuthMiddleware")

router.post("/signup", async (req, res) => {
    const { success } = signup.safeParse(req.body)

    //unsuccessful
    if (!success) {
        return res.status(411).json({
            msg: "Invalid Inputs"
        })
    }

    const presentUser = await Users.find(
        { username: req.body.username }
    )
    console.log(presentUser)
    if (presentUser.length) {
        res.status(411).json({
            msg: "username is taken. Use a different username "
        })
        return
    }

    //succesfull
    console.log({ msg: "User is now validated, creating a new user..." })
    const NewUser = await Users.create(req.body)
    console.log("user created in the db")

    try {
        const newuserid = NewUser._id

        console.log({ msg: "Assigning account to user" })
        await Account.create({
            userId: newuserid,
            balance: 1 + Math.random() * 10000
        })

        console.log({ msg: "Tokenising user" })
        const token = jwt.sign({
            newuserid
        }, process.env.JWT_KEY)

        console.log({ msg: "User Created Succesfully" })
        res.json({
            msg: "User Created Succesfully",
            token: token
        })
    }
    catch (error) {
        console.log("error in tokenising the user info")
        res.json({
            msg: "error in tokenising the user info"
        })
        console.error(error)
        return
    }
})


router.post("/signin", async (req, res) => {
    const body = req.body;
    const validateUser = signin.safeParse(body)

    //unsuccessful
    if (!validateUser.success) {
        return res.status(411).json({
            msg: "Invalid username or password"
        })
    }

    try {
        const user = await Users.findOne({
            username: body.username,
            password: body.password
        })
        console.log(user)

        if (user) {
            const token = jwt.sign({
                userId: user._id
            }, process.env.JWT_KEY)

            res.json({
                token: token
            })
            return
        }

        res.status(411).json({
            msg: "incorrect username / password"
        })
    }
    catch (error) {
        res.json({
            msg: "Error while logging in"
        })
        console.error(error)
    }
})


router.put("/", authMiddleware, async (req, res) => {
    const inputbody = req.body;
    const validateUser = update.safeParse(inputbody)
    if (!validateUser.success) {
        res.status(411).json({
            msg: "Inputs are invalid"
        })
        return
    }

    const updatedUser = await Users.updateOne({
        _id: req.userId
    }, req.body)

    console.log(updatedUser)

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await Users.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})





router.post("/bookings", async (req, res) => {
  
    const thisPooja = await Poojas.find(
        { _id: pooja._id }
    )
    console.log(presentUser)
    if (presentUser.length) {
        res.status(411).json({
            msg: "username is taken. Use a different username "
        })
        return
    }

    //successfull
    console.log({ msg: "User is now validated, creating a new user..." })
    const NewUser = await Users.create(req.body)
    console.log("user created in the db")

    try {
        const newuserid = NewUser._id

        console.log({ msg: "Assigning account to user" })
        await Account.create({
            userId: newuserid,
            balance: 1 + Math.random() * 10000
        })

        console.log({ msg: "Tokenising user" })
        const token = jwt.sign({
            newuserid
        }, process.env.JWT_KEY)

        console.log({ msg: "User Created Succesfully" })
        res.json({
            msg: "User Created Succesfully",
            token: token
        })
    }
    catch (error) {
        console.log("error in tokenising the user info")
        res.json({
            msg: "error in tokenising the user info"
        })
        console.error(error)
        return
    }
})





module.exports = router;
