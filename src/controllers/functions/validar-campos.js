const { validationResult } = require('express-validator')
const Usuario = require("../../models/Usuario");

const validarCampos = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        return res.status(400).json(errors)
    }
}
const validatorAliasl = async (alias) => {
    let retorno = '';
    let correct = false;
    let status = 400
    const existeEmail = await Usuario.findOne({ alias })
    if (existeEmail) {
        return retorno = {
            msg: 'Usuario existente',
            correct,
            status
        }
    } else {
        return retorno = {
            correct: true,
            status: 200
        }
    }
}
module.exports = { validarCampos, validatorAliasl };