import express from 'express'
import { createExerciseLog } from '../controllers/exercise/log/createController.js'
import { getExerciseLog } from '../controllers/exercise/log/getController.js'
import { updateExerciseLogComplete, updateExerciseLogTime } from '../controllers/exercise/log/updateController.js'
import { createExercise, deleteExercise, getExercises, updateExercise } from '../controllers/exercise/mainController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router
    .route('/')
    .get(protect, getExercises)
    .post(protect, createExercise)
    .put(protect, updateExercise)
    .delete(protect, deleteExercise)

router
    .route('/log')
    .post(protect, createExerciseLog)
    .put(protect, updateExerciseLogTime)

router
    .route('/log/completed')
    .put(protect, updateExerciseLogComplete)

router
    .route('/log/:id')
    .get(protect, getExerciseLog)

export default router