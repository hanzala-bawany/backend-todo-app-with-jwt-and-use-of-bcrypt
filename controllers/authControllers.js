import bcrypt from "bcryptjs";
import pkg from "jsonwebtoken"
import { users } from "../models/usersModel.js"
import { errorHandler, successHandler } from "../utills/responseHandle.js";
import { loginUsersArray } from "../utills/loginUserArray.js";

const { sign } = pkg
const { hash, compare } = bcrypt
console.log(loginUsersArray ,"---> starting me login userArray ki position auth file me");


//  register controller

export const registerController = async (req, res) => {

    console.log("💡 RegisterController chal gaya");
    const { userName, email, password, age, isAdmin } = req.body

    if (!userName || !email || !password || !age) {
        return errorHandler(res, 400, "missing Fields");
    }
    if (!email.endsWith("@gmail.com")) {
        return errorHandler(res, 400, "email is in valid");
    }
    if (password.length < 8 || password.length > 12) {
        return errorHandler(res, 400, "password must greater then 7 and smaller then 13");
    }

    const isExist = await users.findOne({ email: email })
    if (isExist) return errorHandler(res, 402, "user already exist");


    try {
        const hashedPass = await hash(password, 10);
        console.log(hashedPass, "--> hashed passsword");

        const newUser = await users.create({
            userName,
            email,
            password: hashedPass,
            age
        })
        console.log(newUser, "---> is user ne signup kia he");

        const tokenGenerate = await sign({
            userId: newUser._id,
            userEmail: newUser.email,
            userPass: newUser.password
        }, process.env.JWT_secretKey, { expiresIn: "5m" })

        return successHandler(res, 200, `user register succefully`, { signupUser: newUser, token: tokenGenerate })
    }
    catch (error) {
        console.log(error, "---> registration me error he");
    }
}

// login controller

export const loginController = async (req, res) => {

    try {
        const { email, password } = req.body

        const isExist = await users.findOne({ email: email })
        if (!isExist) return errorHandler(res, 402, "user not exist");



        const comparePass = await compare(password, isExist.password);
        console.log(comparePass, "---> kia password sahi he");
        if (!comparePass) return errorHandler(res, 404, "invalid password");

        const tokenGenerate = await sign({
            userId: isExist._id,
            userEmail: isExist.email,
            userPass: isExist.password
        }, process.env.JWT_secretKey, { expiresIn: "5m" })

            //   CRON JOB ki working
        loginUsersArray.push([isExist._id, new Date().getHours()])
        console.log(loginUsersArray , "---> her login pe users array");
        

        return successHandler(res, 200, `user login succefully`, { loginUser: isExist, token: tokenGenerate })
    }
    catch (error) {
        console.log(error, "---> login me error he");

    }


}


