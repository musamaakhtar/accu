import registeringClient from '../Schemas/client.js';
import nodemailer from 'nodemailer';
import registeringUser from './../Schemas/Auth.js';
import bcrypt from "bcrypt"

export const createClient = async (req, res) => {
    console.log(req.body);
    try {
        const { firstName, lastName, phoneNumber, email, registrationNumber, companyName, role } = req.body;
        console.log(req.body, "=====>body of req")
        registeringUser.findOne({ email: email }, (err, data) => {
            if (data) {
                console.log(req.body)
                res.json({ message: "Email already exist" });
            }
            else {
                const register = new registeringUser({ firstName, lastName, email, phoneNumber, role, registrationNumber, companyName });
                register.save();
                console.log(register, "this one sending data");
                res.status(200).json({ message: "user registered", data: req.body });
            }
        })
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
                "<p>You are receiving this email to signup for client account.</p>" +
                `<a href="https://acc.zeeshou.com/ClientRegister/${email}"   style="background-color:black; margin-top:10px;
           margin-bottom:10px margin-left:30px; color:white; padding:6px; border-radius: 2px;"  >
          Register</a>` +
                "<p>If you don't, no further action is required.</p>" +
                "<p>Regards,</p>" +
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
export const getAllClients = async (req, res) => {
    try {
        const data = await registeringClient.find({})
        res.json(data);
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const deleteClient = async (req, res) => {
    try {
        console.log(req.body, "=========>id")
        const id = req.body.e;
        registeringClient.findByIdAndRemove((id), (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "client deleted" })
            }
            else {
                res.json({ message: "client does not exist" })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const getClientByemail = async (req, res) => {
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
export const updateClientByMail = async (req, res) => {
    try {
        console.log(req.body, "======> updateClientByMail")
        const { firstName, lastName, phoneNumber, email, password, role, companyName, registrationNumber } = req.body;
        const user = await registeringUser.findOneAndUpdate({ email: email }, { $set: { firstName, lastName, companyName, phoneNumber, role, registrationNumber } }, { new: true });
        if (user) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            user.hashPassword = hashPassword;
            await user.save();
            console.log(user, "1234567890")
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
