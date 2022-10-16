import asyncHandler from 'express-async-handler'
import Workout from "../../models/workoutModel.js"

// @desc  Add workout
// @route POST /api/workouts
// @access Private
export const addNewWorkout = asyncHandler(async (req, res) => {
    const {name, exercisesIds} = req.body

    const workout = await Workout.create({
        name,
        exercises: exercisesIds
    })

    res.json(workout)
})


// @desc  Get workout
// @route GET /api/workouts/:id
// @access Private
export const getWorkout = asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id).populate('exercises').lean()

    const minutes = Math.ceil(workout.exercises.length * 3.7)

    res.json({...workout, minutes})
})

