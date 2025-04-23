import { errorHandler, successHandler } from "../utills/responseHandle.js";
import pkg from "jsonwebtoken"

const { verify } = pkg

export const checkToken = async (req, res, next) => {

    console.log(req.headers.authorization);

    try {
        const fullToken = req?.headers?.authorization;
        const token = req?.headers?.authorization.split(" ")[1];

        console.log(fullToken.startsWith("Bearer"));
        console.log(token);

        if (!fullToken.startsWith("Bearer") || !token) return errorHandler(res, 404, "token not found , you can not access todos");

        const isTokenValid = await verify(token, process.env.JWT_secretKey);
        console.log(isTokenValid, "----> login wale user ka token wala data");

        if (!isTokenValid) return errorHandler(res, 402, `your token is not valid , agian try`);

        req.loginUserId = isTokenValid.userId

        next()
    }
    catch (error) {
        console.log(error, "--> check token me error he");

    }
}

