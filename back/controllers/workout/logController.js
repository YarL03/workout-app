import asyncHandler from 'express-async-handler'
import ExerciseLog from '../../models/exerciseLogModel.js'
import WorkoutLog from '../../models/workoutLogModel.js'
import Workout from '../../models/workoutModel.js'

// @desc  Create workout log
// @route POST /api/wortkouts/log
// @access Private
export const createWorkoutLog = asyncHandler(async (req, res) => {
    const {workoutId} = req.body

    const workout = await Workout.findById(workoutId).populate('exercises')

    if (workout) {
        const workoutLog = await WorkoutLog.create({
                user: req.user._id,
                workout: workoutId
            })

        const logs = workout.exercises.map(ex => {
            let timesArray = []

            for (let i = 0; i < ex.times; i++) {
                timesArray.push({
                    weight: 0,
                    repeat: 0
                })
            }

            return {
                user: req.user._id,
                exercise: ex._id,
                times: timesArray,
                workoutLog: workoutLog._id
            }
        })

        const createdExLogs = await ExerciseLog.insertMany(logs)

        const exLogIds = createdExLogs.map(log => log._id)

        const foundWorkoutLog = await WorkoutLog.findById(workoutLog._id)

        foundWorkoutLog.exerciseLogs = exLogIds

        const updatedWorkoutLog = await foundWorkoutLog.save()

        res.json(updatedWorkoutLog)
    } 
        else {
            res.status(404)
            throw new Error('Тренировка не найдена')
    }

    

    res.json(workoutLog)
})


// @desc  Get workout log
// @route GET /api/wortkouts/log/:id
// @access Private
export const getWorkoutLog = asyncHandler(async (res, req) => {
    const workoutLog = await WorkoutLog.findById(res.params.id)
        .populate('workout')
        .populate({
            path: 'exerciseLogs',
            populate: {
                path: 'exercise'
            }
        })
        .lean()

    const minutes = Math.ceil(workoutLog.workout.exercises.length * 3.7)

    res.json({...workoutLog, minutes})
})

// @desc  Update workout log completed
// @route PUT /api/wortkouts/log/completed
// @access Private
export const updateCompleteWorkoutLog = asyncHandler(async (res, req) => {
    const {logId} = req.body

    const currentLog = await WorkoutLog.findById(logId)

    if (!currentLog) {
        res.status(404)
        throw new Error('Данный лог не найден')
    }

    currentLog.completed = true

    const updatedLog = await currentLog.save()

    res.json(updatedLog)
})