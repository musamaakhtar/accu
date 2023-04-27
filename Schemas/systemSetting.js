import mongoose from 'mongoose'

const settings = new mongoose.Schema({
    name: {
        type: String,
        
    },
    email: {
        type: String,
        
    },
    phoneNumber: {
        type: String,
        
    },
    address: {
        type: String,
        
    },
    logo: {
        type: String,
        
    },
    favicon: {
        type: String,
        
    },
    clientId: {
        type: String,
        required: true
    }
})


const addingSystemSettings = mongoose.model('SystemSettings', settings)
export default addingSystemSettings;