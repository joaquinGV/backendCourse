import mongoose from "mongoose";

const studentsCollection = 'students';

const studentsSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require : true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    dni: Number,
    gender: {
        type: String,
        enum: ['M', 'F']
    },
    courses: {
        type: Array,
        default: []
    },


})

export const studentsModel = mongoose.model(studentsCollection, studentsSchema) 