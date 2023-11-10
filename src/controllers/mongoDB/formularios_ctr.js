const Formulario = require("../../models/Formulario");

const formularioCtr = {};

formularioCtr.getFormsById = async (req, res) => {
    let correct = false;
    let status = 400;
    let retorno;
    const id = req.body.id;
    try {
        const formularios = await Formulario.find({id});
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
        res.status(status).send("not found");
    }
};

module.exports = formularioCtr;