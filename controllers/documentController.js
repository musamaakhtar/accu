import addingDocument from '../Schemas/document.js';


export const addDocument = async (req, res) => {
    try {
        console.log(req.body , "here is document body");
        const tripId = req.body.tripId;
        const documentPic = req.body.documentPic;
        const title = req.body.title;
        const type = req.body.type;
        const document = new addingDocument({
            documentPic,
            role: "document",
            title ,
            type,
            tripId 

        });
        document.save();

        res.json({ message: "document created", data: req.body });



    }
    catch (err) {
        console.log("error in dding document", err);
        res.json({ message: "server error" })
    }
}

export const getAllDocuments = async (req, res) => {
    try {
        const data = await addingDocument.find({})
        res.json(data);
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
};
export const getDocumentByTripId = async (req, res) => {
    try {
        const tripId = req.body.tripId;
        addingDocument.find({ tripId: tripId }, (err, data) => {
                res.json({ data: data });
            }
            
        )}
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
