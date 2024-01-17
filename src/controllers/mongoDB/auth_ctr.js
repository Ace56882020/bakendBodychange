const User = require("../../models/User");
const {validarJWT} = require("../functions/generar-jwt");
const { decrypt } = require("./../functions/crypto.js");
const userCtr = require("./user_ctr.js");

const authCtr = {};

authCtr.login = async (req, res) => {
  let correct = false;
  let status = 400;
  let answer;
  const { correo, password } = req.body;
  try {
    //verificar si el correo existe
    const usuario = await User.findOne({ correo });
    if (!usuario) {
      return res.status(status).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    // Verificar la contraseña
    const passwordRes = await decrypt(usuario.password);
    if (passwordRes !== password) {
      return res.status(status).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // SI el usuario está activo
    if (!usuario.estado) {
      return res.status(status).json({
        msg: "Usuario / Password no son correctos - estado: false",
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
      userCtr.updateUserEstado(usuario._id)
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
