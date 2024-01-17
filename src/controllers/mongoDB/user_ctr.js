const User = require("../../models/User");
const {
  validarCampos,
  validatorEmail,
} = require("./../functions/validar-campos");
const generarUsuario = require("./../functions/genera-usuario");
const { encrypt } = require("./../functions/crypto.js");
const {generarJWT} = require("../functions/generar-jwt");
const {validarJWT} = require("../functions/generar-jwt");
const userCtr = {};
const path = require("path");
const fs = require("fs");
const { uploadgetImg } = require("../functions/validate-file-upload");

userCtr.createuser = async (req, res) => {
  let correct = false;
  let status = 400;
  let answer;
  let user;

  await validarCampos(req);
  const {nombre,apellido,correo,password,edad,estatura,peso,genero} = req.body.data;

  try {
    // Creamos nuestro usuario
    user = new User({nombre,apellido,correo,password,edad,estatura,peso,genero});
    //crea usuario
    var correoExistente = await validatorEmail(correo);
    if (correoExistente.status!==200) {
      answer = correoExistente.msg;
      correct;
      status;
    } else {
      const crtUser = await user.save();
      if (crtUser) {
        //busca usuario por id
        const searchUser = await getUserByIdCreate(crtUser._id);
        //enccripta contraseña
        const encryptRes = await encrypt(searchUser.password);
        searchUser.password = encryptRes;
        const token = await generarJWT(searchUser.id);
        searchUser.token = token;
        const valid = await validarJWT(token);
        searchUser.sesion = valid.fechaToken;
        searchUser.estado = true,
        searchUser.rol ='user'
        //actualiza usuario con campos de login y password
        updateUser = await User.findOneAndUpdate(
          { _id: searchUser._id },
          searchUser,
          { new: true }
        );
        if (updateUser) {
          answer = updateUser;
          correct = true;
          status = 200;
        } else {
          answer = "error al actualizar usuario";
        }
      } else {
        answer = "error al crear usuario";
      }
    }
    res.status(status).json({
      correct,
      retorno: answer,
    });
  } catch (error) {
    console.log(error);
  }
};

//busca usuario por id
const getUserByIdCreate = async (id) => {
  let userId = await User.findById(id);
  return userId;
};

userCtr.getUser = async (req, res) => {
  let correct = false;
  let status = 400;
  const { limit = 5, desde = 0 } = req.query;
  const query = { statusUser: true };
  try {
    const users = await User.find(query).skip(Number(desde));
    //   .limit(Number(limit));
    if (users) {
      correct = true;
      status = 200;
    }
    let total = await User.countDocuments(query);
    res.status(status).json({
      total,
      correct,
      retorno: users,
    });
  } catch (error) {
    console.log(error);
  }
};

userCtr.updateUser = async (req, res) => {
  let correct = false;
  let status = 400;
  const params = req.body.id;
  try {
    const {
      nombres,
      rol,
      movil,
      ciudad,
      genero,
      correo,
      fechaNacimiento,
      direccion,
      questionOne,
      estatura,
      peso,
      pais,
    } = req.body;
    let userById = await getUserByIdCreate(params);
    if (!userById) {
      return (msg = "No existe el usuario");
    }
    userById.nombre = nombre;
    userById.apellido = apellido;
    userById.rol = rol;
    userById.movil = movil;
    userById.ciudad = ciudad;
    userById.genero = genero;
    userById.correo = correo;
    userById.fechaNacimiento = fechaNacimiento;
    userById.direccion = direccion;
    userById.questionOne = questionOne;
    userById.peso = peso;
    (userById.estatura = estatura), (userById.pais = pais);
    status = 200;
    correct = true;
    userById = await User.findOneAndUpdate({ _id: params }, userById, {
      new: true,
    });
    res.status(status).json({
      resp: userById,
      correct,
    });
  } catch (error) {
    console.log(error);
    res.status(status).send("Hubo un error");
  }
};

userCtr.getUserById = async (req, res) => {
  let correct = false;
  let status = 400;
  let retorno;
  let pathImg;
  const _id = req.body.id;
  try {
    const user = await User.find({ _id });
    if (user.length !== 0) {
      // const imc = await calculoIMC(params);
      // pathImg = await uploadgetImg(user.img)
      status = 200;
      correct = true;
      retorno = user;
    } else {
      retorno = "not found";
    }
    // res.sendFile(pathImg)
    res.status(status).json({
      correct,
      status,
      retorno,
    });
  } catch (error) {
    console.log(error);
  }
};

userCtr.deletUser = async (req, res) => {
  try {
    let producto = await Producto.findById(req.params.id);

    if (!producto) {
      res.status(404).json({ msg: "No existe el producto" });
    }

    await Producto.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Producto eliminado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

userCtr.updateUserEstado = async (id) => {
  let correct = false;
  let status = 400;

  try {
    let usuario = await getUserByIdCreate(id);
    if (!userById) {
      return (msg = "No existe el usuario");
    }
    usuario.estado = false
    status = 200;
    correct = true;
    usuarioInactivo = await User.findOneAndUpdate({ _id: params }, usuario, {
      new: true,
    });
    res.status(status).json({
      retorno: usuarioInactivo,
      correct,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = userCtr;
