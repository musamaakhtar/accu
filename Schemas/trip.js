import mongoose from 'mongoose'

const trip = new mongoose.Schema({
    clientId: {
        type: String,

    },
    uuid: {
        type: String,
    },
    companyName: {
        type: String,

    },
    tripName: {
        type: String,

    },
    clientName: {
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
    date: {
        type: Date,

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
    crewStatus: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    documentStatus: {
        type: String,
        required: true
    },
    documentClientStatus: {
        type: String,
        required: true
    },


    crewMembers: [
        {
            crewName: {
                type: String,
            },
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
            fee: {
                type: String,
            },
            percentage: {
                type: String,
            },
            crewType: {
                type: String,
            },

        }
    ],

    sign: [
        {
            sign: {
                type: String,
            },
            signId: {
                type: String,
            },
            location: {
                type: String,
            },
            ipAddress: {
                type: String,
            },
            date: {
                type: String,
            },
            time: {
                type: String,
            }
        }
    ],
    crewExpenses: [
        {
            title: {
                type: String
            },
            merchant: {
                type: String
            },
            amount: {
                type: String
            },
            expensePic: {
                type: String
            },
            crewId: {
                type: String
            },
            crewName: {
                type: String
            },
            date: {
                type: String
            },
            expenseStatus: {
                type: String,
                default: "Aprove"
            }
        }

    ]
})
const registeringTrip = mongoose.model('trip', trip)
export default registeringTrip;