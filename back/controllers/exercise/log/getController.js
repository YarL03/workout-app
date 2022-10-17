import asyncHandler from 'express-async-handler'
import { transformTimes } from '../../../helpers/exerciseLog.js'
import ExerciseLog from '../../../models/exerciseLogModel.js'

// @desc  Get exerciseLog
// @route GET /api/exercises/log/:id
// @access Private
export const getExerciseLog = asyncHandler(async (req, res) => {
    const exerciseLog = await ExerciseLog.findById(req.params.id).populate('exercise', 'name imageId').lean()

    if(!exerciseLog) {
        res.status(404)
        throw new Error('Лог не найден')
    }

    const prevExerciseLogs = await ExerciseLog.find({user: req.user._id, exercise: exerciseLog._id}).sort('desc')

    const newTimes = transformTimes(exerciseLog, prevExerciseLogs[0])

    res.json({...exerciseLog, times: newTimes})
})