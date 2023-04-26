import bcrypt from 'bcryptjs'
import registeringUser from '../Schemas/Auth.js';
import nodemailer from 'nodemailer';
import OAuth2Client from 'google-auth-library';
export const register = async (req, res) => {
    console.log(req.body , "body data")
    console.log(req.body.values.email , "password is here")
    try {
        const { firstName, lastName, email, password, phoneNumber, registrationNumber, companyName, bank } = req.body.values;
        const {role} = req.body;
        console.log(role , "====>role")
        registeringUser.findOne({ email: email }, (err, data) => {
            if (data) {
                res.json({ message: "Email already exist" });
            }
            else {
                var salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password, salt);
                const register = new registeringUser({ firstName, lastName, email, hashPassword, phoneNumber, role, bank, registrationNumber, companyName });
                register.save();
                console.log(register, "this one sending data");
                res.status(200).json({ message: "user registered", data: req.body });
            }
        })

    }
    catch (err) {
        console.log("error in registering data", err);
        res.status(404).json({ message: "sever error" })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        registeringUser.findOne({ email: email }, (err, data) => {
            if (data) {
                const pass = bcrypt.compareSync(password, data.hashPassword)
                console.log(pass);
                if (pass) {

                    res.json({ message: "Login Successfull", data: data })
                }
                else {
                    res.json({ message: "incorrect password" })
                }
            }
            else {
                res.json({ message: "user not registered" })
            }
        })

    }
    catch (err) {
        res.json({ message: "server error" })
        console.log("error in login", err)
    }
}
export const getAllUsers = async (req, res) => {
    try {
        const data = await registeringUser.find({})
        res.json(data);
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const getUsersById = async (req, res) => {
    try {
        console.log(req.body , "body is here");
        const id = req.body.id;
        registeringUser.findOne({ _id: id }, (err, data) => {
            if (data) {
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
export const getClientById = async (req, res) => {
    try {
        console.log(req.body , "client Id of crew Invoice");
        const id = req.body.id;
        registeringUser.findOne({ _id: id }, (err, data) => {
            if (data) {
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
export const forgetPassword = async (req, res) => {
    try {
        registeringUser.findOneAndUpdate({ email: req.body.email },
            { $set: { hashPassword: bcrypt.hashSync(req.body.password, salt) } },
            { new: true }, (err, data) => {
                if (data) {
                    console.log(data)
                    res.json({ message: "password updated" })
                }
                else {
                    res.json({ message: "user does not exist" })
                }
            })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};
export const updateUser = async (req, res) => {
    try {
        console.log(req.body, "--------->user")
        const id = req.body.id;
        registeringUser.findOneAndUpdate({ _id: id },
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
export const forgetLink = async (req, res) => {
    try {
        registeringUser.findOne({ email: req.body.email }, (err, data) => {
            if (data) {
                //   try {
                var transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "musamaakhtar68@gmail.com ",
                        pass: "qngjaktczeafekee",
                    },
                });
                let email = data.email;
                var mailOptions = {
                    from: "connect@kallendly.com",
                    to: email,
                    subject: "Password reset",
                    html:
                        "<h3>Hello!</h3>" +
                        "<p>You are receiving this email because we received a password reset request for your account.</p>" +
                        `<a href=" http://accusign.zeeshou.com/forgetPassword/${email}"  style="background-color:black; margin-top:10px;
           margin-bottom:10px margin-left:30px; color:white; padding:6px; border-radius: 2px;"  >
          Reset password</a>` +
                        "<p>If you did not request a password reset, no further action is required.</p>" +
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
            } else {
                res.json({ message: "Email not exist" });
            }
        });
    } catch (err) {
        return res.json({ message: "Network Error" });
    }

};
export const getCrewByKey = async (req, res) => {
    try {



        registeringUser.find({ role: "crew" }, (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "Auth Crew exist", data: data })
            }
            else {
                res.json({ message: "Auth Crew not exist", data: data })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};
export const getClientByKey = async (req, res) => {
    try {



        registeringUser.find({ role: "client" }, (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "Auth Client exist", data: data })
            }
            else {
                res.json({ message: "Auth Client not exist", data: data })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};
export const deleteUser = async (req, res) => {
    try {
        console.log(req.body, "=========>id")
        const id = req.body.e;
        registeringUser.findByIdAndRemove((id), (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "user deleted" })
            }
            else {
                res.json({ message: "user does not exist" })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const updatePassword = async (req, res) => {
    console.log(req.body , "reqq body");
    const { email, currentPassword, newPassword } = req.body;
    try {
        const user = await registeringUser.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!currentPassword) {
            return res.status(400).json({ message: "Current password is required" });
        }
        if (!user.hashPassword) {
            return res.status(500).json({ message: "User password is missing" });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.hashPassword);
        console.log(isMatch, "isMatch");

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const newhashedPassword = await bcrypt.hash(newPassword, 10);
        user.hashPassword = newhashedPassword;
        await user.save();
        return res.status(200).json({ message: "Password updated successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};