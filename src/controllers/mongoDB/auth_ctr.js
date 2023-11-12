const User = require("../../models/User");
const validarJWT = require("../functions/validar-jwt");
const { decrypt } = require('./../functions/crypto.js')

const authCtr = {};

authCtr.login = async (req, res) => {
  let correct = false;
  let status = 400;
  let answer;
  const { usuerName, password } = req.body;
  try {
    //verificar si el correo existe
    const usuarioValue = await User.findOne({ usuerName });
    if (usuarioValue) {
      const passwordRes = await decrypt(usuarioValue.password)
      if (passwordRes === password) {
        if (usuarioValue.statusUser) {
          const validarToken = await validarJWT(usuarioValue.token)
          if (validarToken === 'Token activo') {
            status = 200,
              correct = true,
              answer = {
                token:usuarioValue.token,
                rol:usuarioValue.rol,
                id:usuarioValue._id,
                statusUser:usuarioValue.statusUser,
                nombre:usuarioValue.nombre,
                apellido:usuarioValue.apellido
              }
          } else {
            answer = 'Sesion Expirada'
          }
        } else {
          answer = 'Usuaro inhabilitado'
        }
      } else {
        answer = 'password incorrecta'
      }

    } else {
      answer = 'login incorrecto'
    }
    res.status(status).json({
      correct,
      resp: answer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      answer: 'Hable con el administrador'
    });
  }
};

module.exports = authCtr;
