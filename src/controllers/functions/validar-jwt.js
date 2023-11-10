require('dotenv').config();
const jwt = require('jsonwebtoken');
const key = process.env.SECRETPRIVATEKEY;
const fechaActual = new Date()

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


module.exports = validarJWT