const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const base64Img = require("base64-img");
const Usuario = require("../../models/Usuario");
const cloudinary = require("cloudinary").v2;

cloudinary.config(process.env.CLOUDINARY_URL);

global.dataFile = {
  nombreFile: "",
};
const uploadValidate = async (req, carperta = "") => {
  const { archivo } = req;
  const nombreArchivo = archivo.name.split(".");
  const extension = nombreArchivo[nombreArchivo.length - 1];

  //validar extensiones
  const extensionesValidas = ["png", "jpg", , "JPG", "jpeg", "gif"];
  if (!extensionesValidas.includes(extension)) {
    return {
      msg: `la extension no es valida ${extension}`,
    };
  }
  const nombreTemp = uuidv4() + "." + extension;
  const uploadpath = path.join(process.env.publicUpload, nombreTemp);
  // Use the mv() method to place the file somewhere on your server
  archivo.mv(uploadpath, (err) => {
    if (err) {
      console.Console(err);
    }
  });
  dataFile.nombreFile = nombreTemp;
  // uploadgetImg()

  return nombreTemp;
};

const uploadgetImg = async () => {
  const url = path.join(process.env.publicUpload, dataFile.nombreFile);
  base64Img.base64(url, function (err, data) {
    console.log(data);
  });

  const archivos = fs.readFileSync(
    path.join(process.env.publicUpload, dataFile.nombreFile),
    "base64"
  );
  console.log(archivos);
  let result = "data:image/jpg;base64," + archivos;
  console.log(result);

  // console.png(image);
};

const uploadImagenCloudinary = async (req) => {
  const id = req.params.id;
  const userImg = await Usuario.findById(id);
  if (!userImg) {
    return res.status(400).json({
      msg: `No existe un usuario con el id ${id}`,
    });
  }

//   Limpiar imágenes previas
    // if (userImg.images) {
    //   const nombreArr = userImg.images.split("/");
    //   const nombre = nombreArr[nombreArr.length - 1];
    //   const [public_id] = nombre.split(".");
    //   cloudinary.uploader.destroy(public_id);
    // }

    for (let index = 0; index < req.files.archivo.length; index++) {
      const { tempFilePath } = req.files.archivo[index];
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath,{folder: 'photoGym'});
      userImg.dataImagenes.push(secure_url);
    }

  
  userById = await Usuario.findOneAndUpdate({ _id: id }, userImg, {
    new: true,
  });
  return userById;
};

module.exports = {
  uploadValidate,
  uploadgetImg,
  uploadImagenCloudinary,
};
