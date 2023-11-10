const jwt = require("jsonwebtoken");
var moment = require("moment");
require("dotenv").config();
const key = process.env.SECRETPRIVATEKEY;

const generarJWT = (uid = "") => {
  //   let dateNow = new Date();
  //   dateNow.setDate(dateNow.getDate() + 30);
  //   let fecha = dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear();
  //   console.log(fecha);
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      key,
      {
        expiresIn: '30d'
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("no se genero token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generarJWT;
