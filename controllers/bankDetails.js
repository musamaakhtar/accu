import addingBankDetails from "../Schemas/bankDetails.js";

export const addBankDetails = async (req, res) => {
    try {
        const { title, bank, accountNumber, iban, bic, address, bankId  , bankPic} = req.body;
        console.log(req.body);
        const bankDetails = new addingBankDetails({
            title, bank, accountNumber, iban, bic, address, bankId , bankPic
        });
        bankDetails.save();
        res.json({ message: "Details added", data: req.body });
    }
    catch (err) {
        console.log("error in adding details", err);
        res.json({ message: "server error" })
    }
}
export const getAllDetails = async (req, res) => {
    try {
        const data = await addingBankDetails.find({})
        res.json(data);
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const bankDetailById = async (req, res) => {
    try {
        console.log(req.body, "bankId")
        const bankId = req.body.bankId;
        addingBankDetails.find({ bankId: bankId }, (err, data) => {
            if (data) {
                console.log(data, "data")
                res.json({ message: "Bank Account Exits", data: data })
            }
            else {
                console.log("user not exist")
                res.json({ message: "Bank Account not  Exist", data: data })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error", err: err });
    }
};
export const updateBankStatus = async (req, res) => {
    try {
        console.log(req.body, "========>id")
        const id = req.body.id;
        addingBankDetails.findOneAndUpdate({ _id: id },
            { $set: { bankStatus: req.body.bankStatus } }, { new: true }, (err, data) => {
                if (data) {
                    // console.log(data);
                    res.json({ message: "Bank status updated" })
                }
                else {
                    res.json({ message: "Bank status not updated", data: data })
                }
            })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};
export const updateBankDetails = async (req, res) => {
    try {
        console.log(req.body, "--------->user")
        const id = req.body.id;
        addingBankDetails.findOneAndUpdate({ _id: id },
            { $set: req.body },
            { new: true }, (err, data) => {
                if (data) {

                    res.json({ message: "Bank Details updated" })
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
export const deleteBankById = async (req, res) => {
    try {
        console.log(req.body, "=========>id")
        const id = req.body.id;
        addingBankDetails.findByIdAndRemove((id), (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "Bank  deleted" })
            }
            else {
                res.json({ message: "Bank not exist" })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}