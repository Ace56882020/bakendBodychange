const Usuario = require("../../models/Usuario.js");
const {validarJWT} = require("../functions/generar-jwt");
const { decrypt } = require("./../functions/crypto.js");
const usuarioCtr = require("./usuario_ctr.js");

const authCtr = {};

authCtr.login = async (req, res) => {
  let correct = false;
  let status = 400;
  let answer;
  const { alias, password } = req.body;
  try {
    //verificar si el correo existe
    const usuario = await Usuario.findOne({ alias });
    if (!usuario) {
      return res.status(status).json({
        retorno: "Usuario / Password no son correctos - correo",
      });
    }

    // Verificar la contraseña
    const passwordRes = await decrypt(usuario.password);
    if (passwordRes !== password) {
      return res.status(status).json({
        retorno: "Usuario / Password no son correctos - password",
      });
    }

    // SI el usuario está activo
    if (!usuario.estado) {
      return res.status(status).json({
        retorno: "Usuario / Password no son correctos - estado: false",
      });
    }

    // SI el token está activo
    const validarToken = await validarJWT(usuario.token);
    if (validarToken === "Token activo") {
        status = 200,
        correct = true,
        answer = {
          // id: usuario._id,
          usuario
          // nombre: usuario.nombre,
          // apellido: usuario.apellido,
          // rol: usuario.rol,
          // token: usuario.token,
          // estado:usuario.estado
        };
    } else {
      usuarioCtr.updateUserEstado(usuario._id)
      answer = "Sesion Expirada";
    }
    res.status(status).json({
      correct,
      retorno: answer,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = authCtr;
