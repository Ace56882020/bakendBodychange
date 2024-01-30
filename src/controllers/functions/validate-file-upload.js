const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const base64Img = require("base64-img");
const User = require("../../models/User");
const cloudinary = require("cloudinary").v2;

cloudinary.config(process.env.CLOUDINARY_URL);

global.dataFile = {
  nombreFile: "",
};
const uploadValidate = async (req, carperta = "") => {
  const { name,type,uri } = req;
  const nombreArchivo = name[0].split(".");
  const extension = nombreArchivo[nombreArchivo.length - 1];

  //validar extensiones
  const extensionesValidas = ["image/png", "jpg", , "JPG", "jpeg", "gif"];
  if (!extensionesValidas.includes(type[0])) {
    return {
      msg: `la extension no es valida ${type}`,
    };
  }
  const nombreTemp = uuidv4() + "." + 'png';
  const uploadpath = path.join(process.env.publicUpload, nombreTemp);
  // Use the mv() method to place the file somewhere on your server
  req.mv(uploadpath, (err) => {
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

const uploadImagenCloudinary = async (req,res) => {
  const id = '65aaa488b725047bf4a691b8';
  const userImg = await User.findById(id);
  if (!userImg) {
    return res.status(400).json({
      msg: `No existe un usuario con el id ${id}`,
    });
  }

//   Limpiar imágenes previas
    if (userImg.images) {
      const nombreArr = userImg.images.split("/");
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split(".");
      cloudinary.uploader.destroy(public_id);
    }

  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  userImg.images = secure_url;
  userById = await User.findOneAndUpdate({ _id: id }, userImg, {
    new: true,
  });
  return userById;
};

module.exports = {
  uploadValidate,
  uploadgetImg,
  uploadImagenCloudinary,
};
