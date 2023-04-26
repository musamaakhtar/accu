import mongoose from 'mongoose'

const client = new mongoose.Schema({
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
    registrationNumber: {
        type: String,
        required: true
    },
    
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

const registeringClient = mongoose.model('client', client)
export default registeringClient;