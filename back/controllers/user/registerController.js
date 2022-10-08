import User from '../../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { generateToken } from '../../helpers/generateToken.js'

// @desc  Post user 
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
    const {password, email} = req.body

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('Данный пользователь уже зарегистрирован')
    }

    const user = await User.create({
        email,
        password
    })

    const token = generateToken(user._id)

    res.json({user, token})
})