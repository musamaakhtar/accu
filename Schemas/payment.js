import mongoose from 'mongoose'

const stripe = new mongoose.Schema({
    tripDetails: [
        {
        clientId: {
            type: String,

        },
        tripName: {
            type: String,

        },
        tripId: {
            type: String,

        },
        client: {
            type: String,

        },
        fee: {
            type: String,

        },
        description: {
            type: String,

        },

        percentage: {
            type: String,

        },
        destinationTo: {
            type: String,

        },
        destinationFrom: {
            type: String,

        },
        startDate: {
            type: String,

        },
        endDate: {
            type: String,

        },
        hotelType: {
            type: String,

        },
        airlineTravel: {
            type: String,

        },
        aircraftType: {
            type: String,

        },
        selectAircraft: {
            type: String,

        },

        role: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        crewMembers: [
            {
                crewId: {
                    type: String,
                },
                dailyRateCrew: {
                    type: String,
                },
                dailyRateClient: {
                    type: String,
                },
                perDiemsCrew: {
                    type: String,
                },
                perDiemsClient: {
                    type: String,
                },
                crewType: {
                    type: String,
                }

            }
        ]
    }
    ],
    clientId: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    date: {
        type:Date,
        required: true
    },
   amount: {
        type: String,
        required: true
    },

    

})


const registeringPayment = mongoose.model('stripe', stripe)
export default registeringPayment;