const { uploadValidate, uploadgetImg, uploadImagenCloudinary} = require("./../functions/validate-file-upload");
const uploadCtr = {};

uploadCtr.uploadFile = async (req, res) => {
  // console.log(req.file)
  let status = 400;
  let correct = false;
  let answer;
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(status).send("No files were uploaded.");
  }
  //carga de imagenes
  try {
    const file = await uploadValidate(req.files);
    if (file) {
      status = 200;
      correct = true;
      answer = file;
    }
    res.status(status).json({
      correct,
      resp: answer,
    });
  } catch (error) {
    console.log(error);
  }
};

uploadCtr.viewFile = async (req, res) => {
  let status = 400;
  let correct = false;
  let answer;
  try {
    const img = req.body.img;
    const file = await uploadgetImg(img);
    if (file) {
      status = 200;
      correct = true;
      answer = file;
    }
    res.status(status).json({
      correct,
      resp: answer,
    });
  } catch (error) {
    console.log(error);
  }
};

uploadCtr.uploadCloudinary = async (req, res) => {
  let status = 400;
  let correct = false;
  let retorno;

  try {
    if (!req.files ||Object.keys(req.files).length === 0 ||!req.files.archivo) {
      res.status(status).json({
        correct,
        status,
        retorno: "No files were uploaded.",
      });
    }
    const urlResponse = await uploadImagenCloudinary(req);
    if (urlResponse) {
      status = 200;
      correct = true;
      retorno = urlResponse.images;
    } else {
      retorno = "not found";
    }
    res.status(status).json({
      correct,
      status,
      retorno,
    });
  } catch (error) {
    console.log(error);
    // .json({ msg });
  }
};

module.exports = uploadCtr;
