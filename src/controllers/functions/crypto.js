require("dotenv").config();
const CryptoJS = require("crypto-js");
const key = process.env.SECRETPRIVATEKEY;

const cryptoCtr = {};
// vector inicial vector inicial 16 bits
let iv = key;
// clave y iv pueden ser iguales

//encriptar
cryptoCtr.encrypt = async (res) => {
  const encrypted = await CryptoJS.AES.encrypt(res, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  // Convertir a cadena
  const encrypted1 = encrypted.toString();
  return encrypted1;
};

// descifrar
cryptoCtr.decrypt = async (password) => {
  const decrypted = CryptoJS.AES.decrypt(password, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  // Convertir a cadena utf8
  const decrypted1 = CryptoJS.enc.Utf8.stringify(decrypted);
  return decrypted1;
};
module.exports = cryptoCtr;
