import registeringAircraft from "../Schemas/aircraft.js";



export const createAircraft = async (req, res) => {
    try {

        console.log(req.body);
        const { aircraftOwner, aircraftOperator, type,
            registrationNumber, aircraftid } = req.body;
        const { aircraftPic } = req.body;


        const aircraft = new registeringAircraft({
            aircraftOwner, aircraftOperator, type,
            registrationNumber, aircraftPic,
            role: "aircraft", aircraftid
        });
        aircraft.save();
        res.json({ message: "Aircraft Details added", data: req.body });
    }
    catch (err) {
        console.log("error in adding aircraft details", err);
        res.json({ message: "server error" })
    }
}

export const getAllAircrafts = async (req, res) => {
    try {
        const data = await registeringAircraft.find({})
        res.json(data);
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}

export const getAllAircraftsById = async (req, res) => {
    const id = req.body.aircraftid; 

    console.log(id , "byidair")
    console.log(req.body , "byidair")
    try {
        const data = await registeringAircraft.find({"aircraftid":id})
        res.json({
            message: "single data found",
            data: data
        });
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const deleteAircraft = async (req, res) => {
    try {
        console.log(req.body, "=========>id")
        const id = req.body.e;
        registeringAircraft.findByIdAndRemove((id), (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "aircraft deleted" })
            }
            else {
                res.json({ message: "aircraft does not exist" })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const updateAircraft = async (req, res) => {
    try {
        console.log(req.body, "--------->aircraft")
        const id = req.body.id;
        registeringAircraft.findOneAndUpdate({ _id: id },
            { $set: req.body },
            { new: true }, (err, data) => {
                if (data) {

                    res.json({ message: "aircraft updated" })
                    console.log(data, "============>new data")
                }
                else {
                    res.json({ message: "airr not exist" });
                }
            })
    }
    catch (err) {
        res.json({ message: "Server Error" });
        console.log(err, "--------->error")
    }

};