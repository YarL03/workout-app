import User from "../../models/userModel.js"
import asyncHandler from 'express-async-handler'
import ExerciseLog from "../../models/exerciseLogModel.js"
import WorkoutLog from "../../models/workoutLogModel.js"

// @desc  Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password').lean()

    /* minutes, workouts, kg */

    const exerciseLogsByUser = await ExerciseLog.find({
        user: user._id,
        completed: true
    })

    let countExerciseTimeCompleted = 0
    let kgs = 0

    exerciseLogsByUser.forEach(log => {
        countExerciseTimeCompleted += log.times.length
        console
        log.times.forEach(item => 
            kgs += item.weight)
    })

    const minutes = Math.ceil(countExerciseTimeCompleted * 2.3)

    const workouts = await WorkoutLog.find({
        user: user._id,
        compeleted: true
    }).countDocuments()

    res.json({...user, minutes, workouts, kgs})
})