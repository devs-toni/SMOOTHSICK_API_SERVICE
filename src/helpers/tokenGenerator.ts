const jwt = require("jsonwebtoken");
require('dotenv').config();

export const tokenGenerator = (id = "") => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        }, (err: string, token: string) => {
            if (err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
}

