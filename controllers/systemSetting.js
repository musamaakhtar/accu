import addingSystemSettings from './../Schemas/systemSetting.js';

export const addSystemSetting = async (req, res) => {
    try {
        const { name, email, phoneNumber, logo, favicon, address, clientId } = req.body;
        console.log(req.body);
        const systemDetails = new addingSystemSettings({
            name, email, phoneNumber, logo, favicon, address, clientId
        });
        systemDetails.save();
        res.json({ message: "Details added", data: req.body });
    }
    catch (err) {
        console.log("error in adding details", err);
        res.json({ message: "server error" })
    }
} 
export const getSettingById = async (req, res) => {
    try {
        console.log(req.body)
        addingSystemSettings.find({ clientId : req.body.id }, (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "Setting Exist", data: data })
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
export const updateSetting = async (req, res) => {
    try {
        console.log(req.body, "--------->user")
        const id = req.body.id;
        addingSystemSettings.findOneAndUpdate({ _id: id },
            { $set: req.body },
            { new: true }, (err, data) => {
                if (data) {
                    res.json({ message: "Setting updated" })
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
export const getAllSettings = async (req, res) => {
    try {
        const data = await addingSystemSettings.find({})
        res.json(data);
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}