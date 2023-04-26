import mongoose from 'mongoose'

const aircraft = new mongoose.Schema({
    aircraftOwner:{
        type: String,
       
    },
    aircraftOperator: {
        type: String,
        
    },
    registrationNumber: {
        type: String,
       
    },
    type: {
        type: String,
        
    },
    aircraftPic: {
        type: String,
       
    },
    role: {
        type: String,
       
    }

})

const registeringAircraft = mongoose.model('aircraft', aircraft)

export default registeringAircraft;