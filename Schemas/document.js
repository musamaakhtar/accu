import mongoose from 'mongoose'

const document = new mongoose.Schema({
    documentPic: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },

    title:{type: String,   
    required: true
    },
    tripId:{
    type: String,   
    }
})


const addingDocument = mongoose.model('document', document)
export default addingDocument;