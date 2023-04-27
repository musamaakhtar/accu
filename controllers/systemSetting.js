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