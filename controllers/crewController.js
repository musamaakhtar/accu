import registeringCrew from "../Schemas/crew.js";
import nodemailer from 'nodemailer';
import registeringTrip from './../Schemas/trip.js';
import bcrypt from 'bcryptjs';
import registeringUser from './../Schemas/Auth.js';
export const createCrew = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, bank, role, uId } = req.body;
        console.log(req.body, "=====>body of req")
        registeringUser.findOne({ email: email }, (err, data) => {
            if (data) {
                console.log(req.body)
                res.json({ message: "Email already exist" });
            }
            else {
                const register = new registeringUser({ firstName, lastName, email, phoneNumber, role, bank, uId });
                register.save();
                console.log(register, "this one sending data");
                res.status(200).json({ message: "user registered", data: req.body });
            }
        })
        console.log(req.body, req.body.email, "data from client")
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "musamaakhtar68@gmail.com",
                pass: "qngjaktczeafekee",
            },
        });
        var mailOptions = {
            from: "connect@kallendly.com",
            to: email,
            subject: "Register",
            html:
                "<h3>Hello!</h3>" +
                "<p>You are receiving this email to signup for crew account.</p>" +
                "<p>{mail}</p>" +
                `<a href="https://acc.zeeshou.com/CrewRegister/${email}"  style="background-color:black; margin-top:10px;
           margin-bottom:10px margin-left:30px; color:white; padding:6px; border-radius: 2px;"  >
          Register</a>` +
                "<p>If you don't, no further action is required.</p>" +
                "<p>Regards,</p>" +
                "<p>Accu Sign</p>",
            text: "That was easy!",
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.json({ message: "Email not Sent" });
            } else {
                console.log("Email sent: " + info.response);
                res.json({ message: "Email Sent" });
            }
        });
    }
    catch (err) {
        console.log("error in creating crew member", err);
        res.json({ message: "server error" })
    }
}
export const getAllCrews = async (req, res) => {
    try {
        const data = await registeringCrew.find({})
        res.json(data);
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const deleteCrew = async (req, res) => {
    try {
        console.log(req.body, "=========>id")
        const id = req.body.e;
        registeringCrew.findByIdAndRemove((id), (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "crew deleted" })
            }
            else {
                res.json({ message: "crew does not exist" })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const deleteCrewById = async (req, res) => {
    try {
        console.log(req.body, "=========>id")
        const id = req.body._id;
        registeringTrip.findOneAndRemove((id), { $pull: { crewMembers: id } }, (err, data) => {
            if (err) {
                res.status(500).json({ error: 'error in deleting address' });
            }

            res.json(data);
        });
        // registeringTrip.findByIdAndRemove((id), (err, data) => {
        //     if (data) {
        //         console.log(data)
        //         res.json({ message: "trip deleted" })
        //     }
        //     else {
        //         res.json({ message: "trip does not exist" })
        //     }
        // })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const getCrewByName = async (req, res) => {
    try {


        const { firstName } = req.body;
        registeringCrew.findOne({ firstName: firstName }, (err, data) => {

            if (data) {
                console.log(req.body)
                res.json({ message: "crew member found", data: data });
            }
            else {

                res.json({ message: "crew member not registered", data: req.body });
            }
        })
    }
    catch (err) {
        console.log("error in registering data", err);
        res.status(404).json({ message: "sever error" })
    }
}
export const getCrewByemail = async (req, res) => {
    try {
        const data = await registeringUser.find({ email: req.params.email })
        res.json({
            message: "single data found",
            data: data
        });
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const updateCrewByMail = async (req, res) => {
    try {
        console.log(req.body, "======> updateCrewByMail")
        const { firstName, lastName, phoneNumber, email, bank, password, role } = req.body;
        const user = await registeringUser.findOneAndUpdate({ email: email }, { $set: { firstName, lastName, phoneNumber, bank, role } }, { new: true });
        if (user) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            user.hashPassword = hashPassword;
            await user.save();
            res.json({ message: "user updated" });
        } else {
            res.json({ message: "user does not exist" });
        }
        console.log(req.body, "data from client to compare by mail");
    } catch (err) {
        console.log("error updating user data", err);
        res.status(500).json({ message: "server error" });
    }
};
export const mailToCrewMember = async (req, res) => {
    console.log(req.body);
    try {
        const { firstName, lastName, email } = req.body;
        console.log(req.body, "=====>body of req")
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "musamaakhtar68@gmail.com",
                pass: "qngjaktczeafekee",
            },
        });
        var mailOptions = {
            from: "connect@kallendly.com",
            to: email,
            subject: "Agreement",
            html:
                `<h3>Dear ${firstName},</h3>` +
                "<p>Thank you for your interest in working with AirCrewConnect.So let’s start off by both agreeing that paperwork isn’t everyone’s favourite past time. As such, we decided to make your life easy and developed a workspace called ACCuSign which helps you sign and store contracts, view the terms and conditions and even helps with your expenses too. This workspace gives you access to the tri-annual contract, the Appendix A for the flight dispatch and an expense reporting system to reduce your headache at the end.So, before you start off with this journey there are two steps we need you to complete.<br/> Step 1. Follow the link below which takes you to your workspace and here you’ll find your main contract. Please read through this as sets out the terms and conditions of our business relationship for the next 3 years. You are not employed by AirCewConnect or any of its associated companies – you are a freelancer. Once Step 1 is completed, you can then proceed to <br/> Step 2 which is to sign the Appendix A of each trip. This link to the Appendix A will be sent separately each time you are dispatched for a trip. Within this appendix you will find important details about the daily rates, per diems and travel details.  You will only have one workspace however, each trip that you’re offered will require you repeat Step 2 for signing the Appendix A with which in turn generates an #ACC reference number for the dispatch.After Step 2 is signed, the trip becomes active which in turn activates the area to upload your expenses. You don’t have to wait till the end of the trip to upload these, you can do this as you go. Flight tickets, taxis, hotels and more can be dragged and dropped at any time with the software calculating the expenses and converting the currency in which you paid to USD using a 3% weighting in your favour from the exchange rate on the day – making sure you don’t loose out.Once the trip is finished you will need to log back in and sign the expense claim. <br/> This is then forwarded together with your invoice of duty days and per diems to the client for approval -  meaning you don’t have to even send us an invoice if you don’t want to as its all generated automatically in the workspace. <br/> Thank you once again for your interest in working with AirCrewConnect.</p>" +
                "<p>Best Wishes,{ My Personal Signature }Matthew</p>"+
                "<h3>Founder</h3>"+
                "<p>Accu Sign</p>",
            text: "That was easy!",
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error, "this one is our error message");
                res.json({ message: "Email not Sent" });
            } else {
                console.log("Email sent: " + info.response);
                res.json({ message: "Email Sent" });
            }
        });

    }
    catch (err) {
        console.log("error in creating client", err);
        res.json({ message: "server error" })
    }
}
