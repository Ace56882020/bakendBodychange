const { validationResult } = require('express-validator')
const User = require("../../models/User");

const validarCampos = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        return res.status(400).json(errors)
    }
}
const validatorEmail = async (correo) => {
    let retorno = '';
    let correct = false;
    let status = 400
    const existeEmail = await User.findOne({ correo })
    if (existeEmail) {
        return retorno = {
            msg: 'Correo existente',
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
module.exports = { validarCampos, validatorEmail };