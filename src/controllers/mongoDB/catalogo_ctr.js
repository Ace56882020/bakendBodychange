const Catalogos = require("../../models/Catalogo");

const catalogoCtr = {};

catalogoCtr.getCatalogo = async (req, res) => {
    let correct = false;
    let status = 400;
    let retorno;
    const statu = req.body;
    try {
        const catalogos = await Catalogos.find(statu);
        if (catalogos) {
            status = 200
            correct = true
            retorno = catalogos
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

module.exports = catalogoCtr;