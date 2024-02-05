const Ejercicios = require("../../models/Ejercicios");

const ejerciciosCtr = {};

ejerciciosCtr.getFormsById = async (req, res) => {
    let correct = false;
    let status = 400;
    let retorno;
    const id = req.body.id;
    try {
        const formularios = await Ejercicios.find({id});
        if (formularios.length !==0) {
            status = 200
            correct = true
            retorno = formularios
        } else {
            retorno = "not found";
        }
        res.status(status).json({
            correct,
            status,
            retorno
        });
    } catch (error) {
        console.log(error);
    }
};

ejerciciosCtr.createForm = async (req, res) => {
    let correct = false;
    let status = 400;
    let answer;
    const {id, estado, descripcion, nombre, dataRutina} = req.body;
    try {
      let form;
      form = new Ejercicios({id, estado, descripcion, nombre, dataRutina});
      const crtForm = await form.save();
      if (crtForm) {
        answer = "ok";
        correct = true;
        status = 200;
      } else {
        answer = "error al guardar";
      }
      res.status(status).json({
        correct,
        resp: answer,
      });
    } catch (error) {
      console.log(error);
    }
  };
module.exports = ejerciciosCtr;