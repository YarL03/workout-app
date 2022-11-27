import asyncHandler from 'express-async-handler'
import { transformTimes } from '../../../helpers/exerciseLog.js'
import ExerciseLog from '../../../models/exerciseLogModel.js'

// @desc  Get exerciseLog
// @route GET /api/exercises/log/:id
// @access Private
export const getExerciseLog = asyncHandler(async (req, res) => {
    const exerciseLog = await ExerciseLog.findOne({
        _id: req.params.id,
        user: req.user._id
    }).populate('exercise', 'name imageName').lean()

    if(!exerciseLog) {
        res.status(404)
        throw new Error('Лог не найден')
    }
    
    const prevExerciseLogs = await ExerciseLog.find({user: req.user._id, exercise: exerciseLog.exercise._id})

    const filtered = prevExerciseLogs.filter(item => item.times[0].weight || item.times[0].repeat)

    const newTimes = transformTimes(exerciseLog, filtered[filtered.length - 1] || null)
    
    res.json({...exerciseLog, times: newTimes})
})