import express from 'express'
import { createExerciseLog } from '../controllers/exercise/logController.js'
import { createExercise } from '../controllers/exercise/mainController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createExercise)
router.route('/log').post(protect, createExerciseLog)

export default router