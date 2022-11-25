import asyncHandler from 'express-async-handler'
import Workout from "../../models/workoutModel.js"

// @desc  Add workout
// @route POST /api/workouts
// @access Private
export const createWorkout = asyncHandler(async (req, res) => {
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



// @desc  Get workouts
// @route GET /api/workouts
// @access Private
export const getWorkouts = asyncHandler(async (req, res) => {
    const workouts = await Workout.find().populate('exercises')

    res.json(workouts)
})


// @desc  Update workout
// @route PUT /api/workouts
// @access Private
export const updateWorkout = asyncHandler(async (req, res) => {
    const {name, exercisesIds, workoutId} = req.body

    const workout = await Workout.findById(workoutId)

    if(!workout) {
        res.status(404)
        throw new Error('Данная тренировка не найдена')
    }

    workout.name = name
    workout.exercises = exercisesIds

    const updatedWorkout = await workout.save()


    res.json(updatedWorkout)
})


// @desc  Delete workout
// @route DELETE /api/workouts
// @access Private
export const deleteWorkout = asyncHandler(async (req, res) => {
    const {workoutId} = req.body

    const workout = await Workout.findById(workoutId)

    if(!workout) {
        res.status(404)
        throw new Error('Данная тренировка не найдена')
    }


    await workout.remove()


    res.json({message: 'Workout has been removed'})
})

/*
[x] - Get workout with exercises list with calc minutes
[x] - Create exerciseLog by exercise in workout
[x] - Get exercise page with previous result
[x] - Update exercise log times + compeleted
[x] - Update exercise log compeleted
[x] - Create workout log
[x] - Update workout & exercise
[x] - Delete exercise & workout
[x] - Get statistics for profile
*/