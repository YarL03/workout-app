import express from 'express'
import { createWorkoutLog, getWorkoutLog, updateCompleteWorkoutLog } from '../controllers/workout/logController.js'
import { createWorkout, deleteWorkout, getWorkout, getWorkouts, updateWorkout } from '../controllers/workout/workoutController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router
    .route('/')
    .get(protect, getWorkouts)
    .post(protect, createWorkout)
    .put(protect, updateWorkout)
    .delete(protect, deleteWorkout)

router
    .route('/log')
    .post(protect, createWorkoutLog)

router
    .route('/log/completed')
    .put(protect, updateCompleteWorkoutLog)

router
    .route('/log/:id')
    .get(protect, getWorkoutLog)

router
    .route('/:id')
    .get(protect, getWorkout)

export default router