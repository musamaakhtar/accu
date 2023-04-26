import mongoose from 'mongoose'

const crew = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        // required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    role:{
        type: String,
        required: true
    }

})


const registeringCrew = mongoose.model('crew', crew)
export default registeringCrew;