import asyncHandler from 'express-async-handler'
import Exercise from "../../models/exerciseModel.js"

// @desc  Create exercise
// @route POST /api/exercises
// @access Private
export const createExercise = asyncHandler(async (req, res) => {
    const {name, times, imageId} = req.body

    const exercise = await Exercise.create({
        name,
        times,
        imageId
    })

    res.json(exercise)
})