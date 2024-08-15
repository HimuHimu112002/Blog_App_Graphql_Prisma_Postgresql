import jwt = require("jsonwebtoken");
import config from "../config";
export const jwtToken = async (payload:{userId: number}, secret: jwt.Secret) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
  return token
};


export const getUserVerify = async(token: string)=>{
  try{
    const userData = jwt.verify(token, config.jwt.secret as string) as{
      userId: number
    }
    return userData.userId
  }catch(err){
    return null
  }
}