const Alimentacion = require("../../models/Alimentacion");

const alimentacionCtr = {};

alimentacionCtr.getEatsById = async (req, res) => {
    let correct = false;
    let status = 400;
    let retorno;
    const id = req.body.id;
    try {
        const alimetacion = await Alimentacion.find({id});
        if (alimetacion) {
            status = 200
            correct = true
            retorno = alimetacion
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

module.exports = alimentacionCtr;