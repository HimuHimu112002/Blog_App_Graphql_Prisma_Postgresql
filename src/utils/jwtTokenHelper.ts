import jwt = require("jsonwebtoken");
import config from "../config";
export const jwtToken = async (payload:{userId: number}, secret: jwt.Secret) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
  return token
};
