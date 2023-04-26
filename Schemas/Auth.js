import mongoose from 'mongoose'

const reg = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
        // required: true,
    },
    crewType: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        // required: true
    },
    role: {
        type: String,
        required: true
    },
    uId: {
        type: String,
    },
    phoneNumber: {
        type: String,
       
    },
    adress:{
     type: String,
    },
    designation:{
     type: String,
    },
    lastName: {
        type: String,
    },
    visaPic: {
        type: String,
    },
    aboutMe: {
        type: String,
    } ,
    bankName: {
        type: String,
    } ,
    bankAdress: {
        type: String,
    },
    accountNumber: {
        type: String,
    } ,
    institute: {
        type: String,
    },
    degree: {
        type: String,
    },
    year: {
        type: String,
    },
    passportPic: {
        type: String,
    },
    iban:{
        type:String,
    },
    country: {
        type: String,
    },
    profilePic:{
        type: String,
    },
    comapnyAdress: {
        type: String,
    },
    companyName:{
        type: String,
    },
    registrationNumber: {
        type: String,
    },
    VatNumber:{
        type: String,
    },
    bank:{
        type: String,
    },  
    percentage:{
        type: String,
    },
    fee:{
        type: String,
    }
    
})

const registeringUser = mongoose.model('user', reg)
export default registeringUser;