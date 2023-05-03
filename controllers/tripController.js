import registeringUser from "../Schemas/Auth.js";
import registeringTrip from "../Schemas/trip.js";
export const createTrip = async (req, res) => {
    try {

        console.log(req.body);
        const { tripName, fee, client,
            percentage, description, destinationTo, destinationFrom,
            startDate, endDate, aircraftType,
            selectAircraft, hotelType, airlineTravel, clientId, uuid } = req.body;

        registeringUser.findOne({ _id: clientId ? clientId : client }, (err, data) => {
            if (data) {
                const trip = new registeringTrip({
                    tripName, clientName: data.firstName + " " + data.lastName, fee, companyName: data.companyName,
                    percentage, description, destinationTo, destinationFrom,
                    startDate, endDate, aircraftType, selectAircraft, hotelType, airlineTravel, clientId, uuid: uuid,
                    role: "trip", status: "pending", crewStatus: "pending", payment: "pending", documentStatus: "pending", documentClientStatus: "pending", date: Date.now()
                });
                trip.save();

                res.json({ message: "Trip Details added", data: req.body });

            }
            else {
                res.json({ message: "client not found" });
            }
        })







    }
    catch (err) {
        console.log("error in adding trip details", err);
        res.json({ message: "server error" })
    }
}
export const getAllTrips = async (req, res) => {
    try {
        const data = await registeringTrip.find({})
        res.json(data);
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const getTripById = async (req, res) => {
    try {
        const data = await registeringTrip.findById(req.params.id)
        res.json({
            message: "single data found",
            data: data
        });
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const deleteTrip = async (req, res) => {
    try {
        console.log(req.body, "=========>id")
        const id = req.body.e;
        registeringTrip.findByIdAndRemove((id), (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "trip deleted" })
            }
            else {
                res.json({ message: "trip does not exist" })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const TripsByClientId = async (req, res) => {
    try {
        console.log(req.body)
        const clientId = req.body.clientId;
        registeringTrip.find({ clientId: clientId }, (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "User Exist", data: data })
            }
            else {
                res.json({ message: "User not  Exist", data: data })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
};
export const addCrewToTripsByClientId = async (req, res) => {
    try {
        console.log(req.body)
        const uuid = req.body.uuid;
        console.log(uuid, "both are id's")
        const crewId = req.body.crewId;
        console.log(crewId, "both are id's")
        const val = {
            crewId: req.body.crewId,
            dailyRateCrew: req.body.dailyRateCrew,
            dailyRateClient: req.body.dailyRateClient,
            perDiemsCrew: req.body.perDiemsCrew,
            perDiemsClient: req.body.perDiemsClient,
            crewType: req.body.crewType
        }
        const Val = val;
        const fee = req.body.fee;
        const percentage = req.body.percentage;
        registeringUser.findOne({ _id: crewId }, (err, data) => {
            if (data) {
                console.log(data, "==========>crew data")
                registeringTrip.findOneAndUpdate({ uuid: uuid },
                    {
                        $push: {
                            crewMembers: {
                                crewId: req.body.crewId,
                                dailyRateCrew: req.body.dailyRateCrew,
                                dailyRateClient: req.body.dailyRateClient,
                                perDiemsCrew: req.body.perDiemsCrew,
                                perDiemsClient: req.body.perDiemsClient,
                                crewType: req.body.crewType,
                                crewName: data.firstName
                            }
                        }, fee: fee, percentage: percentage, documentStatus: "approved"
                    }, { new: true }, (err, data) => {
                        if (data) {
                            console.log(data);
                            res.json({ message: "crew Added", data: data })
                            console.log("found");
                        }
                        else {
                            res.json({ message: "trip not found", data: data })
                            console.log("not found");
                        }
                    })
            }
            else {
                console.log("==========>crew does not exist")
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
        console.log(err);
    }
};
export const TripsByCrewId = async (req, res) => {
    try {
        console.log(req.body, "----------->crew Id")
        const crewId = req.body.crewId;


        registeringTrip.find({ "crewMembers.crewId": crewId }, (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "User Exist", data: data })
            }
            else {
                console.log("user not exist")
                res.json({ message: "User not  Exist", data: data })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error", err: err });
    }
};
export const deleteTripCrewMemberByCrewId = async (req, res) => {
    try {
        console.log(req.body, "----------->crew Id")
        const crewId = req.body.crewId;
        registeringTrip.updateOne({ "crewMembers.crewId": crewId }, { $pull: { crewMembers: { crewId: crewId } } }, (err, data) => {
            console.log(data, "This one is our data")
            if (data.modifiedCount === 1) {
                res.json({ message: "Crew Member Delete", data: data })
            }
            else {
                res.status(404).json({ message: "Crew Member Not Found." });
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error", err: err });
    }

};
export const deleteCrewExpenseById = async (req, res) => {
    try {
        console.log(req.body, "-----------> Id")
        const _id = req.body.id;
        registeringTrip.updateOne({ "crewExpenses._id": _id }, { $pull: { crewExpenses: { _id: _id } } }, (err, data) => {
            console.log(data, "This one is our data")
            if (data.modifiedCount === 1) {
                res.json({ message: "Crew Expense Delete", data: data })
            }
            else {
                res.status(404).json({ message: "Crew Expense Not Found." });
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error", err: err });
    }
};
export const addCrewToTrips = async (req, res) => {
    try {
        console.log(req.body)
        const tripId = req.body.tripId;
        console.log(tripId, "both are id's")
        const crewId = req.body.crewId;
        console.log(crewId, "both are id's")
        const val = {
            crewId: req.body.crewId,
            dailyRateCrew: req.body.dailyRateCrew,
            dailyRateClient: req.body.dailyRateClient,
            perDiemsCrew: req.body.perDiemsCrew,
            perDiemsClient: req.body.perDiemsClient,
            crewType: req.body.crewType
        }
        const Val = val;
        const fee = req.body.fee;
        const percentage = req.body.percentage;
        registeringUser.findOne({ _id: crewId }, (err, data) => {
            if (data) {
                console.log(data, "==========>crew data")
                registeringTrip.findOneAndUpdate({ _id: tripId },
                    {
                        $push: {
                            crewMembers: {
                                crewId: req.body.crewId,
                                dailyRateCrew: req.body.dailyRateCrew,
                                dailyRateClient: req.body.dailyRateClient,
                                perDiemsCrew: req.body.perDiemsCrew,
                                perDiemsClient: req.body.perDiemsClient,
                                crewType: req.body.crewType,
                                crewName: data.firstName
                            }
                        }, fee: fee, percentage: percentage, documentStatus: "approved"
                    }, { new: true }, (err, data) => {
                        if (data) {
                            console.log(data);
                            res.json({ message: "crew Added", data: data })
                            console.log("found");
                        }
                        else {
                            res.json({ message: "trip not found", data: data })
                            console.log("not found");
                        }
                    })
            }
            else {
                console.log("==========>crew does not exist")
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
        console.log(err);
    }
};
export const updateTripStatus = async (req, res) => {
    try {
        console.log(req.body)
        const tripId = req.body.tripId;

        if (req.body.crewStatus) {
            registeringTrip.findOneAndUpdate({ _id: tripId },
                { $set: { crewStatus: req.body.crewStatus } }, { new: true }, (err, data) => {
                    if (data) {
                        console.log(data);
                        res.json({ message: "Trip status updated", data: data })



                    }
                    else {
                        res.json({ message: "Trip status not updated", data: data })
                    }
                })
        }
        if (req.body.status) {
            registeringTrip.findOneAndUpdate({ _id: tripId },
                { $set: { status: req.body.status } }, { new: true }, (err, data) => {
                    if (data) {
                        console.log(data);
                        res.json({ message: "Trip status updated", data: data })



                    }
                    else {
                        res.json({ message: "Trip status not updated", data: data })
                    }
                })
        }
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};
export const addTripWithCrew = async (req, res) => {
    try {

        console.log(req.body, "========>with crew");
        let name, company;
        const { tripName, client, fee,
            percentage, description, destinationTo, destinationFrom,
            startDate, endDate, aircraftType,
            selectAircraft, hotelType, airlineTravel, clientId, crewId,
            dailyRateCrew,
            dailyRateClient,
            perDiemsCrew,
            perDiemsClient, crewType } = req.body;
        registeringUser.findOne({ _id: client }, (err, data) => {
            if (data) {

                name = data.firstName;
                company = data.companyName;

            }
            else {
                console.log("client not found");
            }
        })

        registeringUser.findOne({ _id: crewId }, (err, data) => {
            console.log(req.body);
            if (data) {
                console.log(data, "==========>crew data")
                const trip = new registeringTrip({
                    tripName, clientName: name, fee,
                    percentage, description, destinationTo, destinationFrom, companyName: company,
                    startDate, endDate, aircraftType, selectAircraft, hotelType, airlineTravel, clientId,
                    role: "trip", status: "pending", crewStatus: "pending", payment: "pending", documentStatus: "pending", documentClientStatus: "pending",
                    crewMembers: [
                        {
                            crewId: crewId,
                            dailyRateCrew: dailyRateCrew,
                            dailyRateClient: dailyRateClient,
                            perDiemsCrew: perDiemsCrew,
                            perDiemsClient: perDiemsClient,
                            crewType: crewType,
                            crewName: data.firstName
                        }

                    ]
                });
                trip.save();

                res.json({ message: "Trip Details added", data: req.body });
            }
            else {
                console.log("Crew does not exist");
            }
        }
        )
    }
    catch (err) {
        console.log("error in adding trip details", err);
        res.json({ message: "server error" })
    }

};
export const addingTripExpenses = async (req, res) => {
    try {
        console.log(req.body)
        const tripId = req.body.tripId;
        const { title, merchant, amount, date ,expensePic } = req.body.values;
        const crewId = req.body.crewId
        registeringUser.findOne({ _id: crewId }, (err, data) => {
            console.log(req.body);
            if (data) {
                registeringTrip.findOneAndUpdate({ _id: tripId },
                    {
                        $push: {
                            crewExpenses:
                            {
                                title: title,
                                merchant: merchant,
                                amount: amount,
                                expensePic: expensePic,
                                crewId: crewId,
                                crewName: data.firstName,
                                date: date
                            }
                        }
                    }, { new: true }, (err, data) => {
                        if (data) {
                            console.log(data, "after adding");
                            res.json({ message: "Expense Added", data: data })
                        }
                        else {
                            res.json({ message: "Expense not Added", data: data })
                        }
                    })
            }
            else {
                console.log("member not found")
            }
        })


    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};
export const getCrewExpense = async (req, res) => {
    try {
        let newData = [];
        console.log(req.body, "=============newid");
        const crewId = req.body.crewId;
        const tripId = req.body.tripId;
        registeringTrip.findOne({ _id: tripId }, (err, data) => {
            if (data) {
                for (let i = 0; i < data?.crewExpenses?.length; i++) {
                    if (data?.crewExpenses[i]?.crewId === crewId) {
                        newData.push(data?.crewExpenses[i])
                        console.log(newData, "==========>crewData");
                    }
                }
                res.json({ data: newData });
                console.log(newData, "==========>newData");
            }
            else {
                console.log("not found")
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const updateTripDocumentStatus = async (req, res) => {
    try {
        console.log(req.body, "========>values")
        const tripId = req.body.tripId;
        registeringTrip.findOneAndUpdate({ _id: tripId },
            { $set: { documentStatus: req.body.documentStatus } }, { new: true }, (err, data) => {
                if (data) {
                    console.log(data);
                    res.json({ message: "Document status updated", data: data })
                }
                else {
                    res.json({ message: "Document status not updated", data: data })
                }
            })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};
export const updateTripClientDocumentStatus = async (req, res) => {
    try {
        console.log(req.body, "========>values")
        const tripId = req.body.tripId;
        registeringTrip.findOneAndUpdate({ _id: tripId },
            { $set: { documentClientStatus: req.body.documentClientStatus } }, { new: true }, (err, data) => {
                if (data) {
                    console.log(data);
                    res.json({ message: "Document Client status updated", data: data })
                }
                else {
                    res.json({ message: "Document Client status not updated", data: data })
                }
            })

    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};
export const updateTripDetails = async (req, res) => {
    try {
        console.log(req.body, "--------->user")
        const id = req.body.id;
        registeringTrip.findOneAndUpdate({ _id: id },
            { $set: req.body },
            { new: true }, (err, data) => {
                if (data) {
                    res.json({ message: "user updated " })
                    console.log(data, "============>new data")
                }
                else {
                    res.json({ message: "user does not exist" });
                }
            })
    }
    catch (err) {
        res.json({ message: "Server Error" });
        console.log(err, "--------->error")
    }
};
export const statusApproveExpenseById = async (req, res) => {
    try {
        console.log(req.body, "========>values")
        registeringTrip.updateOne({ "crewExpenses._id": req.body.id },
            { $set: { 'crewExpenses.$.expenseStatus': req.body.expenseStatus } }, { new: true }, (err, data) => {
                if (data) {
                    res.json({ message: "Expense status updated", data: data })
                }
                else {
                    res.json({ message: "Expense status not updated", data: data })
                }
            })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};
export const addCrewSignTrips = async (req, res) => {
    try {
        console.log(req.body)
        const tripId = req.body.tripId;
        console.log(tripId, "both are tripId")
        const signId = req.body.signId;
        console.log(signId, "both are signId")
        const val = {
            sign: req.body.signId,
            ipAddress: req.body.dailyRateCrew,
            location: req.body.dailyRateClient,
            date: req.body.perDiemsCrew,
            time: req.body.perDiemsClient,
        }
        registeringUser.findOne({ _id: signId }, (err, data) => {
            if (data) {
                console.log(data, "==========>crew data")
                registeringTrip.findOneAndUpdate({ _id: tripId },
                    {
                        $push: {
                            sign: {
                                signId: req.body.signId,
                                sign: req.body.sign,
                                ipAddress: req.body.ipAddress,
                                location: req.body.location,
                                date: req.body.date,
                                time: req.body.time,
                            }
                        }
                    }, { new: true }, (err, data) => {
                        if (data) {
                            console.log(data);
                            res.json({ message: "Sign Added", data: data })
                            console.log("found");
                        }
                        else {
                            res.json({ message: "trip not found", data: data })
                            console.log("not found");
                        }
                    })
            }
            else {
                console.log("==========>crew does not exist")
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
        console.log(err);
    }
}; 