const { Schema, model } = require('mongoose');

const FormularioSchema = Schema({
    id: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    dataRutina: {
        type: Array,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});

//retirar campos que no deseo mostrar
FormularioSchema.methods.toJSON = function () {
    const { __v, _id, ...Formulario } = this.toObject();
    Formulario.uid = _id
    return Formulario
}

module.exports = model('forms', FormularioSchema);