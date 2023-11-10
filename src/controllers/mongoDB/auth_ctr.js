const User = require("../../models/User");
const validarJWT = require("../functions/validar-jwt");
const { decrypt } = require('./../functions/crypto.js')

const authCtr = {};

authCtr.login = async (req, res) => {
  let correct = false;
  let status = 400;
  let answer;
  const { usuario, password } = req.body;
  try {
    //verificar si el correo existe
    const usuarioValue = await User.findOne({ usuario });
    if (usuarioValue) {
      const passwordRes = await decrypt(usuarioValue.password)
      if (passwordRes === password) {
        if (usuarioValue.activo) {
          const validarToken = await validarJWT(usuarioValue.token)
          if (validarToken === 'Token activo') {
            status = 200,
              correct = true,
              answer = {
                token:usuarioValue.token,
                rol:usuarioValue.rol,
                id:usuarioValue._id,
                activo:usuarioValue.activo,
                nombre:usuarioValue.nombre
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
