import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema

const exerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    times: {
        type: Number,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
}, {
    minimize: false,
    timestamps: true
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

export default Exercise