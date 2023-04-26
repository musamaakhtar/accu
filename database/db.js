import mongoose from 'mongoose'

mongoose.set('strictQuery', true);
const Connection = async (URL) => {
    try {
        mongoose.set('strictQuery', false);
        console.log(`database is running ${URL}`)

        await mongoose.connect(URL)
    }
    catch (error) {
        console.log('database is not connected', error)
    }
}

export default Connection;