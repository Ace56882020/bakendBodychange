const jwt = require("jsonwebtoken");
var moment = require("moment");
require("dotenv").config();
const key = process.env.SECRETPRIVATEKEY;
const fechaActual = new Date()

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
        expiresIn: '90d'
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

const validarJWT = async (token) => {
    let msg;
    try {
        const tokenOk = jwt.verify(token, key);
        if (tokenOk) {
            const fechaToken = new Date(tokenOk.exp)
            if (fechaActual === fechaToken) {
                return msg = 'Token expiro'
            } else {
                return msg = 'Token activo'
            }
        } else {
            return msg = 'verificación token erronea'
        }
    } catch (err) {
        console.log(err)
        return msg='Token expiro'
    }
}

module.exports = {generarJWT,validarJWT};

