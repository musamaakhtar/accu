import addingSettings from './../Schemas/Settings.js';

export const addInvoiceSetting = async (req, res) => {
    try {
        const { name, email, phoneNumber, logo, favicon, address, clientId } = req.body;
        console.log(req.body);
        const invoiceDetails = new addingSettings({
            name, email, phoneNumber, logo, favicon, address, clientId
        });
        invoiceDetails.save();
        res.json({ message: "Details added", data: req.body });
    }
    catch (err) {
        console.log("error in adding details", err);
        res.json({ message: "server error" })
    }
}
export const getInvoiceById = async (req, res) => {
    try {
        const id = req.body.clientId;
        addingSettings.findOne({ clientId: id }, (err, data) => {
            if (data) {
                res.json({ message: "Get", data: data })
            }
            else {
                res.json({ message: "Not Get", data: data })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};
